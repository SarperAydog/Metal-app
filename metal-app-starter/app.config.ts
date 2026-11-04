import type { ConfigContext, ExpoConfig } from 'expo/config';

import APP_CONFIG from './config/app.json';

// Everything else lives in app.json; identity comes from config/app.json.
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: APP_CONFIG.name,
  slug: APP_CONFIG.slug,
  scheme: APP_CONFIG.scheme,
});
