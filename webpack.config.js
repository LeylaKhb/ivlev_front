const { join, resolve} = require("path");

module.exports = {
    mode: "development",
    entry: "./src/App.tsx", // входная точка - исходный файл
    output:{
        path: resolve(__dirname, "./public/dist"),     // путь к каталогу выходных файлов - папка public
        publicPath: "/public/",
        filename: "bundle.js"       // название создаваемого файла
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.jpeg'],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: join(__dirname, "/"),
        },
        port: 8081,
        open: true
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: ["babel-loader"],
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|j?g|svg|gif|jpeg)?$/,
                use: 'file-loader',
                include: resolve(__dirname, 'src')
            }
        ]
    }
}