const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    publicPath: process.env.NODE_ENV === "production" ? "/guided-tour-example/" : "/",
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
