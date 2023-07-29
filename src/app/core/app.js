const oracledb = require('oracledb');
const express = require('express');
const cors = require('cors');
const { async } = require('rxjs');
const bodyParser = require("body-parser")
const multer = require('multer')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());



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

async function getUser(id) {
  try {
    const connection = await oracledb.getConnection();
    const userQuery = 'SELECT * FROM USERS WHERE ID = :id';
    const userResult = await connection.execute(userQuery, [id]);
    await connection.close();

    if (userResult.rows.length === 0) {
      return null;
    }

    return {
      code: userResult.rows[0][0],
      name: userResult.rows[0][1],
      email: userResult.rows[0][2],
      address: userResult.rows[0][3],
      phone: userResult.rows[0][4],
      tel: userResult.rows[0][5],
      id: userResult.rows[0][6],
    };
  } catch (err) {
    console.error('Error executing getUser query:', err);
    throw err;
  }
}

// phương thức getCard dựa trên code
async function getCard(code) {
  try {
    const connection = await oracledb.getConnection();
    const cardQuery = 'SELECT * FROM CARD WHERE CODE = :code';
    const cardResult = await connection.execute(cardQuery, [code]);
    await connection.close();

    if (cardResult.rows.length === 0) {
      return null;
    }

    return {
      id: cardResult.rows[0][0],
      code: cardResult.rows[0][1],
      position: cardResult.rows[0][2],
      forte: cardResult.rows[0][3],
      department: cardResult.rows[0][4],
      nickname: cardResult.rows[0][5],
      unit: cardResult.rows[0][6],
      title: cardResult.rows[0][7],
    };
  } catch (err) {
    console.error('Error executing getCard query:', err);
    throw err;
  }
}

// getImage dựa trên code
async function getImage(code){
  try{
    const connection = await oracledb.getConnection();
    const imgQuery = 'SELECT * FROM IMG WHERE CODE = :code';
    const imgResult = await connection.execute(imgQuery, [code]);
    await connection.close();

    if(imgResult.rows.length === 0){
      return null;
    }
    const imgRow = imgResult.rows[0];
    return {
      id: imgRow[0],
      code: imgRow[1],
      url: imgRow[2],
    };
  } catch (err){
    console.error('Error executing getImg query:', err);
    throw err;
  }
}

// API endpoint để lấy thông tin người dùng và thẻ dựa trên ID
app.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const userData = await getUser(id);

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const cardData = await getCard(userData.code);

    if (!cardData) {
      res.status(404).json({ message: 'Card not found' });
      return;
    }

    res.json({ user: userData, card: cardData });
  } catch (err) {
    console.error('Error getting user and card data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//API endpoint để lấy thông tin ảnh người dùng
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
    const connection = await oracledb.getConnection();
    const updateQuery = `UPDATE USERS SET name = :name, email = :email, address = :address, phone = :phone, tel = :tel WHERE id = :id`;

    await connection.execute(updateQuery, [name, email, address, phone, tel, id]);
    await connection.commit();
    await connection.close();

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
    const connection = await oracledb.getConnection();
    const updateQuery = `UPDATE CARD SET position = :position, forte = :forte, department = :department, nickname = :nickname, unit = :unit, title = :title WHERE code = :code`;

    await connection.execute(updateQuery, [position, forte, department, nickname, unit, title, code]);
    await connection.commit();
    await connection.close();

    res.json({ message: 'Card information updated successfully' });
  } catch (err) {
    console.error('Error updating card information', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/file', upload.single('file'), async (req, res) => {
  const file = req.file;
  console.log(file)
})

// Route để cập nhật ảnh
app.put('/api/image/update/:code', upload.single('file'), async (req, res) => {
  const code = req.params.code;
  const imagePath = req.file.path; // Lấy đường dẫn tạm thời của ảnh từ multer

  try {
    const connection = await oracledb.getConnection();

    // Câu truy vấn để cập nhật thông tin ảnh dựa trên mã (code)
    const updateQuery = `UPDATE IMG SET url = :imagePath WHERE code = :code`;

    await connection.execute(updateQuery, [imagePath, code]);
    await connection.commit();
    await connection.close();

    res.json({ message: 'Image information updated successfully' });
  } catch (err) {
    console.error('Error updating image information', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
