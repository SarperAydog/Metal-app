// On phones, localStorage is provided by expo-sqlite so the session survives restarts.
import 'expo-sqlite/localStorage/install';

export const sessionStorage = localStorage;
