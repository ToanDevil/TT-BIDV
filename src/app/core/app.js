
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

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      // Kết nối đến Oracle database
      const connection = await oracledb.getConnection(dbConfig);
      console.log('Connected to Oracle Database')
  
      // Thực hiện truy vấn lấy dữ liệu từ bảng user
      const result = await connection.execute('SELECT * FROM users WHERE code = :id', [id]);
  
      // Đóng kết nối sau khi thực hiện truy vấn
      await connection.close();
  
      // Trả về dữ liệu người dùng dưới dạng JSON
      if (result.rows.length > 0) {
        res.json(result.rows[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error executing database query:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
// Gọi hàm queryUsers() để thực hiện truy vấn dữ liệu
// queryUsers();