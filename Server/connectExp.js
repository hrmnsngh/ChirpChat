var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'chirpchat'
});

function userSearch() {

}
connection.connect(function (err) {
  console.log('Database connected');
  var username = 'zingh';
  sqlSearch = "Select username FROM Users WHERE username='" + username + "'";
  var resultI = null;

  connection.query(sqlSearch, function (err, result, fields) {

    if (err) {
      throw err;
    } else if (result[0] != null) {
     // console.log(result, fields);
     // console.log('Database result : ', result[0].username);
      resultI = result[0].username;
    }

  });
  // console.log(resultI);
  setTimeout(() => {
    if (resultI != null) {
      if (username.toLowerCase() === resultI.toLowerCase()) {
       // console.log('In if');
        console.log('Username already taken, register with some other username');
      }
    } else {
     // console.log('In else');
     console.log('Inserting user details into database');
      var sqlIns = "INSERT INTO Users (username, password, email, mobile, age) VALUES ('" + username + "', 'password', 'asd@ad.com', '0123456789', '24')";
      connection.query(sqlIns, function (err, result, fields) {
        if (err) throw err;
        console.log('Database : ', result);
      });
      // var sqlDisp = "SELECT * FROM Users";
      // console.log('User after registration : ' + connection.query(sqlDisp, function (err, result, fields) {
      //   if (err) throw err;
      //   console.log('Database : ', result);
      // }));

    }

  }, 2000);

});