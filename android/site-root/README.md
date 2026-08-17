# inspectorgad.github.io

Root site for `inspectorgad.github.io`.

Its main job is serving `/.well-known/assetlinks.json`. Android reads that file
from the **domain root** to verify a Trusted Web Activity, and a project page
such as `/volleyball-trainer/` cannot serve it — hence this repository.

## Contents

| Path | Purpose |
|---|---|
| `.well-known/assetlinks.json` | Digital Asset Links statement for the Volleyball Trainer TWA |
| `.nojekyll` | Stops Jekyll dropping the dot-prefixed `.well-known` directory |
| `index.html` | Landing page linking the project sites |

## Setup

Settings → Pages → Source → **Deploy from a branch** → `main` / `(root)`.

## Verifying

```bash
curl -sS https://inspectorgad.github.io/.well-known/assetlinks.json
```

It must return the JSON with `content-type: application/json`. If it 404s,
check that `.nojekyll` exists.

Google's checker:
https://developers.google.com/digital-asset-links/tools/generator

## Adding another app, or release signing

`sha256_cert_fingerprints` is a list. Add each additional fingerprint as a
further entry rather than replacing the existing one — a build signed with a
key that is not listed loses verification and shows a browser URL bar.

Read a fingerprint out of a keystore with:

```bash
keytool -list -v -keystore <file> -alias <alias> | grep SHA256
```

For an app distributed through Google Play, add the **app signing** fingerprint
from Play Console → Setup → App signing, not just the upload key.
