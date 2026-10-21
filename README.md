# BibleLookUp

A Myanmar Bible lookup app that can run as a website or as a native Android/iOS app.

## Features
- Search by keyword, book, or verse text
- Filter by book name
- Random verse button for inspiration
- Mobile apps load the live GitHub Pages website
- Native Android and iOS shells powered by Capacitor

## Run locally

```bash
npm start
```

Then open:

http://localhost:3000

## Android and iOS apps

The native projects are included in this repository. They load the published
website at `https://hakawgei-bit.github.io/biblelookup/`, so web-page changes
appear in the apps after GitHub Pages deploys them, without rebuilding the apps.
Install the dependencies first:

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
The app needs an internet connection to load the website. Changes to native
code, plugins, or permissions still require a new app build and release.

For iOS, use a Mac with Xcode installed:

```bash
npm run ios
npx cap open ios
```

Build and run the app on an iOS simulator or connected device from Xcode.
The app needs an internet connection to load the website. Changes to native
code, plugins, or permissions still require a new app build and release.

The initial app release must include this hosted-site configuration; users
with an older app need to install that release once before future website
changes can appear without reinstalling. Myanmar fonts are loaded from Google
Fonts and use system fallbacks when offline.

## Project files
- `index.html` — page structure
- `styles.css` — layout and styling
- `app.js` — searchable verse data and UI logic
- `package.json` — local and mobile development scripts
- `capacitor.config.json` — Capacitor app identity and hosted website URL
- `scripts/build.js` — prepares web assets for native apps

## Notes
This is a lightweight starter app intended for local use and future extension into a larger Bible lookup product.
