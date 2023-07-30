"use strict";

var oracledb = require('oracledb');

var express = require('express');

var cors = require('cors');

var path = require('path');

var _require = require('rxjs'),
    async = _require.async;

var bodyParser = require("body-parser");

var multer = require('multer');

var app = express();
var port = 3000;
app.use(cors());
app.use(express.json()); // Đặt đường dẫn tới thư mục uploads

var uploadsPath = path.join(__dirname, 'src', 'app', 'core', 'uploads'); // Phục vụ các tệp ảnh từ thư mục uploads

app.use('/uploads', express["static"](uploadsPath));
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
} // Hàm chuyển đổi dữ liệu từ cursor thành JSON


function cursorToJSON(cursor) {
  var rows, row;
  return regeneratorRuntime.async(function cursorToJSON$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          rows = [];

        case 1:
          _context2.next = 3;
          return regeneratorRuntime.awrap(cursor.getRow());

        case 3:
          if (!(row = _context2.sent)) {
            _context2.next = 7;
            break;
          }

          rows.push(row);
          _context2.next = 1;
          break;

        case 7:
          return _context2.abrupt("return", rows);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getUser(id) {
  var connection, userQuery, userResult, userData;
  return regeneratorRuntime.async(function getUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context3.sent;
          userQuery = 'BEGIN :result := PTNB_Secret.GET_USER(:id); END;';
          _context3.next = 7;
          return regeneratorRuntime.awrap(connection.execute(userQuery, {
            id: id,
            result: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT
            }
          }));

        case 7:
          userResult = _context3.sent;
          _context3.next = 10;
          return regeneratorRuntime.awrap(cursorToJSON(userResult.outBinds.result));

        case 10:
          userData = _context3.sent;
          _context3.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          if (!(!userData || userData.length === 0)) {
            _context3.next = 15;
            break;
          }

          return _context3.abrupt("return", null);

        case 15:
          return _context3.abrupt("return", {
            code: userData[0][0],
            name: userData[0][1],
            email: userData[0][2],
            address: userData[0][3],
            phone: userData[0][4],
            tel: userData[0][5],
            id: userData[0][6]
          });

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          console.error('Error executing getUser query:', _context3.t0);
          throw _context3.t0;

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 18]]);
} // phương thức getCard dựa trên code


function getCard(code) {
  var connection, cardQuery, cardResult, cardData;
  return regeneratorRuntime.async(function getCard$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context4.sent;
          cardQuery = 'BEGIN :result := PTNB_Secret.GET_CARD(:code); END;';
          _context4.next = 7;
          return regeneratorRuntime.awrap(connection.execute(cardQuery, {
            code: code,
            result: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT
            }
          }));

        case 7:
          cardResult = _context4.sent;
          _context4.next = 10;
          return regeneratorRuntime.awrap(cursorToJSON(cardResult.outBinds.result));

        case 10:
          cardData = _context4.sent;
          _context4.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          if (!(!cardData || cardData.length === 0)) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", null);

        case 15:
          return _context4.abrupt("return", {
            id: cardData[0][0],
            code: cardData[0][1],
            position: cardData[0][2],
            forte: cardData[0][3],
            department: cardData[0][4],
            nickname: cardData[0][5],
            unit: cardData[0][6],
            title: cardData[0][7]
          });

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](0);
          console.error('Error executing getCard query:', _context4.t0);
          throw _context4.t0;

        case 22:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 18]]);
} // getImage dựa trên code


function getImage(code) {
  var connection, imgQuery, imgResult, imgRow;
  return regeneratorRuntime.async(function getImage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context5.sent;
          imgQuery = 'SELECT * FROM IMG WHERE CODE = :code';
          _context5.next = 7;
          return regeneratorRuntime.awrap(connection.execute(imgQuery, [code]));

        case 7:
          imgResult = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(connection.close());

        case 10:
          if (!(imgResult.rows.length === 0)) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", null);

        case 12:
          imgRow = imgResult.rows[0];
          return _context5.abrupt("return", {
            id: imgRow[0],
            code: imgRow[1],
            url: imgRow[2]
          });

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](0);
          console.error('Error executing getImg query:', _context5.t0);
          throw _context5.t0;

        case 20:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 16]]);
} // API endpoint để lấy thông tin người dùng và thẻ dựa trên ID


app.get('/api/users/:id', function _callee(req, res) {
  var id, userData, cardData;
  return regeneratorRuntime.async(function _callee$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context6.sent;

          if (userData) {
            _context6.next = 8;
            break;
          }

          res.status(404).json({
            message: 'User not found'
          });
          return _context6.abrupt("return");

        case 8:
          _context6.next = 10;
          return regeneratorRuntime.awrap(getCard(userData.code));

        case 10:
          cardData = _context6.sent;

          if (cardData) {
            _context6.next = 14;
            break;
          }

          res.status(404).json({
            message: 'Card not found'
          });
          return _context6.abrupt("return");

        case 14:
          res.json({
            user: userData,
            card: cardData
          });
          _context6.next = 21;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](1);
          console.error('Error getting user and card data:', _context6.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); //API endpoint để lấy thông tin ảnh người dùng

app.get('/api/user/image/:id', function _callee2(req, res) {
  var id, userData, imageData;
  return regeneratorRuntime.async(function _callee2$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context7.sent;

          if (userData) {
            _context7.next = 8;
            break;
          }

          res.status(404).json({
            message: 'User not found'
          });
          return _context7.abrupt("return");

        case 8:
          _context7.next = 10;
          return regeneratorRuntime.awrap(getImage(userData.code));

        case 10:
          imageData = _context7.sent;

          if (imageData) {
            _context7.next = 14;
            break;
          }

          res.status(404).json({
            message: 'image not found'
          });
          return _context7.abrupt("return");

        case 14:
          res.json({
            image: imageData
          });
          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](1);
          console.error('Error getting user and card data:', _context7.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); // API endpoint để cập nhật thông tin người dùng dựa trên ID

app.put('/api/user/update/:id', function _callee3(req, res) {
  var id, _req$body, name, email, address, phone, tel, connection, updateQuery;

  return regeneratorRuntime.async(function _callee3$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, address = _req$body.address, phone = _req$body.phone, tel = _req$body.tel;
          _context8.prev = 2;
          _context8.next = 5;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 5:
          connection = _context8.sent;
          updateQuery = "UPDATE USERS SET name = :name, email = :email, address = :address, phone = :phone, tel = :tel WHERE id = :id";
          _context8.next = 9;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, [name, email, address, phone, tel, id]));

        case 9:
          _context8.next = 11;
          return regeneratorRuntime.awrap(connection.commit());

        case 11:
          _context8.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          res.json({
            message: 'User information updated successfully'
          });
          _context8.next = 20;
          break;

        case 16:
          _context8.prev = 16;
          _context8.t0 = _context8["catch"](2);
          console.error('Error updating user information', _context8.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[2, 16]]);
}); // API endpoint để cập nhật thông tin thẻ dựa trên code

app.put('/api/card/update/:code', function _callee4(req, res) {
  var code, _req$body2, position, forte, department, nickname, unit, title, connection, updateQuery;

  return regeneratorRuntime.async(function _callee4$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          code = req.params.code;
          _req$body2 = req.body, position = _req$body2.position, forte = _req$body2.forte, department = _req$body2.department, nickname = _req$body2.nickname, unit = _req$body2.unit, title = _req$body2.title;
          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 5:
          connection = _context9.sent;
          updateQuery = "UPDATE CARD SET position = :position, forte = :forte, department = :department, nickname = :nickname, unit = :unit, title = :title WHERE code = :code";
          _context9.next = 9;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, [position, forte, department, nickname, unit, title, code]));

        case 9:
          _context9.next = 11;
          return regeneratorRuntime.awrap(connection.commit());

        case 11:
          _context9.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          res.json({
            message: 'Card information updated successfully'
          });
          _context9.next = 20;
          break;

        case 16:
          _context9.prev = 16;
          _context9.t0 = _context9["catch"](2);
          console.error('Error updating card information', _context9.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 16]]);
});
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
var upload = multer({
  storage: storage
});
app.post('/file', upload.single('file'), function _callee5(req, res) {
  var file;
  return regeneratorRuntime.async(function _callee5$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          file = req.file;
          console.log(file);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  });
}); // Route để cập nhật ảnh

app.put('/api/image/update/:code', upload.single('file'), function _callee6(req, res) {
  var code, imagePath, connection, updateQuery;
  return regeneratorRuntime.async(function _callee6$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          code = req.params.code;
          imagePath = '/uploads/' + req.file.filename; // Lấy đường dẫn tạm thời của ảnh từ multer

          console.log(imagePath);
          _context11.prev = 3;
          _context11.next = 6;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 6:
          connection = _context11.sent;
          // Câu truy vấn để cập nhật thông tin ảnh dựa trên mã (code)
          updateQuery = "UPDATE IMG SET url = :imagePath WHERE code = :code";
          _context11.next = 10;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, [imagePath, code]));

        case 10:
          _context11.next = 12;
          return regeneratorRuntime.awrap(connection.commit());

        case 12:
          _context11.next = 14;
          return regeneratorRuntime.awrap(connection.close());

        case 14:
          res.json({
            message: 'Image information updated successfully'
          });
          _context11.next = 21;
          break;

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](3);
          console.error('Error updating image information', _context11.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[3, 17]]);
});
connectToDB().then(function () {
  app.listen(port, function () {
    console.log("Server running on port ".concat(port));
  });
});