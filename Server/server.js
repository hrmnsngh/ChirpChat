const app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chirpchat'
});
var clientNo = 0;
users = [];
loginUser = [];
var userSearchResult = null;
//Search user in database
function userSearch(username) {
    sqlSearch = "Select username FROM Users WHERE username='" + username + "'";
    connection.query(sqlSearch, function (err, result, fields) {

        if (err) {
            throw err;
        } else if (result[0] != null) {
            // console.log(result, fields);
            // console.log('Database result : ', result[0].username);
            userSearchResult = result[0].username;
        }
    });
}
//Connecting to the socket
connection.connect(function (err) {
    if (err) {
        throw err;
    } else {
        console.log('Database connected');
    }
    io.on('connection', (socket) => {
        clientNo++;
        console.log('User Connected');
        console.log(clientNo + ' user connected');
        //Login Backend Service
        socket.on('login', (data) => {
            console.log('Attempting Login');
            userSearch(data.username);
            setTimeout(() => {
                if (userSearchResult != null) {
                    if (data.username.toLowerCase() === userSearchResult.toLowerCase()) {
                        // console.log('In if');
                        socket.emit('response', { data: '1' });
                        console.log('Username already taken, register with some other username');
                    }
                } else {
                    // console.log('In else');

                    console.log('Not Found : ');
                    socket.emit('response', { data: '-1' });

                }
            }, 5000);
        });
        //New User registration
        socket.on('register', (data) => {
            console.log('User registration attempt');
            console.log('data : ' + data.username);
            userSearch(data.username);
            setTimeout(() => {
                if (userSearchResult != null) {
                    if (data.username.toLowerCase() === userSearchResult.toLowerCase()) {
                        // console.log('In if');
                        socket.emit('response', { data: '-1' });
                        console.log('Username already taken, register with some other username');
                    }
                } else {
                    // console.log('In else');
                    console.log('Inserting user details into database');
                    var sqlIns = "INSERT INTO Users (username, password, email, mobile, age) VALUES ('" + data.username + "', 'password', 'asd@ad.com', '0123456789', '24')";
                    connection.query(sqlIns, function (err, result, fields) {
                        if (err) throw err;
                        console.log('Database : ', result);
                        socket.emit('response', { data: '1' });
                    });
                }
            }, 2000);
        }
        );
        //Checking Username for Chat page
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
            io.sockets.emit('newmessage', { user: data.user, message: data.message, date: currentDate });
        });
        socket.on('disconnect', function () {
            clientNo--;
            console.log('User disconnected');
            console.log(clientNo + ' user connected');
        });
    });
});
http.listen(5000, () => {
    console.log('Listening to 5000')
});