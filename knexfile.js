/*

export default {
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: false,
}
*/
//dev/test version

export default {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./mydb.sqlite",
    },
    useNullAsDefault: true,
    debug: false,
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    useNullAsDefault: false,
    debug: false,
  },
}
