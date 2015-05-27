# electron-angular-example

> An example desktop application written with Electron and Angular2.

## Dev

First, install dependencies. This will also trigger `jspm install` for client deps.

```
$ npm install
```

Gulp will compile all typescript files.

```
$ gulp
```

### Run

```
$ npm start
```

### Build

Execute a build specific to your dev machine using the `build.js` wrapper script (which provides system defaults and other stuff around electron-packager).

```
$ node build.js
```

On x64 OS X for example, you can now run this from the `builds` directory:

```
$ open builds/darwin/x64/ElectronAngularExample.app
```

You may also run a specific build using gulp tasks:

```
$ gulp build:linux:32
$ gulp build:linux:64
$ gulp build:darwin:64
$ gulp build:windows:64
```

Running all cross-platform builds is rolled up into `gulp release`.

## TODO

* Packaging of cross-platform releases?
* Icon settings
* OS X Signing

## License

MIT © [Jim Schubert](http://ipreferjim.com)
