
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ mode } = { mode: "production" }) => {
    console.log(`mode is: ${mode}`);

    return {
            mode,
            entry: "./src/index.js",
            devServer: {
               
                open: true
            },

            output: {
                publicPath: "/",
                path: path.resolve(__dirname, "build"),
                filename: "bundle.js"
            },
            module: {
                rules: [
                 {
                    test: /\.jpe?g|png$/,
                    exclude: /node_modules/,
                    use: ["url-loader", "file-loader"]
                },
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loader: "babel-loader"
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: "./public/index.html"
                }),
            ]
        }
};
