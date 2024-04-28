module.exports = {
  name: 'mobile',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: '/mobile/',
    },
  },
  site: {
    title: 'mobile',
    logo: 'https://cf-workphone.oss-cn-hangzhou.aliyuncs.com/W00000000001/goods/4c455ae6-eff2-4c24-a643-4628dfb9f51f/nnd511us0p1628147478509.svg',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
        ],
      },
    ],
  },
};
