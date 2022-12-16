const express = require("express");
const cors = require("cors");
const { verifyToken } = require("./middlewares/jwt-auth");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const httpProxy = require("http-proxy");
const port = process.env.PORT || 5000;

const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: 'https://bullchain-traders.com'
  }
});


// const server = http.createServer(app);
// const io = socketio(server);
// io.on('connection', (socket) => {
//   io.emit('message from server', 'message from server - It Works!')
// })

// let users = [];

// const addUser = (user, socketId) => {
//   !users.some((us) => us.id === user.id) && users.push({user, socketId});
// };
// io.on("connection", (socket) => {
//   socket.on('loggedUser', user => {
//     addUser(user.id, socket.id);
//     adminSocketId = user.role === 'admin' && socket.id
//     io.to(adminSocketId).emit('getLoggedUsers', users);
//   })
// });

// httpServer.listen(process.env.PORT || 5000);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);
// Database
const db = require("./config/db");
// const whitelist = ["http://localhost:3000"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (whitelist.indexOf(req.header("Origin")) !== -1) {
  //     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  //   } else {
    //     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };
// app.use(cors(corsOptionsDelegate));
app.use(cors());
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Methods",'GET, OPTIONS, PATCH, PUT,DELETE,POST');
//   if (req.method === "OPTIONS") {
  //     return res.sendStatus(200);
//   }
//   next();
// });
// Routers
const cryptoPricesRouter = require("./routes/cryptoCurrenciesWebsocket");
const usersRouter = require("./routes/userRoute");
const transactionRouter = require("./routes/transactionRoute");
const orderRouter = require("./routes/orderRoute");
const favouritesRouter = require("./routes/favouritesRoute");
const withdrawHistoryRouter = require("./routes/withdrawHistoryRoute");
const affiliateRouter = require("./routes/affiliateRoute");
const paymentRouter = require("./routes/paymentRoute");
// Test DB
db.authenticate().then(() => console.log("Database connected ..."));

// Sync Database to keep tables up to date and listen on previously defined port
//db.sync({ alter: true }) // user alter: true when we are making changes in realation
db.sync({ alter: true })
.then(() => {
  httpServer.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    io.on("connection", function (socket) {
      socket.on("newRegistration", function(message) {
        socket.broadcast.emit("newRegistration", message)
      })
      socket.on("login", function(message) {
        socket.broadcast.emit("login", message)
      })
      socket.on("deposit", function(message) {
        socket.broadcast.emit("deposit", message)
      })
      socket.on("withdraw", function(message) {
        socket.broadcast.emit("withdraw", message)
      })
      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
    })
  });
  // server.listen(port)
})
.catch((err) => console.log(err));
// httpServer.listen(5000, () => {
//   console.log("Websocket started at port ", 5000)
// });
app.all("*", verifyToken);
app.use("/api/crypto-prices", cryptoPricesRouter);
app.use("/api/users", usersRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/orders", orderRouter);
app.use("/api/favourites", favouritesRouter);
app.use("/api/withdrawHistory", withdrawHistoryRouter);
app.use("/api/affiliate", affiliateRouter);
app.use("/api/payment", paymentRouter);
