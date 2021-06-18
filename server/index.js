const express = require('express');
const compression = require('compression');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const proxy = require('express-http-proxy');
// var oauthServer = require('express-oauth-server');
const oauthServer2 = require('node-oauth2-server');
const url = require('url');
const authModel = require('./models/auth');
const userController = require('./controllers/users');
const Connection = require('./controllers/Connection');

const app = express();
const port = process.env.PORT_SERVER || process.env.PORT || 8081;

global.environment = process.env.NODE_ENV || 'development';

const {Pool} = require('pg');

//Config BD
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
  global.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
}

//Config app
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


// Add OAuth server.
app.oauth = new oauthServer2({
  model: authModel,
  grants: ['password'],
  debug: true,
});

const authRouter = require('./router/authRouter');


app.use('/api', authRouter.authRouter(express.Router(), app));
app.use(app.oauth.errorHandler())

app.get('/api/listUsers', app.oauth.authorise(), userController.listUsers);
app.get('/enter', app.oauth.authorise(), (req, res)=>{

  res.send('Parabéns, você está conectado');
});

// Busca arquivos na pasta Dist
if (process.env.NODE_ENV === 'production') {
  console.log('Start production', __dirname);
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../dist')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'));
  });
}
else {
  app.use(proxy('localhost:8080'));
  console.log('Start dev', __dirname);
}

const server = app.listen(port, () => console.log(`Listening on port ${port}`));


const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  new Connection.Connection(socket);
});