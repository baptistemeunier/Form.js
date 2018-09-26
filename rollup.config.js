import babel from 'rollup-plugin-babel'

const path = require('path');
const pkg = require(path.resolve(__dirname, 'package.json'))

module.exports = {
  input: 'src/js/berlioz-form-collection.js',
  external: ['jquery'],
  plugins: [
    babel({
            exclude: 'node_modules/**'
          })
  ],
  output: {
    banner: `/*!
  * Berlioz Form JS v${pkg.version} (${pkg.homepage})
  * Copyright 2018 ${pkg.author}
  * Licensed under MIT (https://github.com/BerliozFramework/Form.js/blob/master/LICENSE)
  */`,
    format: 'umd',
    name: 'BerliozCollection',
    sourcemap: true,
    globals: {
      jquery: 'jQuery'
    },
    file: 'dist/js/berlioz-form-collection.js',
  }
}