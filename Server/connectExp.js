var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database: 'chirpchat'
});

// var server1 = require('server');
// connection.connect(function(err) {
//     if (err) {
//         throw err;
//     } else {
//         console.log('Connected');
//         var sqlCreate= "CREATE TABLE Users (username varchar(20) NOT NULL PRIMARY KEY, password varchar(20) NOT NULL, email varchar(30), mobile varchar(10), age varchar(3))";
//         var sqlIns= "INSERT INTO Users (username, password, email, mobile, age) VALUES ('sarthak', 'password', 'harman@abc.com', '0123456789', '24')";
//         var sqlDisp= "SELECT * FROM hrmn";
//         var sqlDel = "DELETE FROM hrmn WHERE name='harman'";
//        // connection.query(sqlIns, function(err, result)  {
//             if (err) throw err;
//             console.log('Database : ', result);
//         });
//     }

});