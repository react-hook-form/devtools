if (process.env.NODE_ENV === 'production') {
  module.exports = {
    DevTool: () => null,
  }
} else {
  module.exports = require('./dist/devtools.js')
}
