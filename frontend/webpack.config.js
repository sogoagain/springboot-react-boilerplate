const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./config/files");
const PAGE_DIR = path.join("src", "pages", path.sep);

const SPRING_STATIC_PATH = "../src/main/resources/static";
const SPRING_PAGES_PATH = "../src/main/resources/templates";

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map(filePath => {
    const outputFile = path.basename(filePath);
    const inputPath = outputFile.replace(path.extname(outputFile), "");
    // { chunks:["contact", "vendor"], template: "src/pages/contact.html",  filename: "contact.html"}
    return new HtmlWebPackPlugin({
        chunks: [inputPath, "vendor"],
        template: filePath,
        filename: path.resolve(__dirname, path.resolve(SPRING_PAGES_PATH, outputFile))
    });
});

// { contact: "./src/pages/contact.js" }
const entry = getFilesFromDir(PAGE_DIR, [".js"]).reduce((obj, filePath) => {
    const fileName = path.basename(filePath);
    const entryChunkName = fileName.replace(path.extname(fileName), "");
    obj[entryChunkName] = `./${filePath}`;
    return obj;
}, {});

module.exports = (env, argv) => ({
    entry: entry,
    output: {
        path: path.resolve(__dirname, SPRING_STATIC_PATH),
        filename: "[name].js",
        publicPath: '/static'
    },
    devtool: argv.mode === 'production' ? false : 'eval-source-maps',
    plugins: [
        ...htmlPlugins
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", {loader: "css-loader"}],
                exclude: /node_modules/,
            },
            {
                test: /\.(svg|jpg|gif|png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: (url, resourcePath, context) => {
                                if (argv.mode === 'development') {
                                    const relativePath = path.relative(context, resourcePath);
                                    return `/${relativePath}`;
                                }
                                return `/assets/images/${path.basename(resourcePath)}`;
                            }
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        minimize: argv.mode === 'production' ? true : false,
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    },
    devServer: {
        inline: true,
        hot: true,
        contentBase: path.resolve(__dirname, SPRING_STATIC_PATH),
        publicPath: '/static',
        filename: '[name].js',
        host: 'localhost',
        port: 3000,
        proxy: {
            '**': 'http://localhost:8080/'
        },
    }
});