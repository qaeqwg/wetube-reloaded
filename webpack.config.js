// css와 js코드 분리시키는 역할 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");

module.exports = {
    // 변형하고싶은 파일의 경로
    entry: "./src/client/js/main.js",
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
    mode: "development",
    // 파일이 변경될 때마다 자동 적용
    watch: true,
    output: {
        // 변형한 파일의 파일명과 저장할 경로
        filename: "js/main.js",
        path: path.resolve(__dirname, "assets"),
        // ouytput folder를 bulid 전 알아서 clean시켜줌
        clean: true,
    },
    module: {
        rules: [
            {
                // 모든 .js확장자 파일을 
                test: /\.js$/,
                use: {
                    // babel-loader라는 loader를 통해 구식 브라우저도 이해할 수 있는 코드로 가공
                    // loader란? -> 파일들을 원하는 포맷으로 변환하는 장치 
                    loader: 'babel-loader',
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
            {
                test: /\.scss$/,
                // 사용하고자 하는 loader를 역순으로 입력
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ],
    }
};