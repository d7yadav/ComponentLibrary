// 🚀 Persistence Layer - Offline Support with Intelligent Sync
import { compress, decompress } from 'lz-string';

import type {
  PersistenceConfig,
  SyncOperation,
  SyncConfig,
  FormVersion,
} from '../types';

// ===== PERSISTENCE ENGINE =====

export class PersistenceEngine {
  private config: PersistenceConfig;
  private syncConfig?: SyncConfig;
  private syncQueue: SyncOperation[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;
  private versionHistory: FormVersion[] = [];
  
  constructor(config: PersistenceConfig, syncConfig?: SyncConfig) {
    this.config = config;
    this.syncConfig = syncConfig;
    
    // Listen for online/offline events
    this.setupOnlineOfflineHandlers();
    
    // Initialize sync queue from storage
    this.loadSyncQueue();
  }
  
  // ===== CORE PERSISTENCE METHODS =====
  
  async save(data: any, key?: string): Promise<void> {
    const storageKey = key || this.config.key;
    const serializedData = await this.serializeData(data);
    
    try {
      switch (this.config.storage) {
        case 'localStorage':
          await this.saveToLocalStorage(storageKey, serializedData);
          break;
        case 'sessionStorage':
          await this.saveToSessionStorage(storageKey, serializedData);
          break;
        case 'indexedDB':
          await this.saveToIndexedDB(storageKey, serializedData);
          break;
        default:
          throw new Error(`Unsupported storage type: ${this.config.storage}`);
      }
      
      // Add to sync queue if sync is enabled
      if (this.syncConfig?.enabled) {
        await this.addToSyncQueue('save', storageKey, data);
      }
      
      // Save version history
      if (this.config.ttl) {
        this.addToVersionHistory(storageKey, data);
      }
      
    } catch (error) {
      console.error('Failed to save data:', error);
      throw error;
    }
  }
  
  async load(key?: string): Promise<any> {
    const storageKey = key || this.config.key;
    
    try {
      let serializedData: string | null = null;
      
      switch (this.config.storage) {
        case 'localStorage':
          serializedData = await this.loadFromLocalStorage(storageKey);
          break;
        case 'sessionStorage':
          serializedData = await this.loadFromSessionStorage(storageKey);
          break;
        case 'indexedDB':
          serializedData = await this.loadFromIndexedDB(storageKey);
          break;
        default:
          throw new Error(`Unsupported storage type: ${this.config.storage}`);
      }
      
      if (!serializedData) {
        return null;
      }
      
      return await this.deserializeData(serializedData);
      
    } catch (error) {
      console.error('Failed to load data:', error);
      return null;
    }
  }
  
  async remove(key?: string): Promise<void> {
    const storageKey = key || this.config.key;
    
    try {
      switch (this.config.storage) {
        case 'localStorage':
          localStorage.removeItem(storageKey);
          break;
        case 'sessionStorage':
          sessionStorage.removeItem(storageKey);
          break;
        case 'indexedDB':
          await this.removeFromIndexedDB(storageKey);
          break;
      }
      
      // Add to sync queue if sync is enabled
      if (this.syncConfig?.enabled) {
        await this.addToSyncQueue('delete', storageKey, null);
      }
      
    } catch (error) {
      console.error('Failed to remove data:', error);
      throw error;
    }
  }
  
  // ===== STORAGE IMPLEMENTATIONS =====
  
  private async saveToLocalStorage(key: string, data: string): Promise<void> {
    try {
      localStorage.setItem(key, data);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        await this.clearExpiredItems('localStorage');
        localStorage.setItem(key, data);
      } else {
        throw error;
      }
    }
  }
  
  private async loadFromLocalStorage(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  
  private async saveToSessionStorage(key: string, data: string): Promise<void> {
    try {
      sessionStorage.setItem(key, data);
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        await this.clearExpiredItems('sessionStorage');
        sessionStorage.setItem(key, data);
      } else {
        throw error;
      }
    }
  }
  
  private async loadFromSessionStorage(key: string): Promise<string | null> {
    return sessionStorage.getItem(key);
  }
  
  private async saveToIndexedDB(key: string, data: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FormPersistence', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');
        
        const putRequest = store.put({
          key,
          data,
          timestamp: Date.now(),
        });
        
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      };
      
      request.onupgradeneeded = () => {
        const db = request.result;
        const store = db.createObjectStore('forms', { keyPath: 'key' });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      };
    });
  }
  
  private async loadFromIndexedDB(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FormPersistence', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['forms'], 'readonly');
        const store = transaction.objectStore('forms');
        
        const getRequest = store.get(key);
        
        getRequest.onsuccess = () => {
          const result = getRequest.result;
          resolve(result ? result.data : null);
        };
        
        getRequest.onerror = () => reject(getRequest.error);
      };
    });
  }
  
  private async removeFromIndexedDB(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('FormPersistence', 1);
      
      request.onerror = () => reject(request.error);
      
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['forms'], 'readwrite');
        const store = transaction.objectStore('forms');
        
        const deleteRequest = store.delete(key);
        
        deleteRequest.onsuccess = () => resolve();
        deleteRequest.onerror = () => reject(deleteRequest.error);
      };
    });
  }
  
  // ===== SERIALIZATION =====
  
  private async serializeData(data: any): Promise<string> {
    let serialized = JSON.stringify(data);
    
    // Compress if enabled
    if (this.config.compress) {
      serialized = compress(serialized);
    }
    
    // Encrypt if enabled
    if (this.config.encrypt) {
      serialized = await this.encryptData(serialized);
    }
    
    return serialized;
  }
  
  private async deserializeData(data: string): Promise<any> {
    let processed = data;
    
    // Decrypt if enabled
    if (this.config.encrypt) {
      processed = await this.decryptData(processed);
    }
    
    // Decompress if enabled
    if (this.config.compress) {
      processed = decompress(processed);
    }
    
    return JSON.parse(processed);
  }
  
  private async encryptData(data: string): Promise<string> {
    // Basic encryption using Web Crypto API
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.config.key),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(data)
    );
    
    return btoa(String.fromCharCode(...new Uint8Array(iv))) + ':' + btoa(String.fromCharCode(...new Uint8Array(encrypted)));
  }
  
  private async decryptData(data: string): Promise<string> {
    const [ivBase64, encryptedBase64] = data.split(':');
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0));
    const encrypted = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(this.config.key),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: encoder.encode('salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
    
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );
    
    return new TextDecoder().decode(decrypted);
  }
  
  // ===== SYNC FUNCTIONALITY =====
  
  private async addToSyncQueue(
    type: 'save' | 'update' | 'delete',
    key: string,
    data: any
  ): Promise<void> {
    const operation: SyncOperation = {
      id: crypto.randomUUID(),
      type,
      formId: key,
      data,
      timestamp: Date.now(),
      retryCount: 0,
    };
    
    this.syncQueue.push(operation);
    await this.saveSyncQueue();
    
    // Attempt sync if online
    if (this.isOnline) {
      this.processSyncQueue();
    }
  }
  
  private async processSyncQueue(): Promise<void> {
    if (this.syncInProgress || !this.syncConfig?.enabled || !this.isOnline) {
      return;
    }
    
    this.syncInProgress = true;
    
    try {
      const operations = [...this.syncQueue];
      
      for (const operation of operations) {
        try {
          await this.syncOperation(operation);
          
          // Remove successful operation from queue
          this.syncQueue = this.syncQueue.filter(op => op.id !== operation.id);
          
        } catch (error) {
          console.error('Sync operation failed:', error);
          
          // Increment retry count
          operation.retryCount = (operation.retryCount || 0) + 1;
          
          // Remove if max retries reached
          if (operation.retryCount >= this.syncConfig.retryAttempts) {
            this.syncQueue = this.syncQueue.filter(op => op.id !== operation.id);
            console.error('Max retries reached for operation:', operation.id);
          }
        }
      }
      
      await this.saveSyncQueue();
      
    } finally {
      this.syncInProgress = false;
    }
  }
  
  private async syncOperation(operation: SyncOperation): Promise<void> {
    if (!this.syncConfig) return;
    
    const response = await fetch(this.syncConfig.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(operation),
    });
    
    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status}`);
    }
  }
  
  private async saveSyncQueue(): Promise<void> {
    try {
      localStorage.setItem('form-sync-queue', JSON.stringify(this.syncQueue));
    } catch (error) {
      console.error('Failed to save sync queue:', error);
    }
  }
  
  private async loadSyncQueue(): Promise<void> {
    try {
      const saved = localStorage.getItem('form-sync-queue');
      if (saved) {
        this.syncQueue = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load sync queue:', error);
      this.syncQueue = [];
    }
  }
  
  // ===== VERSION HISTORY =====
  
  private addToVersionHistory(formId: string, data: any): void {
    const version: FormVersion = {
      id: crypto.randomUUID(),
      formId,
      version: this.versionHistory.filter(v => v.formId === formId).length + 1,
      data,
      timestamp: new Date(),
      userId: 'current-user', // Should be dynamic
      changeDescription: 'Form updated',
    };
    
    this.versionHistory.push(version);
    
    // Keep only last 10 versions per form
    const formVersions = this.versionHistory.filter(v => v.formId === formId);
    if (formVersions.length > 10) {
      const toRemove = formVersions.slice(0, formVersions.length - 10);
      this.versionHistory = this.versionHistory.filter(v => 
        !toRemove.some(tr => tr.id === v.id)
      );
    }
    
    // Save to storage
    this.saveVersionHistory();
  }
  
  private async saveVersionHistory(): Promise<void> {
    try {
      localStorage.setItem('form-version-history', JSON.stringify(this.versionHistory));
    } catch (error) {
      console.error('Failed to save version history:', error);
    }
  }
  
  // ===== UTILITY METHODS =====
  
  private setupOnlineOfflineHandlers(): void {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processSyncQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }
  
  private async clearExpiredItems(storageType: 'localStorage' | 'sessionStorage'): Promise<void> {
    const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
    const now = Date.now();
    
    const keysToRemove: string[] = [];
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && key.startsWith('form-')) {
        try {
          const item = storage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (parsed.expiry && parsed.expiry < now) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          // Invalid JSON, remove the item
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => storage.removeItem(key));
  }
  
  // ===== PUBLIC API =====
  
  public async getVersionHistory(formId: string): Promise<FormVersion[]> {
    return this.versionHistory.filter(v => v.formId === formId);
  }
  
  public async restoreVersion(versionId: string): Promise<any> {
    const version = this.versionHistory.find(v => v.id === versionId);
    if (!version) {
      throw new Error('Version not found');
    }
    
    await this.save(version.data, version.formId);
    return version.data;
  }
  
  public getSyncStatus(): {
    isOnline: boolean;
    queueSize: number;
    syncInProgress: boolean;
  } {
    return {
      isOnline: this.isOnline,
      queueSize: this.syncQueue.length,
      syncInProgress: this.syncInProgress,
    };
  }
  
  public async forcSync(): Promise<void> {
    if (this.isOnline) {
      await this.processSyncQueue();
    }
  }
  
  public async clearAllData(): Promise<void> {
    // Clear main storage
    await this.remove();
    
    // Clear sync queue
    this.syncQueue = [];
    await this.saveSyncQueue();
    
    // Clear version history
    this.versionHistory = [];
    await this.saveVersionHistory();
  }
}

// ===== FACTORY FUNCTIONS =====

export const createPersistenceEngine = (
  config: PersistenceConfig,
  syncConfig?: SyncConfig
): PersistenceEngine => {
  return new PersistenceEngine(config, syncConfig);
};

export const createDefaultPersistenceConfig = (
  key: string,
  storage: 'localStorage' | 'sessionStorage' | 'indexedDB' = 'localStorage'
): PersistenceConfig => {
  return {
    enabled: true,
    key,
    storage,
    compress: true,
    encrypt: false,
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
};

export const createSyncConfig = (
  endpoint: string,
  retryAttempts = 3,
  retryDelay = 1000
): SyncConfig => {
  return {
    enabled: true,
    endpoint,
    retryAttempts,
    retryDelay,
    conflictResolution: 'client',
  };
};

// ===== EXPORTS =====

export default PersistenceEngine;
export type { PersistenceConfig, SyncConfig, FormVersion, SyncOperation };