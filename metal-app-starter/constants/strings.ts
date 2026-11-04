import APP_CONFIG from '@/config/app.json';

// All user-facing text lives here so it can be translated later.
export const strings = {
  tabs: {
    events: 'Events',
    news: 'News',
    search: 'Search',
    profile: 'Profile',
  },
  empty: {
    events: {
      title: 'No events yet',
      body: 'Concerts in your region will appear here.',
    },
    news: {
      title: 'No news yet',
      body: 'News about the bands you follow will appear here.',
    },
    search: {
      title: 'Search is coming',
      body: 'You will find and follow bands here.',
    },
    notifications: {
      title: 'No notifications',
      body: 'Alerts about your bands and region will appear here.',
    },
  },
  notifications: {
    title: 'Notifications',
    open: 'Open notifications',
  },
  username: {
    welcome: `Welcome to ${APP_CONFIG.name}`,
    prompt: 'What should we call you?',
    hint: 'Only you can see this name.',
    placeholder: 'Your name',
    tooShort: 'Please use at least 2 characters.',
    continue: 'Continue',
    saving: 'Saving...',
    saveFailed: 'Could not save your name. Please try again.',
  },
  profile: {
    nameLabel: 'Your name',
    settings: 'Settings',
    deleteAccount: 'Delete my account',
    deleteWarning: 'This permanently deletes your account and data. It cannot be undone.',
    deleteConfirm: 'Yes, delete',
    deleteCancel: 'Cancel',
    deleting: 'Deleting...',
    deleteFailed: 'Could not delete your account. Please try again.',
  },
  status: {
    loading: 'Getting things ready...',
    errorTitle: 'Could not connect',
    errorBody: 'Check your connection and try again.',
    retry: 'Try again',
    setupTitle: 'Setup needed',
    setupBody:
      'The app is not connected to Supabase yet. Fill in the Supabase values in the .env file, then restart.',
  },
} as const;

export const USERNAME_MIN = 2;
export const USERNAME_MAX = 30;
