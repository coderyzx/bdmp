import routes from './router.config';
import webpackPlugin from './plugin.config';

const plugins = [
  // ref: https://umijs.org/plugin/umi-plugin-react.html
  ['umi-plugin-react', {
    antd: true,
    dva: true,
    dynamicImport: {
      webpackChunkName: true,
      level: 3,
     },
    title: 'react-boilerplate',
    dll: {
      exclude: ['foo'],
    },
    locale: {
      enable: true,
      default: 'zh-CN',
      baseNavigator: true,
    },
    routes: {
      exclude: [
        /models\//,
        /services\//,
        /model\.(t|j)sx?$/,
        /service\.(t|j)sx?$/,
        /components\//,
      ],
    },
  }]
]


// ref: https://umijs.org/config/
const config = {
  plugins,
  uglifyJSOptions(opts) {
    opts.uglifyOptions.compress.drop_console = true;
    opts.uglifyOptions.compress.drop_debugger = true;
    return opts;
  },
  // history: 'hash',
  treeShaking: true,
  targets: {
    ie: 11,
  },
  routes,
  proxy: {
    '/api': {
      target: 'http://your.domain.com',
      changeOrigin: true,
      pathRewrite: {
        '^/your': '',
      },
    },
  },
  chainWebpack: webpackPlugin,
}

export default config;
