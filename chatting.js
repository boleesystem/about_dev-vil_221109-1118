/* 설치한 express 모듈 불러오기 */
const express = require("express");
/* express 객체 생성 */
const app = express();
/* Node.js 기본 내장 모듈 불러오기 */
const http = require("http");
/* express http 서버 생성 */
const server = http.createServer(app);
/* 설치한 socket.io 모듈 불러오기 */
const { Server } = require("socket.io");
const io = new Server(server);
let connected = [];
/* 메세지의 상태를 나타낼 className 변수 선언 */
const className = ''

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});



//연결이 성립되면
io.on("connection", (socket) => {
    //연결이 성립됨과 동시에 채팅 앱 상에는 웰컴 메세지를 띄운다.
    io.emit('announce', `${socket.id}님, 환영합니다. 접속해 있는 유저들에게 메세지를 보내보세요!`
    );

    connected.push(socket.id);
    io.emit('online', connected);
    //연결이 끊기면
    //채팅 앱 상에는 디스커넥트 메세지를 띄운다.
    //연결이 끊김과 동시에 disconnected 됐다는 콘솔로그를 찍어준다.
    socket.on("disconnect", () => {
        console.log("user disconnected");
        io.emit('announce', ` ${socket.id}가 퇴장했습니다.`);
        // 나가는 사람을 제외한 나머지 유저에게만 메세지를 전송한다.
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
    });


    //서버의 모든 요청을 console.log로 띄운다. 디버그 전용
    socket.onAny((event, ...args) => {
        console.log(event, args);
    })



server.listen(3001, () => {
    console.log("listening on *:3001");
})