const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientNo = 0;
users = [];
loginUser = [];
io.on('connection', (socket) => {
    clientNo++;
    console.log('User Connected');
    console.log(clientNo + ' user connected');

     socket.on('login', (username) => {
         console.log('Attempting Login');
        if (loginUser.indexOf(username) === -1 ) {
            socket.emit('userSet', { response: '1'});
            
        } else {
            if (loginUser.indexOf(data.password)) {
                socket.emit('userSet', { response : '-1' });
                console.log('User name Already Exists');
            }
           
        }

    });
    socket.on('register', (data) => {
        console.log('User registration attempt, Existing users : ' + loginUser);
        console.log('data : '+data.username);
        if(loginUser.indexOf(data.username) === -1 ) {
            console.log('in If' + data['username']);
            loginUser.push(data);
            console.log('User after registration : ' + loginUser.toString());
            socket.emit('userSet', { response : '1'});
        } else {
            socket.emit('userSet', { response : '-1'});
            console.log('Username already taken, register with some other username');
        }
    });
    socket.on('setUserName', function (user) {
        console.log('Users Before Checking' + users);
        if (users.indexOf(user) === -1) {
            console.log(user);
            console.log('Users After Checking' + users);
            users.push(user);
            socket.emit('userSet', { username: user });


        } else {
            socket.emit('userSet', { username: '-1' });
            console.log('User name Already Exists');
        }

    });
    socket.on('addmessage', function (data) {
        let currentDate = new Date;
        console.log(data);
        io.sockets.emit('newmessage', {user: data.user, message: data.message, date: currentDate });
    });



    socket.on('disconnect', function () {
        clientNo--;
        console.log('User disconnected');
        console.log(clientNo + ' user connected');
    });


});

http.listen(5000, () => {
    console.log('Listening to 5000')
});