module.exports = {
  configureWebpack: {
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://67.205.134.50:20446/api/v1'
            // apiUrl: 'http://api.mythril.io/api/v1'
            // apiUrl: 'http://127.0.0.1:5000/api/v1'
        })
    }
  }
}
