# Android app

The Android build is a **Trusted Web Activity**: a thin native wrapper that
opens the deployed PWA full-screen in Chrome, with no browser URL bar. There is
no application source code — the whole app is `android/app/src/main/AndroidManifest.xml`
plus resources, with `androidbrowserhelper` supplying the launcher activity.

That means **app content updates over the air**. Push a change, GitHub Pages
redeploys, and the installed app picks it up on next launch. Only changes under
`android/` need a new APK.

## Install on a phone

```
https://github.com/inspectorgad/volleyball-trainer/releases/latest/download/volleyball-trainer.apk
```

Open that on the device, allow installs from the browser when prompted, tap the
downloaded file.

## The two-sided handshake

A TWA hides the URL bar only when Digital Asset Links verify **in both
directions**:

| Direction | Where it lives | What it says |
|---|---|---|
| App → site | `asset_statements` in `android/app/src/main/res/values/strings.xml` | "I vouch for `https://inspectorgad.github.io`" |
| Site → app | `/.well-known/assetlinks.json` on that domain | "I vouch for package `io.github.inspectorgad.volleyballtrainer` signed with fingerprint `D3:6C:…`" |

The second file must sit at the **domain root**, not the project path. A page
served from `/volleyball-trainer/` cannot host it. That is why the separate
[`inspectorgad.github.io`](https://github.com/inspectorgad/inspectorgad.github.io)
repository exists; its contents are staged here under `android/site-root/`.

If verification fails the app still works — it just shows Chrome's URL bar
across the top, which is the usual symptom of a fingerprint mismatch or a
missing assetlinks file.

### Checking it

```bash
curl -sS https://inspectorgad.github.io/.well-known/assetlinks.json
```

A 404 almost always means Jekyll ate the dot-prefixed directory; the
`.nojekyll` file in that repo prevents it.

On a connected device:

```bash
adb shell pm get-app-links io.github.inspectorgad.volleyballtrainer
```

Look for `verified` against `inspectorgad.github.io`.

## Signing

Debug signing only, deliberately — enough to sideload onto your own phone,
and the debug keystore is not a secret (password `android`, alias
`androiddebugkey`, the same one every SDK install generates). It is committed
as `android/debug.keystore` so the fingerprint stays **stable across builds**,
which is what `assetlinks.json` pins. A freshly generated keystore on every CI
run would change the fingerprint and silently break verification.

CI asserts this rather than trusting it: after building, it reads the APK's
actual certificate with `apksigner` and fails the build if it does not match
the pinned fingerprint.

### Adding release signing later

For a Play Store listing you need a release key, and it should **not** be
committed:

1. Generate one:
   ```bash
   keytool -genkeypair -keystore upload.keystore -alias upload \
     -keyalg RSA -keysize 2048 -validity 10950 \
     -dname "CN=Volleyball Trainer,O=inspectorgad,C=US"
   ```
2. `base64 -w0 upload.keystore` → repo Settings → Secrets → Actions, as
   `ANDROID_KEYSTORE_BASE64`, with the password as `ANDROID_KEYSTORE_PASSWORD`.
3. Add a `release` signing config in `android/app/build.gradle.kts` reading
   those, and a `gradle :app:bundleRelease` step.
4. Add the new fingerprint to `assetlinks.json` — **as an extra list entry**,
   keeping the debug one so sideloaded builds keep working.
5. Once the app is on Play, also add the **app signing** fingerprint from
   Play Console → Setup → App signing. Google re-signs uploads with its own
   key, so the upload fingerprint alone is not what devices see.

## FileProvider paths

`res/xml/filepaths.xml` must declare a **files-path**, not a cache-path:

```xml
<files-path name="twa_splash" path="twa_splash/" />
```

androidbrowserhelper writes the splash image to
`/data/data/<pkg>/files/twa_splash/splash_image.png` and hands it to Chrome
through the FileProvider. With the wrong root, `getUriForFile` throws

```
IllegalArgumentException: Failed to find configured root that contains …
```

on a background thread during launch, and the app crashes every time it is
opened. It builds, installs and passes every static check — the failure only
shows on a device, in logcat.

## Project layout

```
android/
  settings.gradle.kts, build.gradle.kts, gradle.properties
  debug.keystore              stable debug signing identity
  site-root/                  staged contents of inspectorgad.github.io
  app/
    build.gradle.kts
    src/main/AndroidManifest.xml
    src/main/res/values/       strings (launch URL, asset statements), colors, theme
    src/main/res/mipmap-*/     launcher icons, generated from the PWA icon
    src/main/res/drawable-*/   splash art
```

## Changing the URL

Three places must agree, or Chrome falls back to a plain Custom Tab with a
URL bar:

- `launch_url` in `values/strings.xml`
- the `<data host= pathPrefix=>` in the manifest's `autoVerify` intent filter
- `base` in `vite.config.js`, which determines where Pages serves the app

## Building locally

Requires the Android SDK; the repo has no Gradle wrapper, matching the
ku-volleyball setup.

```bash
cd android
gradle :app:assembleDebug
```

The APK lands in `android/app/build/outputs/apk/debug/`.
