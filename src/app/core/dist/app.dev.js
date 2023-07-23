"use strict";

// const oracledb = require('oracledb');
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 3000;
// app.use(cors());
// // Cấu hình kết nối đến Oracle database
// const dbConfig = {
//   user: 'admin',
//   password: 'Admin1',
//   connectString: 'localhost:1521/test', // SID là 'test' và port là 1521
// };
// app.get('/api/users/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     // Kết nối đến Oracle database
//     const connection = await oracledb.getConnection(dbConfig);
//     console.log('Connected to Oracle Database')
//     // Thực hiện truy vấn lấy dữ liệu từ bảng USERS theo trường ID
//     const userResult = await connection.execute('SELECT * FROM USERS WHERE ID = :id', [id]);
//     // Kiểm tra xem có dữ liệu người dùng không
//     if (userResult.rows.length === 0) {
//       res.status(404).json({ message: 'User not found' });
//       return; // Return early to exit the function
//     }
//     // Thực hiện truy vấn lấy dữ liệu từ bảng CARD theo trường CODE 
//     const code = userResult.rows[0][0];
//     const cardResult = await connection.execute('SELECT * FROM CARD WHERE CODE = :code', [code]);
//     // Đóng kết nối sau khi thực hiện truy vấn
//     await connection.close();
//     // Kiểm tra xem có dữ liệu thẻ không
//     if (cardResult.rows.length === 0) {
//       res.status(404).json({ message: 'Card not found' });
//       return; // Return early to exit the function
//     }
//     // Trả về dữ liệu người dùng và thẻ dưới dạng JSON
//     res.json({ user: userResult.rows[0], card: cardResult.rows[0] });
//   } catch (err) {
//     console.error('Error executing database query:', err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
var oracledb = require('oracledb');

var express = require('express');

var cors = require('cors');

var app = express();
var port = 3000;
app.use(cors()); // Cấu hình kết nối đến Oracle database

var dbConfig = {
  user: 'admin',
  password: 'Admin1',
  connectString: 'localhost:1521/test' // SID là 'test' và port là 1521

}; // Kết nối đến Oracle database

function connectToDB() {
  return regeneratorRuntime.async(function connectToDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(oracledb.createPool(dbConfig));

        case 3:
          console.log('Connected to Oracle Database');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Error connecting to Oracle Database:', _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
} // Thực hiện truy vấn lấy thông tin người dùng từ bảng USERS theo ID


function getUser(id) {
  var connection, userQuery, userResult;
  return regeneratorRuntime.async(function getUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context2.sent;
          userQuery = 'SELECT * FROM USERS WHERE ID = :id';
          _context2.next = 7;
          return regeneratorRuntime.awrap(connection.execute(userQuery, [id]));

        case 7:
          userResult = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(connection.close());

        case 10:
          if (!(userResult.rows.length === 0)) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", null);

        case 12:
          return _context2.abrupt("return", {
            code: userResult.rows[0][0],
            name: userResult.rows[0][1],
            email: userResult.rows[0][2],
            address: userResult.rows[0][3],
            phone: userResult.rows[0][4],
            tel: userResult.rows[0][5],
            id: userResult.rows[0][6]
          });

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error('Error executing getUser query:', _context2.t0);
          throw _context2.t0;

        case 19:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 15]]);
} // Thực hiện truy vấn lấy thông tin thẻ từ bảng CARD theo CODE


function getCard(code) {
  var connection, cardQuery, cardResult;
  return regeneratorRuntime.async(function getCard$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context3.sent;
          cardQuery = 'SELECT * FROM CARD WHERE CODE = :code';
          _context3.next = 7;
          return regeneratorRuntime.awrap(connection.execute(cardQuery, [code]));

        case 7:
          cardResult = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(connection.close());

        case 10:
          if (!(cardResult.rows.length === 0)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", null);

        case 12:
          return _context3.abrupt("return", {
            id: cardResult.rows[0][0],
            code: cardResult.rows[0][1],
            position: cardResult.rows[0][2],
            forte: cardResult.rows[0][3],
            department: cardResult.rows[0][4],
            nickname: cardResult.rows[0][5],
            unit: cardResult.rows[0][6],
            title: cardResult.rows[0][7]
          });

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.error('Error executing getCard query:', _context3.t0);
          throw _context3.t0;

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 15]]);
} // API endpoint để lấy thông tin người dùng và thẻ dựa trên ID


app.get('/api/users/:id', function _callee(req, res) {
  var id, userData, cardData;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          // const id = req.params.id;
          id = '1';
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context4.sent;

          if (userData) {
            _context4.next = 8;
            break;
          }

          res.status(404).json({
            message: 'User not found'
          });
          return _context4.abrupt("return");

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap(getCard(userData.code));

        case 10:
          cardData = _context4.sent;

          if (cardData) {
            _context4.next = 14;
            break;
          }

          res.status(404).json({
            message: 'Card not found'
          });
          return _context4.abrupt("return");

        case 14:
          res.json({
            user: userData,
            card: cardData
          });
          _context4.next = 21;
          break;

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](1);
          console.error('Error getting user and card data:', _context4.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); // Khởi động server và kết nối đến Oracle database

connectToDB().then(function () {
  app.listen(port, function () {
    console.log("Server running on port ".concat(port));
  });
});