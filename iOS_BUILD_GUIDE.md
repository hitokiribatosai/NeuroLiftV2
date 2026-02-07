# iOS Build Guide for NeuroLift

This guide will help you build the NeuroLift iOS app once you have macOS running in VMware.

## Prerequisites

Before you start, ensure you have:
- ✅ macOS Sequoia running in VMware
- ✅ Xcode installed (download from Mac App Store)
- ✅ Xcode Command Line Tools installed
- ✅ Node.js and npm installed on macOS

## Step 1: Transfer Project Files

Transfer this entire project folder to your macOS VM. You can use:
- Shared folders in VMware
- Git clone from your repository: `git clone https://github.com/hitokiribatosai/NeuroLift.git`
- File sharing over network

## Step 2: Install Dependencies

Open Terminal in macOS and navigate to the project folder:

```bash
cd /path/to/neurolift-ai
npm install
```

## Step 3: Install CocoaPods (iOS Dependency Manager)

CocoaPods is required for iOS native dependencies:

```bash
sudo gem install cocoapods
```

## Step 4: Build the Web App

```bash
npm run build
```

## Step 5: Sync with iOS Platform

This will copy your web assets to the iOS project and install native dependencies:

```bash
npx cap sync ios
```

If you encounter any pod installation errors, try:

```bash
cd ios/App
pod install --repo-update
cd ../..
```

## Step 6: Open in Xcode

```bash
npx cap open ios
```

This will open the iOS project in Xcode.

## Step 7: Configure Signing & Capabilities

In Xcode:

1. **Select the project** in the left sidebar (blue icon named "App")
2. **Select the "App" target** under TARGETS
3. **Go to "Signing & Capabilities" tab**
4. **Team**: 
   - If you have an Apple Developer account, select your team
   - For testing without a developer account, select "Add Account" and sign in with your Apple ID
5. **Bundle Identifier**: Keep as `com.neurolift.app` or change if needed
6. **Automatically manage signing**: Check this box

## Step 8: Build and Run

### Option A: Run on Simulator (No Apple ID needed)

1. At the top of Xcode, select a simulator (e.g., "iPhone 15 Pro")
2. Click the Play button (▶️) or press `Cmd + R`
3. Wait for the build to complete and the simulator to launch

### Option B: Run on Physical Device (Requires Apple ID)

1. Connect your iPhone via USB
2. Trust the computer on your iPhone when prompted
3. In Xcode, select your iPhone from the device dropdown
4. Click the Play button (▶️) or press `Cmd + R`
5. **First time only**: On your iPhone, go to Settings > General > VPN & Device Management > Trust your developer certificate

## Step 9: Build for Distribution (Optional)

To create an IPA file for distribution:

1. In Xcode menu: **Product > Archive**
2. Wait for the archive to complete
3. In the Organizer window that appears:
   - Click **Distribute App**
   - Choose distribution method:
     - **Ad Hoc**: For testing on specific devices
     - **Development**: For development devices
     - **App Store**: For App Store submission (requires paid developer account)

## Common Issues & Solutions

### Issue: "No signing certificate found"
**Solution**: Make sure you're signed in with your Apple ID in Xcode Preferences > Accounts

### Issue: "Pod install failed"
**Solution**: 
```bash
cd ios/App
pod deintegrate
pod install --repo-update
cd ../..
```

### Issue: "Module not found" errors
**Solution**: Clean build folder with `Cmd + Shift + K` in Xcode, then rebuild

### Issue: "Provisioning profile doesn't match"
**Solution**: In Xcode, go to Signing & Capabilities and click "Download Manual Profiles"

## iOS-Specific Features Configured

Your app is already configured with:

✅ **Safe Area Insets**: Proper spacing for notch and home indicator
✅ **Dark Mode**: Status bar and UI optimized for dark theme
✅ **Haptic Feedback**: Native iOS haptics for better UX
✅ **Local Notifications**: Workout reminders (requires user permission)
✅ **Deep Linking**: URL scheme `neurolift://` for sharing workouts
✅ **Keyboard Handling**: Optimized input behavior
✅ **RTL Support**: Proper Arabic text rendering

## Testing Checklist

Before distributing, test these features:

- [ ] App launches without crashes
- [ ] All screens render correctly (Home, Tracker, Planner, etc.)
- [ ] Safe areas work on devices with notch (iPhone X and newer)
- [ ] Arabic/RTL layout displays properly
- [ ] Workout tracking and timer work
- [ ] Data persists after closing app
- [ ] Haptic feedback works on button taps
- [ ] Status bar color matches app theme
- [ ] Keyboard doesn't cover input fields
- [ ] Exercise template buttons are visible and functional

## Next Steps

Once you successfully build and test on iOS:

1. **Test on multiple iOS versions** (iOS 15, 16, 17, 18)
2. **Test on different devices** (iPhone SE, iPhone 15, iPad)
3. **Submit to TestFlight** for beta testing (requires paid Apple Developer account - $99/year)
4. **Submit to App Store** when ready

## Useful Commands

```bash
# Update Capacitor and iOS platform
npm install @capacitor/ios@latest
npx cap sync ios

# Clean and rebuild
npx cap sync ios --clean

# Check Capacitor doctor for issues
npx cap doctor ios
```

## Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Xcode Documentation](https://developer.apple.com/xcode/)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios)

---

**Note**: The project is already iOS-ready. All you need to do is follow these steps in your macOS VM!
