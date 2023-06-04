const { defineConfig } = require('@vue/cli-service')
const electron = require('electron')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#C2BDB7',
            // 'link-color': '#DCDCDC',
            // 'border-radius-base': '2px',
            // 'text-color':'#000000',
            // 'text-color-secondary':'#000000',
            // 'disabled-color':'#000000'
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      // preload: 'src/preload.js',
      nodeIntegration: true,
      externals: ['electron','FileReader'], 
      nodeModulesPath: ['../../node_modules', './node_modules', '../node_modules']
    }
  }
})
