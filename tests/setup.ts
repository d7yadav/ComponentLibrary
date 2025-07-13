/**
 * @fileoverview Test setup configuration
 * @author Dilip Yadav <dilip.sm.yadav@gmail.com>
 */

import '@testing-library/jest-dom';

// Setup for testing library
globalThis.ResizeObserver = class ResizeObserver {
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  cb: ResizeObserverCallback;
  observe() {}
  unobserve() {}
  disconnect() {}
};