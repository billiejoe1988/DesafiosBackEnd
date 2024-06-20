import mongoStore from "connect-mongo";

export const configSession = {
  secret: "sessionKey",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 10000,
  },
  store: new mongoStore({
    mongoUrl:
      "mongodb+srv://admin:admin@cluster0.vcjyxe3.mongodb.net/coderhouse?retryWrites=true&w=majority",
    ttl: 10,
  }),
};
