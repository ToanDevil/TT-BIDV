"use strict";

var oracledb = require('oracledb');

var express = require('express');

var cors = require('cors');

var app = express();
var port = 3000;
app.use(cors());
app.use(express.json());
var dbConfig = {
  user: 'admin',
  password: 'Admin1',
  connectString: 'localhost:1521/test' // SID là 'test' và port là 1521

};

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
}

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
}

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
          id = req.params.id;
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
}); // API endpoint để cập nhật thông tin người dùng dựa trên ID

app.put('/api/user/update/:id', function _callee2(req, res) {
  var id, _req$body, name, email, address, phone, tel, connection, updateQuery;

  return regeneratorRuntime.async(function _callee2$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, address = _req$body.address, phone = _req$body.phone, tel = _req$body.tel;
          _context5.prev = 2;
          _context5.next = 5;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 5:
          connection = _context5.sent;
          updateQuery = "UPDATE USERS SET name = :name, email = :email, address = :address, phone = :phone, tel = :tel WHERE id = :id";
          _context5.next = 9;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, [name, email, address, phone, tel, id]));

        case 9:
          _context5.next = 11;
          return regeneratorRuntime.awrap(connection.commit());

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          res.json({
            message: 'User information updated successfully'
          });
          _context5.next = 20;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](2);
          console.error('Error updating user information', _context5.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[2, 16]]);
}); // API endpoint để cập nhật thông tin thẻ dựa trên code

app.put('/api/card/update/:code', function _callee3(req, res) {
  var code, _req$body2, position, forte, department, nickname, unit, title, connection, updateQuery;

  return regeneratorRuntime.async(function _callee3$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          code = req.params.code;
          _req$body2 = req.body, position = _req$body2.position, forte = _req$body2.forte, department = _req$body2.department, nickname = _req$body2.nickname, unit = _req$body2.unit, title = _req$body2.title;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 5:
          connection = _context6.sent;
          updateQuery = "UPDATE CARD SET position = :position, forte = :forte, department = :department, nickname = :nickname, unit = :unit, title = :title WHERE code = :code";
          _context6.next = 9;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, [position, forte, department, nickname, unit, title, code]));

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(connection.commit());

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          res.json({
            message: 'Card information updated successfully'
          });
          _context6.next = 20;
          break;

        case 16:
          _context6.prev = 16;
          _context6.t0 = _context6["catch"](2);
          console.error('Error updating card information', _context6.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 16]]);
});
connectToDB().then(function () {
  app.listen(port, function () {
    console.log("Server running on port ".concat(port));
  });
});