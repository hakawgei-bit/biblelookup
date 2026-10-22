# FindVerseQuick

A Myanmar Bible lookup app that can run as a website or as a native Android/iOS app.

## Features
- Search by keyword, book, or verse text
- Filter by book name
- Switch between the Myanmar Bible and English King James Version (KJV)
- Random verse button for inspiration
- Mobile apps load the live GitHub Pages website
- Installable website with offline support
- Native Android and iOS shells powered by Capacitor

## Run locally

```bash
npm start
```

Then open:

http://localhost:3000

On iPhone 13, open the published website in Safari, tap **Share**, scroll down,
then tap **Add to Home Screen** and **Add**. The saved app appears as
**FindVerseQuick** with its book-and-magnifier icon. This option is provided by
Safari; the website does not show a separate install button. The site must be
served over HTTPS or localhost. The service worker caches the app and Bible
data for offline use after the first successful visit.

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
- `scripts/import-bible-data.py` — imports both translations from their source archives
- `data/bible-en.json.gz` — compressed English KJV chapter data
- `data/bible-my.json.gz` — compressed Myanmar Bible chapter data
- `icons/findversequick.svg` and PNG exports — app logo and home-screen icons
- `manifest.webmanifest`, `sw.js`, and `pwa.js` — home-screen metadata and
  offline caching
- `icons/` — installable web app icons

To regenerate both data files, temporarily place the authorized source archives
`kj_new.zip` and `myanmar.zip` in the project root and run:

```bash
python scripts/import-bible-data.py
npm run build
```

## Notes
This is a lightweight starter app intended for local use and future extension into a larger Bible lookup product.
