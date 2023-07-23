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

const oracledb = require('oracledb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Cấu hình kết nối đến Oracle database
const dbConfig = {
  user: 'admin',
  password: 'Admin1',
  connectString: 'localhost:1521/test', // SID là 'test' và port là 1521
};

// Kết nối đến Oracle database
async function connectToDB() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('Connected to Oracle Database');
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  }
}

// Thực hiện truy vấn lấy thông tin người dùng từ bảng USERS theo ID
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

// Thực hiện truy vấn lấy thông tin thẻ từ bảng CARD theo CODE
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

// API endpoint để lấy thông tin người dùng và thẻ dựa trên ID
app.get('/api/users/:id', async (req, res) => {
  // const id = req.params.id;
  const id = '1';

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

// Khởi động server và kết nối đến Oracle database
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
