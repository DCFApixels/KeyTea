# Vendored @noble/hashes modules

This directory contains the unchanged runtime modules required by Password Tea
for PBKDF2-HMAC-SHA-256. They were copied from `@noble/hashes` version `2.4.0`,
downloaded from the official npm Registry package:

`https://registry.npmjs.org/@noble/hashes/-/hashes-2.4.0.tgz`

SHA-256 of the downloaded package:

`e1946149b780017b2564fcc092cb01c04e1d7f20627d0296c17da8868f4436dc`

Included modules: `pbkdf2.js`, `hmac.js`, `sha2.js`, `_md.js`, `_u64.js`, and
`utils.js`. The upstream MIT license is preserved in `LICENSE.txt`. The local
`package.json` only marks these files as ESM for non-browser JavaScript runtimes.

Password Tea's readable integration entry point is `../PasswordKdfSource.js`.
It is bundled into the classic `../PasswordKdf.js` script so the application
can also be opened directly through a `file://` URL without ESM/CORS failures.
When Web Crypto is available, the integration uses its native PBKDF2 as an
optional accelerator. If it is unavailable or fails, the bundled pure-JavaScript
implementation is used automatically; both paths produce the same key bytes.

Rebuild the classic script with:

```sh
npx --yes esbuild@0.28.2 scripts/Utils/PasswordKdfSource.js --bundle --format=iife --global-name=PasswordKdf --target=es2022 --outfile=scripts/Utils/PasswordKdf.js --legal-comments=inline
```

When updating the library, pin an exact version, replace all included modules
from the same package, preserve its license, update this file, and verify the
PBKDF2 test vector and Password Tea's browser flow before committing.
