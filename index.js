if (process.env.NODE_ENV === 'production') {
  module.exports = {
    DevTool: () => null,
  }
} else {
  module.exports = require('./dist/react-hook-form-devtools.js')
}
