const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const http = require('http');
const auth = require('./Routers/Auth');
const image = require('./Routers/Image');
const message = require('./Routers/Message');
const chat = require('./Routers/Chat');
const login = require('./Routers/Login');
const groups = require('./Routers/Group');
const bodyParser = require("body-parser");
const socket = require('socket.io');

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "cats", resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('strictQuery', false);
const mongoDb = 'mongodb+srv://dyhlin2000:damian1216@cluster0.u3nqdtv.mongodb.net/messge_app?retryWrites=true&w=majority&appName=Cluster0';

async function main(){
    mongoose.connect(mongoDb);
};

main().catch((err) => console.log(err));

app.use('/api/register', auth);
app.use('/api/login', login);
app.use('/api/postimage', image);
app.use('/api/message', message);
app.use('/api/chat', chat);
app.use('/api/group', groups);


const server = app.listen(5000, () => console.log("App is listening on 5000"));

const io = socket(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

io.on('connection', (socket) => {
    console.log('connected:' +socket.id);

    socket.on('join_chat', (data) => {
        console.log(`user ${socket.id} joined the room ${data}`)
        socket.join(data);
    });

    socket.on('send_message', (data) => {
        socket.to(data.chat).emit('receive_message', data);
        console.log(data);
    });

    socket.on('disconnect', () => {
        console.log('disconnected:' + socket.id);
    });
});