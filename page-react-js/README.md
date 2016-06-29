[page](https://github.com/visionmedia/page.js)

### Set up 

`npm init -f`

`npm install babel-loader babel-core babel-preset-es2015 babel-preset-react babel-preset-stage-0 webpack --save-dev`

`npm install react react-dom --save`

`npm install page --save`

### webpack.config.js

```js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  }
};
```