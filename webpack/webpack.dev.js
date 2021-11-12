import path from 'path';
import {
    CleanWebpackPlugin
} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
    fileURLToPath
} from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, '../', 'build'),
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        open: true,
        contentBase: path.resolve(__dirname, '../', 'public'),
        port: 5001,
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            // {
            //     test: /\.(jpg|png|gif|jpeg)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name]-[contenthash].[ext]',
            //             esModule: false,
            //         }
            //     }, ]
            // },
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
        }),
    ]
}

export default config;