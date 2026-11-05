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
  countries: {
    DE: 'Germany',
    AT: 'Austria',
    CH: 'Switzerland',
    CZ: 'Czechia',
    TR: 'Turkey',
  } as Record<string, string>,
  city: {
    title: 'Where do you live?',
    hint: 'Start typing your city. If it is not listed, pick the nearest one.',
    label: 'Your home city',
    placeholder: 'Type a city',
    noResults: 'No match. Try the nearest bigger city.',
    near: (city: string) => `near ${city}`,
    continue: 'Continue',
    save: 'Save',
    saving: 'Saving...',
    saveFailed: 'Could not save your city. Please try again.',
    editTitle: 'Home city',
  },
  genres: {
    title: 'What do you listen to?',
    hint: 'Pick at least one genre.',
    allSubgenres: 'All subgenres',
    someSubgenres: (count: number) => `${count} ${count === 1 ? 'subgenre' : 'subgenres'}`,
    subgenreDone: 'Done',
    subgenreChange: 'Change subgenres',
    rankTitle: 'Put your favourites first',
    rankHint: 'Drag the handle to reorder.',
    rankHandle: (name: string) => `Reorder ${name}`,
    moveUp: 'Move up',
    moveDown: 'Move down',
    continue: 'Continue',
    back: 'Back',
    save: 'Save',
    saving: 'Saving...',
    saveFailed: 'Could not save your genres. Please try again.',
    editTitle: 'Genres',
  },
  profile: {
    nameLabel: 'Your name',
    homeCity: 'Home city',
    genres: 'Genres',
    change: 'Change',
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
