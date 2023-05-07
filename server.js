import express from 'express';
import path from 'path';
import HomeController from './controllers/homeController.js';
import verifyController from './controllers/verifyController.js'
import loginController from './controllers/loginController.js'
import linkedController from './controllers/linkedController.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import passport from 'passport'
import session from 'express-session'
import { Strategy } from 'passport-discord'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import User from './models/User.js'
import bodyParser from 'body-parser'
let scopes = ['identify', 'email', 'guilds', 'guilds.join'];

config()


function getCurrentDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}

const __dirname = getCurrentDirectory()

const app = express()
// Configurações da aplicação


// Conexão com o banco de dados
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Views
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: true
}));

passport.use(new Strategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/verify',
  scope: scopes
},
async function(accessToken, refreshToken, profile, cb) {
  let data = await User.findOne({ id: profile.id })

  if(data) {
    return cb(null, data);
  } else {
    data = new User({
      id: profile.id
    })
    data.save()

    return cb(null, data);
  }
}));
passport.serializeUser((user, done) => {
  done(null, user);
});
// Rotas
app.get('/', HomeController);
app.get('/verify', verifyController)
app.get('/login', loginController)
app.post('/linked-roles', linkedController)

app.use((req, res) => {
  res.render('404');
});

app.use((err, req, res, next) => {
  res.render('500', {
    message: err.message
  })

  console.log(err)
});

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
