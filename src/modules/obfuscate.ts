import type { ObfuscatorOptions } from 'javascript-obfuscator';
import type { FilterPattern } from '@rollup/pluginutils';
import { createFilter } from '@rollup/pluginutils';
import Obfuscator from 'javascript-obfuscator';
import type { Plugin } from 'rollup';

export interface ObfuscatorPluginOptions extends ObfuscatorOptions {
    global?: boolean;
    include?: FilterPattern;
    exclude?: FilterPattern;
    allowedFile?: (filename: string) => boolean;
}

export function obfuscate(
    options: ObfuscatorPluginOptions = { global: true },
): Plugin {
    const filter = createFilter(
        options.include || ['**/*.js', '**/*.ts'],
        options.exclude || ['node_modules/**'],
    );

    if (options.global != true && options.global != false) {
        options.global = true;
    }

    return {
        name: 'obfuscator',

        transform: options.global
            ? undefined
            : (code, id) => {
                  if (!filter(id)) return null;

                  const obfuscated = Obfuscator.obfuscate(code, {
                      ...options,
                      inputFileName: id,
                  });

                  return {
                      code: obfuscated.getObfuscatedCode(),
                      map: options.sourceMap
                          ? obfuscated.getSourceMap()
                          : undefined,
                  };
              },

        renderChunk: options.global
            ? (code, { fileName }) => {
                if(options.allowedFile && options.allowedFile(fileName)){
                    const obfuscated = Obfuscator.obfuscate(code, {
                        ...options,
                        inputFileName: fileName,
                    });
  
                    return {
                        code: obfuscated.getObfuscatedCode(),
                        map: options.sourceMap
                            ? obfuscated.getSourceMap()
                            : undefined,
                    };
                } else {
                    return
                }
              }
            : undefined,
    };
}