var cooking = require('cooking');
var config = require('../config');

cooking.set({
  entry: './src/index.js',
  dist: './lib',
  clean: false,
  format: 'cjs',
  // alias: {
  //   'vue2': 'vue/dist/vue.common.js'
  // },
  extends: ['vue2'],
  minimize: false,
  alias: config.alias,
  externals: config.externals
});

cooking.add('output.filename', 'mueditor.common.js');
cooking.add('loader.js.exclude', config.jsexclude);
cooking.add('vue.preserveWhitespace', false);
module.exports = cooking.resolve();
