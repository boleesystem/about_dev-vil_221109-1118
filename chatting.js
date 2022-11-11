const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let connected = [];


app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});

//연결이 성립되면
io.on("connection", (socket) => {
    //연결이 성립됨과 동시에 채팅 앱 상에는 웰컴 메세지를 띄운다.
    io.emit('announce', `${socket.id}님, 환영합니다. 접속해 있는 유저들에게 메세지를 보내보세요!`);

    connected.push(socket.id);
    io.emit('online', connected);
    //연결이 끊기면
    //채팅 앱 상에는 디스커넥트 메세지를 띄운다.
    //연결이 끊김과 동시에 disconnected 됐다는 콘솔로그를 찍어준다.
    socket.on("disconnect", () => {
        console.log("user disconnected");
        io.emit('announce', ` ${socket.id}가 퇴장했습니다.`);
        connected = connected.filter(id => id !== socket.id);
        io.emit('online', connected);
    });

    //editing 상태일 경우 채팅창에 socket.id 가 입력중임을 나타내준다.
    socket.on('editing', () => {
        io.emit('editing', `${socket.id} 가 입력중입니다.`);
    })
    //nickname 
    socket.on('nickname', (msg) => {
        socket.data.username = msg;
    })
    //chat message로 요청되는 모든 request는 nickname이 설정되어있다면 닉네임 + 메세지 아니면 socket.id + 메세지의 형태를 띈다.
    socket.on('chat message', (msg) => {
        io.emit('chat message', { name: socket.data.username || socket.id, msg });
        console.log('message: ' + msg);
    });

    socket.on('whisper', (msg) => {
        io.emit('whisper', { name: socket.data.username || socket.id, msg });
        console.log('message: ' + msg);
    });

    //서버의 모든 요청을 console.log로 띄운다. 디버그 전용
    socket.onAny((event, ...args) => {
        console.log(event, args);
<<<<<<< HEAD
    })
})
=======
    });
});
>>>>>>> parent of fa2844b (Taehyeon # test commit)



server.listen(3001, () => {
    console.log("listening on *:3001");
});