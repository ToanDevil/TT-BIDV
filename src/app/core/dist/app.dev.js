"use strict";

var oracledb = require('oracledb');

var express = require('express');

var cors = require('cors');

var _require = require('rxjs'),
    async = _require.async;

var bodyParser = require("body-parser");

var multer = require('multer');

var app = express();
var port = 3000;

var path = require('path');

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
} //Function updateUser


function updateUser(id, name, email, address, phone, tel) {
  var connection, updateQuery;
  return regeneratorRuntime.async(function updateUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context4.sent;
          updateQuery = "BEGIN PTNB_Secret.UPDATE_USER(:id, :name, :email, :address, :phone, :tel); END;";
          _context4.next = 7;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, {
            id: id,
            name: name,
            email: email,
            address: address,
            phone: phone,
            tel: tel
          }));

        case 7:
          _context4.next = 9;
          return regeneratorRuntime.awrap(connection.commit());

        case 9:
          _context4.next = 11;
          return regeneratorRuntime.awrap(connection.close());

        case 11:
          console.log('User information updated successfully');
          _context4.next = 18;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating user information:', _context4.t0);
          throw _context4.t0;

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
} // phương thức getCard dựa trên code


function getCard(code) {
  var connection, cardQuery, cardResult, cardData;
  return regeneratorRuntime.async(function getCard$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context5.sent;
          cardQuery = 'BEGIN :result := PTNB_Secret.GET_CARD(:code); END;';
          _context5.next = 7;
          return regeneratorRuntime.awrap(connection.execute(cardQuery, {
            code: code,
            result: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT
            }
          }));

        case 7:
          cardResult = _context5.sent;
          _context5.next = 10;
          return regeneratorRuntime.awrap(cursorToJSON(cardResult.outBinds.result));

        case 10:
          cardData = _context5.sent;
          _context5.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          if (!(!cardData || cardData.length === 0)) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", null);

        case 15:
          return _context5.abrupt("return", {
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
          _context5.prev = 18;
          _context5.t0 = _context5["catch"](0);
          console.error('Error executing getCard query:', _context5.t0);
          throw _context5.t0;

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 18]]);
} // function updateCard


function updateCard(code, position, forte, department, nickname, unit, title) {
  var connection, updateQuery;
  return regeneratorRuntime.async(function updateCard$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context6.sent;
          updateQuery = "BEGIN PTNB_Secret.UPDATE_CARD(:code, :position, :forte, :department, :nickname, :unit, :title); END;";
          _context6.next = 7;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, {
            code: code,
            position: position,
            forte: forte,
            department: department,
            nickname: nickname,
            unit: unit,
            title: title
          }));

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(connection.commit());

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(connection.close());

        case 11:
          console.log('Card information updated successfully');
          _context6.next = 18;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](0);
          console.error('Error updating card information:', _context6.t0);
          throw _context6.t0;

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 14]]);
} // getImage dựa trên code


function getImage(code) {
  var connection, imgQuery, imgResult, imgData;
  return regeneratorRuntime.async(function getImage$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 3:
          connection = _context7.sent;
          imgQuery = 'BEGIN :result := PTNB_Secret.GET_IMG(:code); END;';
          _context7.next = 7;
          return regeneratorRuntime.awrap(connection.execute(imgQuery, {
            code: code,
            result: {
              type: oracledb.CURSOR,
              dir: oracledb.BIND_OUT
            }
          }));

        case 7:
          imgResult = _context7.sent;
          _context7.next = 10;
          return regeneratorRuntime.awrap(cursorToJSON(imgResult.outBinds.result));

        case 10:
          imgData = _context7.sent;
          _context7.next = 13;
          return regeneratorRuntime.awrap(connection.close());

        case 13:
          if (!(!imgData || imgData.length === 0)) {
            _context7.next = 15;
            break;
          }

          return _context7.abrupt("return", null);

        case 15:
          return _context7.abrupt("return", {
            id: imgData[0][0],
            code: imgData[0][1],
            url: imgData[0][2]
          });

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](0);
          console.error('Error executing getImg query:', _context7.t0);
          throw _context7.t0;

        case 22:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 18]]);
} // API endpoint để lấy thông tin người dùng và thẻ dựa trên ID


app.get('/api/user/:id', function _callee(req, res) {
  var id, userData;
  return regeneratorRuntime.async(function _callee$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context8.sent;

          if (userData) {
            _context8.next = 8;
            break;
          }

          res.status(404).json({
            message: 'User not found'
          });
          return _context8.abrupt("return");

        case 8:
          res.json({
            user: userData
          });
          _context8.next = 15;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](1);
          console.error('Error getting user and card data:', _context8.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
app.get('/api/card/:id', function _callee2(req, res) {
  var id, userData, cardData;
  return regeneratorRuntime.async(function _callee2$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context9.sent;
          _context9.next = 7;
          return regeneratorRuntime.awrap(getCard(userData.code));

        case 7:
          cardData = _context9.sent;

          if (cardData) {
            _context9.next = 11;
            break;
          }

          res.status(404).json({
            message: 'Card not found'
          });
          return _context9.abrupt("return");

        case 11:
          res.json({
            card: cardData
          });
          _context9.next = 18;
          break;

        case 14:
          _context9.prev = 14;
          _context9.t0 = _context9["catch"](1);
          console.error('Error getting user and card data:', _context9.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 14]]);
}); //API endpoint để lấy thông tin ảnh người dùng

app.get('/api/user/image/:id', function _callee3(req, res) {
  var id, userData, imageData;
  return regeneratorRuntime.async(function _callee3$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          _context10.prev = 1;
          _context10.next = 4;
          return regeneratorRuntime.awrap(getUser(id));

        case 4:
          userData = _context10.sent;

          if (userData) {
            _context10.next = 8;
            break;
          }

          res.status(404).json({
            message: 'User not found'
          });
          return _context10.abrupt("return");

        case 8:
          _context10.next = 10;
          return regeneratorRuntime.awrap(getImage(userData.code));

        case 10:
          imageData = _context10.sent;

          if (imageData) {
            _context10.next = 14;
            break;
          }

          res.status(404).json({
            message: 'image not found'
          });
          return _context10.abrupt("return");

        case 14:
          res.json({
            image: imageData
          });
          _context10.next = 21;
          break;

        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](1);
          console.error('Error getting user and card data:', _context10.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 21:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[1, 17]]);
}); // API endpoint để cập nhật thông tin người dùng dựa trên ID

app.put('/api/user/update/:id', function _callee4(req, res) {
  var id, _req$body, name, email, address, phone, tel;

  return regeneratorRuntime.async(function _callee4$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          id = req.params.id;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, address = _req$body.address, phone = _req$body.phone, tel = _req$body.tel;
          _context11.prev = 2;
          _context11.next = 5;
          return regeneratorRuntime.awrap(updateUser(id, name, email, address, phone, tel));

        case 5:
          res.json({
            message: 'User information updated successfully'
          });
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](2);
          console.error('Error updating user information', _context11.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[2, 8]]);
}); // API endpoint để cập nhật thông tin thẻ dựa trên code

app.put('/api/card/update/:code', function _callee5(req, res) {
  var code, _req$body2, position, forte, department, nickname, unit, title;

  return regeneratorRuntime.async(function _callee5$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          code = req.params.code;
          _req$body2 = req.body, position = _req$body2.position, forte = _req$body2.forte, department = _req$body2.department, nickname = _req$body2.nickname, unit = _req$body2.unit, title = _req$body2.title;
          _context12.prev = 2;
          _context12.next = 5;
          return regeneratorRuntime.awrap(updateCard(code, position, forte, department, nickname, unit, title));

        case 5:
          res.json({
            message: 'Card information updated successfully'
          });
          _context12.next = 12;
          break;

        case 8:
          _context12.prev = 8;
          _context12.t0 = _context12["catch"](2);
          console.error('Error updating card information', _context12.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 12:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[2, 8]]);
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
app.post('/uploadfile', upload.single('file'), function _callee6(req, res) {
  var file, error;
  return regeneratorRuntime.async(function _callee6$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          file = req.file;

          if (file) {
            _context13.next = 5;
            break;
          }

          error = new Error('Please upload a file');
          error.httpStatusCode = 400;
          return _context13.abrupt("return", next(error));

        case 5:
          res.send(file);
          console.log(file);

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
}); // API endpoint để cập nhật ảnh dựa trên code

app.put('/api/image/update/:code', upload.single('file'), function _callee7(req, res) {
  var code, file, imagePath, connection, updateQuery;
  return regeneratorRuntime.async(function _callee7$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          code = req.params.code;
          file = req.file;
          imagePath = req.protocol + '://' + req.get('host') + '/' + req.file.filename;
          console.log(imagePath);
          _context14.prev = 4;
          _context14.next = 7;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 7:
          connection = _context14.sent;
          // Câu truy vấn để cập nhật thông tin ảnh dựa trên mã (code)
          updateQuery = "BEGIN PTNB_Secret.UPDATE_IMG(:code, :url); END;";
          _context14.next = 11;
          return regeneratorRuntime.awrap(connection.execute(updateQuery, {
            code: code,
            url: imagePath
          }));

        case 11:
          _context14.next = 13;
          return regeneratorRuntime.awrap(connection.commit());

        case 13:
          _context14.next = 15;
          return regeneratorRuntime.awrap(connection.close());

        case 15:
          res.json({
            message: 'Image information updated successfully'
          });
          _context14.next = 22;
          break;

        case 18:
          _context14.prev = 18;
          _context14.t0 = _context14["catch"](4);
          console.error('Error updating image information', _context14.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 22:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[4, 18]]);
}); // API endpoint để thêm người dùng

app.post('/api/users', function _callee8(req, res) {
  var _req$body3, code, name, email, address, phone, tel, connection, insertQuery;

  return regeneratorRuntime.async(function _callee8$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _req$body3 = req.body, code = _req$body3.code, name = _req$body3.name, email = _req$body3.email, address = _req$body3.address, phone = _req$body3.phone, tel = _req$body3.tel;
          _context15.prev = 1;
          _context15.next = 4;
          return regeneratorRuntime.awrap(oracledb.getConnection());

        case 4:
          connection = _context15.sent;
          // Câu truy vấn để thêm người dùng vào bảng người dùng
          insertQuery = "BEGIN PTNB_SECRET.INSERT_USER(:code, :name, :email, :address, :phone, :tel); END;";
          _context15.next = 8;
          return regeneratorRuntime.awrap(connection.execute(insertQuery, {
            code: code,
            name: name,
            email: email,
            address: address,
            phone: phone,
            tel: tel
          }));

        case 8:
          _context15.next = 10;
          return regeneratorRuntime.awrap(connection.commit());

        case 10:
          _context15.next = 12;
          return regeneratorRuntime.awrap(connection.close());

        case 12:
          res.json({
            message: 'User added successfully'
          });
          _context15.next = 19;
          break;

        case 15:
          _context15.prev = 15;
          _context15.t0 = _context15["catch"](1);
          console.error('Error adding user:', _context15.t0);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 19:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[1, 15]]);
});
connectToDB().then(function () {
  app.listen(port, function () {
    console.log("Server running on port ".concat(port));
  });
});