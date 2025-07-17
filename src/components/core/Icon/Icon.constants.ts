import type { IconProps, IconSizeMap } from './Icon.types';

export const ICON_DEFAULTS: Required<Pick<IconProps, 'variant' | 'size' | 'color' | 'library' | 'animated' | 'animationDuration' | 'rotation' | 'flipX' | 'flipY' | 'loading'>> = {
  variant: 'filled',
  size: 'medium',
  color: 'inherit',
  library: 'material',
  animated: false,
  animationDuration: 200,
  rotation: 0,
  flipX: false,
  flipY: false,
  loading: false,
} as const;

export const ICON_SIZES = ['small', 'medium', 'large', 'xl'] as const;

export const ICON_COLORS = [
  'inherit',
  'primary',
  'secondary',
  'tertiary',
  'quaternary',
  'success',
  'warning',
  'error',
  'info',
  'disabled'
] as const;

export const ICON_VARIANTS = ['filled', 'outlined', 'rounded', 'sharp', 'twoTone'] as const;

export const ICON_LIBRARIES = ['material', 'custom'] as const;

export const ICON_SIZE_MAP: IconSizeMap = {
  small: 16,
  medium: 24,
  large: 32,
  xl: 48,
} as const;

export const COMMON_ICONS = {
  // Actions
  'add': 'Add',
  'delete': 'Delete',
  'edit': 'Edit',
  'save': 'Save',
  'cancel': 'Cancel',
  'check': 'Check',
  'close': 'Close',
  'search': 'Search',
  'filter': 'FilterList',
  'sort': 'Sort',
  'refresh': 'Refresh',
  'download': 'Download',
  'upload': 'Upload',
  'print': 'Print',
  'share': 'Share',
  
  // Navigation
  'home': 'Home',
  'back': 'ArrowBack',
  'forward': 'ArrowForward',
  'up': 'ArrowUpward',
  'down': 'ArrowDownward',
  'left': 'ArrowLeft',
  'right': 'ArrowRight',
  'menu': 'Menu',
  'more': 'MoreVert',
  'expand': 'ExpandMore',
  'collapse': 'ExpandLess',
  
  // Content
  'copy': 'ContentCopy',
  'paste': 'ContentPaste',
  'cut': 'ContentCut',
  'undo': 'Undo',
  'redo': 'Redo',
  'bold': 'FormatBold',
  'italic': 'FormatItalic',
  'underline': 'FormatUnderlined',
  
  // Media
  'play': 'PlayArrow',
  'pause': 'Pause',
  'stop': 'Stop',
  'skip-next': 'SkipNext',
  'skip-previous': 'SkipPrevious',
  'volume-up': 'VolumeUp',
  'volume-down': 'VolumeDown',
  'volume-off': 'VolumeOff',
  'volume-mute': 'VolumeMute',
  
  // Communication
  'mail': 'Mail',
  'message': 'Message',
  'phone': 'Phone',
  'call': 'Call',
  'video-call': 'VideoCall',
  'chat': 'Chat',
  'comment': 'Comment',
  
  // Status
  'info': 'Info',
  'warning': 'Warning',
  'error': 'Error',
  'success': 'CheckCircle',
  'help': 'Help',
  'question': 'QuestionMark',
  'notification': 'Notifications',
  'star': 'Star',
  'favorite': 'Favorite',
  'like': 'ThumbUp',
  'dislike': 'ThumbDown',
  
  // User
  'account': 'AccountCircle',
  'person': 'Person',
  'group': 'Group',
  'settings': 'Settings',
  'profile': 'AccountBox',
  'login': 'Login',
  'logout': 'Logout',
  
  // File
  'folder': 'Folder',
  'file': 'InsertDriveFile',
  'image': 'Image',
  'document': 'Description',
  'attachment': 'Attachment',
  'cloud': 'Cloud',
  'cloud-upload': 'CloudUpload',
  'cloud-download': 'CloudDownload',
  
  // Shopping
  'cart': 'ShoppingCart',
  'bag': 'ShoppingBag',
  'payment': 'Payment',
  'credit-card': 'CreditCard',
  'receipt': 'Receipt',
  'store': 'Store',
  
  // Location
  'location': 'LocationOn',
  'map': 'Map',
  'directions': 'Directions',
  'place': 'Place',
  'gps': 'GpsFixed',
  
  // Device
  'phone-mobile': 'Smartphone',
  'tablet': 'Tablet',
  'computer': 'Computer',
  'laptop': 'Laptop',
  'watch': 'Watch',
  'tv': 'Tv',
  'camera': 'CameraAlt',
  'keyboard': 'Keyboard',
  'mouse': 'Mouse',
  
  // Weather
  'sunny': 'WbSunny',
  'cloudy': 'Cloud',
  'rainy': 'CloudySnowing',
  'storm': 'Thunderstorm',
  'snow': 'AcUnit',
  
  // Time
  'schedule': 'Schedule',
  'timer': 'Timer',
  'alarm': 'Alarm',
  'today': 'Today',
  'calendar': 'CalendarToday',
  'date': 'DateRange',
  'time': 'AccessTime',
  
  // Security
  'lock': 'Lock',
  'unlock': 'LockOpen',
  'security': 'Security',
  'visibility': 'Visibility',
  'visibility-off': 'VisibilityOff',
  'key': 'VpnKey',
  'shield': 'Shield',
} as const;

export const ICON_ANIMATIONS = {
  spin: 'spin',
  pulse: 'pulse',
  bounce: 'bounce',
  shake: 'shake',
  flash: 'flash',
} as const;