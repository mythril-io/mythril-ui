module.exports = {
  configureWebpack: {
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://161.35.12.227/api/v1'
            // apiUrl: 'http://127.0.0.1:5000/api/v1'
        })
    }
  }
}
