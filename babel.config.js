module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'mobx'
  ];

  const plugins = [
    ['@babel/plugin-transform-private-methods', { 'loose': true }],
    ['@babel/plugin-transform-private-property-in-object', { 'loose': true }],
    process.env.NODE_ENV === 'development' && 'react-refresh/babel'
  ].filter(Boolean);

  return {
    presets,
    plugins
  };
}
