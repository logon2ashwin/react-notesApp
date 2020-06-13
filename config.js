export default {
  development: {
    host: "http://127.0.0.1",
    port: ":4500",
    apiVersion: ""
  },
  production: {},
  api: {
    getNotesList: "/getNotes",
    userLogin: "/auth/login",
    postNote: "/createNote"
  }
};
