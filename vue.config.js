const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/guided-tour-example/" : "http://127.0.0.1:8080",
    transpileDependencies: true,
    css: {
        extract: {
            filename: "[name].css",
            chunkFilename: "[name].css",
        },
    },
    configureWebpack: {
        output: {
            filename: "[name].js",
            chunkFilename: "[name].js",
        },
    },
});
