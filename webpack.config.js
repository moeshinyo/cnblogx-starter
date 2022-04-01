const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HtmlWebpackSkipAssetsPlugin } = require('html-webpack-skip-assets-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = (env, argv) => {
    const MODE_PRODUCTION = argv.mode === 'production';
    const STANDALONE_JS = MODE_PRODUCTION && env.STANDALONE_JS;
    const STANDALONE_CSS = MODE_PRODUCTION && env.STANDALONE_CSS;
    const TAG_CUSTOM_HTML = '__blog-custom-html';

    const CUSTOM_BANNER = fs.readFileSync('./BANNER.txt', 'utf8');
    const DEV_SERVER_PORT = 6454;
    const CUSTOM_OUTPUT_HTML = 'custom.html';
    const CUSTOM_OUTPUT_CSS = 'custom.css';
    const CUSTOM_OUTPUT_JS = 'custom.js';
    const PUBLIC_PATH = '';

    const config = {
        target: 'browserslist',
        entry: './infra/entry.ts',
        output: {
            filename: CUSTOM_OUTPUT_JS,
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devServer: {
            allowedHosts: 'all',
            port: DEV_SERVER_PORT,
            hot: 'only',
            host: 'localhost',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        module: {
            rules: [
                {
                    test: /\.(m?js|ts)$/i,
                    exclude: /node_modules/i,
                    use: [{
                        loader: 'babel-loader', options: {
                            presets: [
                                ["@babel/preset-env"], 
                                ['@babel/preset-typescript']
                            ]
                        }
                    }],
                },
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /node_modules/,
                    use: [
                        STANDALONE_CSS ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        require('autoprefixer'),
                                        require('postcss-color-hex-alpha'),
                                    ],
                                }
                            }
                        },
                        'sass-loader',
                    ],
                },
                // TIP: 在这里添加新的loader规则。
            ],
        },
        resolve: {
            extensions: ['.ts', '.js'],
        },
        plugins: [
            new ESLintPlugin({
                extensions: ['ts', 'js'], 
            }), 
            new HtmlWebpackPlugin({
                filename: CUSTOM_OUTPUT_HTML,
                inject: false,
                scriptLoading: 'blocking',
                template: '!!ejs-compiled-loader!./infra/entry.ejs',
                templateParameters: {
                    __TAG_CUSTOM_HTML: TAG_CUSTOM_HTML,
                },
                publicPath: MODE_PRODUCTION ? PUBLIC_PATH : `http://localhost:${DEV_SERVER_PORT}/`,
            }),
            new webpack.BannerPlugin({
                banner: CUSTOM_BANNER,
                test: /\.(css|js)$/i,
            }),
            new webpack.DefinePlugin({
                __TAG_CUSTOM_HTML: JSON.stringify(TAG_CUSTOM_HTML),
                __CUSTOM_OUTPUT_HTML: JSON.stringify(CUSTOM_OUTPUT_HTML),
                __DEV_SERVER_PORT: JSON.stringify(`${DEV_SERVER_PORT}`),
            }),
            new HtmlWebpackSkipAssetsPlugin({
                excludeAssets: []
                    .concat(STANDALONE_CSS ? [CUSTOM_OUTPUT_CSS] : [])
                    .concat(STANDALONE_JS ? [CUSTOM_OUTPUT_JS] : []),
            }),
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: false,
                }),
                new CssMinimizerPlugin(),
            ],
        },
    };

    if (MODE_PRODUCTION) {
        if (STANDALONE_CSS) {
            config.plugins = config.plugins.concat([
                new MiniCssExtractPlugin({
                    filename: CUSTOM_OUTPUT_CSS,
                }),
            ]);
        }

        if (!STANDALONE_JS) {
            config.plugins = config.plugins.concat([
                new HtmlInlineScriptPlugin({
                    scriptMatchPattern: [CUSTOM_OUTPUT_JS],
                }),
            ]);
        }
    }

    return config;
};