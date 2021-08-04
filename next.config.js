const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");
module.exports = {
  reactStrictMode: true,
  target: "serverless",
  images: {
    loader: "imgix",
    path: "",
  },
  plugins: [
    //ignore the drivers you don't want. This is the complete list of all drivers -- remove the suppressions for drivers you want to use.
    new FilterWarningsPlugin({
      exclude: [
        /mssql/,
        /mysql/,
        /mysql2/,
        /oracledb/,
        /pg/,
        /pg-native/,
        /pg-query-stream/,
        /react-native-sqlite-storage/,
        /redis/,
        /sqlite3/,
        /sql.js/,
        /typeorm-aurora-data-api-driver/,
      ],
    }),
  ],
};
