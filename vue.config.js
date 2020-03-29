module.exports = {
  configureWebpack: {
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://64.227.19.127:3799/api/v1'
            // apiUrl: 'http://api.mythril.io/api/v1'
            // apiUrl: 'http://127.0.0.1:5000/api/v1'
        })
    }
  }
}
