import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neurolift.app',
  appName: 'NeuroLift',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'Dark'
    }
  },
  ios: {
    contentInset: 'always',
    handleApplicationNotifications: true
  }
};

export default config;
