module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/main.scss";`,
      },
    },
  },
}
