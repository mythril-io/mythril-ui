module.exports = {
  configureWebpack: {
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://api.mythril.io/api/v1'
            // apiUrl: 'http://127.0.0.1:5000/api/v1'
        })
    }
  }
}
