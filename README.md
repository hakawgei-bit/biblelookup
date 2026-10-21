# BibleLookUp

A Myanmar Bible lookup app that can run as a website or as a native Android/iOS app.

## Features
- Search by keyword, book, or verse text
- Filter by book name
- Random verse button for inspiration
- Bible text is bundled with the app and available offline
- Native Android and iOS shells powered by Capacitor

## Run locally

```bash
npm start
```

Then open:

http://localhost:3000

## Android and iOS apps

The native projects are included in this repository and use the same
`index.html` as the website. Install the dependencies first:

```bash
npm install
```

On Windows, install Android Studio and its Android SDK, then sync and open the
Android project:

```bash
npm run android
npx cap open android
```

Build and run the app on an emulator or connected device from Android Studio.
After changing the web app, run `npm run android` to rebuild and sync it.

For iOS, use a Mac with Xcode installed:

```bash
npm run ios
npx cap open ios
```

Build and run the app on an iOS simulator or connected device from Xcode.
After changing the web app, run `npm run ios` to rebuild and sync it.

The app content is bundled for offline use. Myanmar fonts are currently loaded
from Google Fonts and use system fallbacks when offline.

## Project files
- `index.html` — page structure
- `styles.css` — layout and styling
- `app.js` — searchable verse data and UI logic
- `package.json` — local and mobile development scripts
- `capacitor.config.json` — Capacitor app identity and web output directory
- `scripts/build.js` — prepares web assets for native apps

## Notes
This is a lightweight starter app intended for local use and future extension into a larger Bible lookup product.
