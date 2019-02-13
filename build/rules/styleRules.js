const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./../config')
const { resolve } = require('./../utils')
const theme = require('../../config/theme')

const sassLoader = {
    loader: 'sass-loader',
    options: {
        includePaths: [require('bourbon').includePaths, resolve('src/styles')]
    }
}

const lessLoader = {
    loader: 'less-loader',
    options: {
        javascriptEnabled: true,
        modifyVars: theme
    }
}

const typingsForCssModulesLoader = {
    loader: 'typings-for-css-modules-loader',
    options: {
        modules: true,
        namedExport: true,
        camelCase: true,
    }
}

const cacheLoader = {
    loader: 'cache-loader',
    options: {
        // provide a cache directory where cache items should be stored
        cacheDirectory: resolve('.cache-loader')
    }
}

module.exports = [
    {
        test: /\.css$/,
        include: [resolve('src')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cacheLoader,
            typingsForCssModulesLoader,
            'postcss-loader',
        ]
    },
    {
        test: /\.scss$/,
        include: [resolve('src')],
        use: [
            config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
            cacheLoader,
            typingsForCssModulesLoader,
            'postcss-loader',
            sassLoader
        ]
    },
    {
        test: /\.less$/,
        rules: [
            {
                use: [
                    config.extractCss ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    lessLoader
                ]
            }
        ]
    }
]
