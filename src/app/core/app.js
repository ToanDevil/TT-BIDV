const oracledb = require('oracledb');
const express = require('express');
const cors = require('cors');
const { async } = require('rxjs');
const bodyParser = require("body-parser")
const multer = require('multer')
const app = express();
const port = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());


// Đặt đường dẫn tới thư mục uploads
const uploadsPath = path.join(__dirname, 'uploads');
console.log('uploadsPath', uploadsPath);
// Phục vụ các tệp ảnh từ thư mục uploads
app.use('/avatar', express.static(uploadsPath));


const dbConfig = {
  user: 'admin',
  password: 'Admin1',
  connectString: 'localhost:1521/test', // SID là 'test' và port là 1521
};

async function connectToDB() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  }
}

// Hàm chuyển đổi dữ liệu từ cursor thành JSON
async function cursorToJSON(cursor) {
  const rows = [];
  let row;

  while ((row = await cursor.getRow())) {
    rows.push(row);
  }

  return rows;
}

async function getUser(id) {
  try {
    const connection = await oracledb.getConnection();
    const userQuery = 'BEGIN :result := PTNB_Secret.GET_USER(:id); END;';
    const userResult = await connection.execute(userQuery, { id: id, result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } });
    // Chuyển đổi dữ liệu từ cursor thành JSON
    const userData = await cursorToJSON(userResult.outBinds.result);
    await connection.close();

    if (!userData || userData.length === 0) {
      return null;
    }

    return {
      code: userData[0][0],
      name: userData[0][1],
      email: userData[0][2],
      address: userData[0][3],
      phone: userData[0][4],
      tel: userData[0][5],
      id: userData[0][6],
    };
  } catch (err) {
    console.error('Error executing getUser query:', err);
    throw err;
  }
}

//Function updateUser
async function updateUser(id, name, email, address, phone, tel) {
  try {
    const connection = await oracledb.getConnection();
    const updateQuery = `BEGIN PTNB_Secret.UPDATE_USER(:id, :name, :email, :address, :phone, :tel); END;`;

    await connection.execute(updateQuery, {
      id: id,
      name: name,
      email: email,
      address: address,
      phone: phone,
      tel: tel,
    });

    await connection.commit();
    await connection.close();

    console.log('User information updated successfully');
  } catch (err) {
    console.error('Error updating user information:', err);
    throw err;
  }
}


// phương thức getCard dựa trên code
async function getCard(code) {
  try {
    const connection = await oracledb.getConnection();
    const cardQuery = 'BEGIN :result := PTNB_Secret.GET_CARD(:code); END;';
    const cardResult = await connection.execute(cardQuery, { code: code, result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } });
    // Chuyển đổi dữ liệu từ cursor thành JSON
    const cardData = await cursorToJSON(cardResult.outBinds.result);
    await connection.close();

    if (!cardData || cardData.length === 0) {
      return null;
    }

    return {
      id: cardData[0][0],
      code: cardData[0][1],
      position: cardData[0][2],
      forte: cardData[0][3],
      department: cardData[0][4],
      nickname: cardData[0][5],
      unit: cardData[0][6],
      title: cardData[0][7],
    };
  } catch (err) {
    console.error('Error executing getCard query:', err);
    throw err;
  }
}

// function updateCard
async function updateCard(code, position, forte, department, nickname, unit, title) {
  try {
    const connection = await oracledb.getConnection();
    const updateQuery = `BEGIN PTNB_Secret.UPDATE_CARD(:code, :position, :forte, :department, :nickname, :unit, :title); END;`;

    await connection.execute(updateQuery, {
      code: code,
      position: position,
      forte: forte,
      department: department,
      nickname: nickname,
      unit: unit,
      title: title,
    });

    await connection.commit();
    await connection.close();

    console.log('Card information updated successfully');
  } catch (err) {
    console.error('Error updating card information:', err);
    throw err;
  }
}

// getImage dựa trên code
async function getImage(code){
  try{
    const connection = await oracledb.getConnection();
    const imgQuery = 'BEGIN :result := PTNB_Secret.GET_IMG(:code); END;';
    const imgResult = await connection.execute(imgQuery, { code: code, result: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT } });
    // Chuyển đổi dữ liệu từ cursor thành JSON
    const imgData = await cursorToJSON(imgResult.outBinds.result);
    await connection.close();

    if(!imgData || imgData.length === 0){
      return null;
    }
    return {
      id: imgData[0][0],
      code: imgData[0][1],
      url: imgData[0][2],
    };
  } catch (err){
    console.error('Error executing getImg query:', err);
    throw err;
  }
}

// API endpoint để lấy thông tin người dùng, thẻ dựa trên ID
app.get('/api/user/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await getUser(id);

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user: userData });
  } catch (err) {
    console.error('Error getting user and card data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint lấy list user 
class User {
  constructor(code, name, email, address, phone, tel) {
    this.code = code;
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.tel = tel;
  }
}

app.get('/api/users', async (req, res) => {
  try {
    const connection = await oracledb.getConnection();
    const bindVars = {
      cur: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    };

    const result = await connection.execute('BEGIN :cur := PTNB_Secret.GET_LIST_USER; END;', bindVars);
    const resultSet = result.outBinds.cur;
    let users = [];

    // Fetch the result set rows and convert them to an array of user objects
    let row;
    while ((row = await resultSet.getRow())) {
      const [code, name, email, address, phone, tel] = row;
      const user = new User(code, name, email, address, phone, tel);
      users.push(user);
    }

    await resultSet.close();
    await connection.close();

    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint để xóa người dùng

app.delete('/api/user/:code', async (req, res) => {
  try {
    const code = req.params.code;
    const connection = await oracledb.getConnection();
    
    await connection.execute('BEGIN PTNB_Secret.DELETE_USER(:p_code); END;', { p_code: code });

    await connection.commit();
    await connection.close();
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




app.get('/api/card/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const userData = await getUser(id);
    const cardData = await getCard(userData.code);

    if (!cardData) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }

    res.json({ card: cardData });
  } catch (err) {
    console.error('Error getting user and card data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//API endpoint để lấy thông tin ảnh người 
app.get('/api/user/image/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await getUser(id);

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const imageData = await getImage(userData.code);
     
    if(!imageData) {
      res.status(404).json({message: 'image not found'});
      return;
    }

    res.json({ image: imageData });
  } catch (err) {
    console.error('Error getting user and card data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})


// API endpoint để cập nhật thông tin người dùng dựa trên ID
app.put('/api/user/update/:id', async (req, res) => {
  const id = req.params.id;
  const { name, email, address, phone, tel } = req.body;

  try {
    await updateUser(id, name, email, address, phone, tel);
    res.json({ message: 'User information updated successfully' });
  } catch (err) {
    console.error('Error updating user information', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// API endpoint để cập nhật thông tin thẻ dựa trên code
app.put('/api/card/update/:code', async (req, res) => {
  const code = req.params.code;
  const { position, forte, department, nickname, unit, title } = req.body;

  try {
    await updateCard(code, position, forte, department, nickname, unit, title);
    res.json({ message: 'Card information updated successfully' });
  } catch (err) {
    console.error('Error updating card information', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/app/core/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });


// api endpoint upload và update ảnh.
app.post('/upload', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log('----------------', req, file);
  if (!file) {
    res.status(400).json({ message: 'Please upload a file' });
    return;
  }

  const imagePath = 'avatar/' + file.filename;

  try {
    const connection = await oracledb.getConnection(dbConfig);

    // Câu truy vấn để cập nhật thông tin ảnh dựa trên mã (code)
    const updateQuery = `BEGIN PTNB_Secret.UPDATE_IMG(:code, :url); END;`;

    await connection.execute(updateQuery, {
      url: imagePath,
      code: req.body.code, 
    });

    await connection.commit();
    await connection.close();

    res.json({ message: 'Image uploaded successfully' });
  } catch (err) {
    console.error('Error updating image information', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// API endpoint để thêm người dùng
app.post('/api/users', async (req, res) => {
  const { code, name, email, address, phone, tel } = req.body;

  try {
    const connection = await oracledb.getConnection();

    // Câu truy vấn để thêm người dùng vào bảng người dùng
    const insertQuery = `BEGIN PTNB_SECRET.INSERT_USER(:code, :name, :email, :address, :phone, :tel); END;`;
    
    await connection.execute(insertQuery, {
      code: code,
      name: name,
      email: email,
      address: address,
      phone: phone,
      tel: tel
    });

    await connection.commit();
    await connection.close();

    res.json({ message: 'User added successfully' });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
