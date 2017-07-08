const fs = require('fs')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const app = express()
let options = {lazy: true}
let config = require('./webpack.config')
let compiler = webpack(config)
let middleware = webpackDevMiddleware(compiler, options)

app.use((req, res, next) => {
    const entry = req.path.substring(1).replace('.js', '')
    const target = `./src${req.path}`
    const exists = Object.keys(config.entry).indexOf(entry) !== -1
    if(!exists && fs.existsSync(target)) {
        config.entry[entry] = target
        compiler = webpack(config)
        middleware = webpackDevMiddleware(compiler, options)
    }
    middleware(req, res, next)
})

app.listen(process.env.PORT || 3000)
