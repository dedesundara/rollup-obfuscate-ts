<h1 align="center">
   <b>
        <h6>Rollup Obfuscate</h6><br>
    </b>
</h1>
<h3>A plugin to obfuscate javascript for rollup & vite</h3>
<h5>based on https://www.npmjs.com/package/rollup-obfuscator</h5><br>

## Install
Using npm:

```bash
$ npm install -D https://github.com/dedesundara/rollup-obfuscate-ts
```

Using yarn:

```bash
$ yarn add -D https://github.com/dedesundara/rollup-obfuscate-ts
```

Using pnpm:

```bash
$ pnpm add -D https://github.com/dedesundara/rollup-obfuscate-ts
```

# Use

```js
import { obfuscate } from '@dedesundara/rollup-obfuscate-ts';

...
plugins: [
    ...
    obfuscate()
    ...
]
...
```

# Config

All config options can be found [here](https://www.npmjs.com/package/javascript-obfuscator) and are passed into the obfuscator plugin like this:

```js
obfuscate({
    // options
})
```

You can also pass in the following additional options:

- `global` - It's recommended to keep this enabled, since it might cause issues. However if you need access to `include` and `exclude` options you can disable this

- `include` - A [FilterPattern](https://github.com/rollup/plugins/blob/master/packages/pluginutils/types/index.d.ts#L23) of files to include. By default only allows js/ts files - only works with global set to false

- `exclude` - A [FilterPattern](https://github.com/rollup/plugins/blob/master/packages/pluginutils/types/index.d.ts#L23) of files to exclude. By default ignores node_modules - only works with global set to false

- `allowedFile` - A function allowed file, allowedFile?: (filename: string) => boolean