const express = require('express');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');

const app = express();
const port = process.env.PORT_SERVER || process.env.PORT || 8081;


// const moment = require('moment');
// app.locals.moment = require('moment');

global.environment = process.env.NODE_ENV || 'development';

const {Pool} = require('pg');

if(global.environment==='development') {
  global.pool = new Pool({
    user: "eqbuarubtngscp",
    host: "ec2-3-233-7-12.compute-1.amazonaws.com",
    database: "des3ueomk92hc2",
    password: "9f05b5aaeb99b04334115b0a2be4bb79f8ae288060ac2e54ce9c1befc3e68dac",
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
else {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

const userController = require('./controllers/users');
const messagesController = require('./controllers/messages');
const queryModel = require('./models/query');


app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// app.get('/api/blog/:id?', adminController.blog);
// app.get('/api/page/:id', adminController.page);

app.get('/getMessages/:id', messagesController.getMessages);
app.post('/signUp', userController.createUser);
// app.get('/teste', (req, res, next)=> {
//   // req.params
//   // req.query
//   // req.body
//   console.log('EAE');
//   res.send('EAE tudo tranquilo');
//  // next();
// });
// app.get('/teste2', (req, res)=>{
//   res.json({asd: 'sdsd', pppp: 'wqeqwe'});
// });


// Busca arquivos na pasta Dist
app.use(express.static(path.join(__dirname, './dist')));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

const server = app.listen(port, () => console.log(`Listening on port ${port}`));



// const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//
//
// const emitMostRecentMessges = async () => {
//   const result = await queryModel.getMessages();
//   io.emit("chat message", result);
// };

const chats = {};


io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chatMessage", async (msg) => {
 //   await queryModel.createMessages(JSON.parse(msg));
   // await emitMostRecentMessges();
  });
  socket.on("chatJoin", async (msg) => {
    console.log('msg', msg);
    const {id, name, userId} = msg;
    if(!chats[id]) {
      chats[id] = {
        users: [],
        name: name
      };
    }
    chats[id].users.push({
      socket: socket,
      userId: userId,
    })
    console.log('msg', msg);
    // socket.send("EAE!");
    socket.emit("newMessage", "EAE");
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


