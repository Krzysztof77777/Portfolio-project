import path from 'path';
import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {
    fileURLToPath
} from 'url';
import autoprefixer from 'autoprefixer';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'production',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name]-[contenthash].js',
        path: path.resolve(__dirname, '../build'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "react/jsx-dev-runtime": "react/jsx-dev-runtime.js",
            "react/jsx-runtime": "react/jsx-runtime.js"
        }
    },
    performance: {
        hints: false
    },
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            },
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [autoprefixer]
                            },
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[contenthash].[ext]',
                            esModule: false,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 70,
                                progressive: true
                            }
                        }
                    },
                ]
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                }, ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public', 'index.html'),
            minify: {
                collapseWhitespace: true
            },
        }),
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),
    ]
}

export default config;