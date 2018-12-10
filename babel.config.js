module.exports = function(api) {
  api.cache.never()

  const config = {
    presets: [
      [
        "@babel/preset-env",
        {
          "targets": {
            "browsers": ["last 2 versions", "safari >= 7", "ie >= 11"],
          },
            "forceAllTransforms": true

        }
      ]
    ],
    plugins: ["transform-es2015-arrow-functions"]
  }

  return config;
}
