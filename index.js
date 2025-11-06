import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ==================== CUSTOMER CRUD ====================
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Customer');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/customers', async (req, res) => {
  try {
    const { CustomerID, Name, Phone, Email, Address } = req.body;
    await pool.query(
      'INSERT INTO Customer (CustomerID, Name, Phone, Email, Address) VALUES (?, ?, ?, ?, ?)',
      [CustomerID, Name, Phone, Email, Address]
    );
    res.json({ message: 'Customer created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/customers/:id', async (req, res) => {
  try {
    const { Name, Phone, Email, Address } = req.body;
    await pool.query(
      'UPDATE Customer SET Name=?, Phone=?, Email=?, Address=? WHERE CustomerID=?',
      [Name, Phone, Email, Address, req.params.id]
    );
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Customer WHERE CustomerID=?', [req.params.id]);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== PAYMENT CRUD ====================
app.get('/api/payments', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Payment');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments', async (req, res) => {
  try {
    const { PaymentID, OrderID, PaymentDate, PaymentMethod, Amount } = req.body;
    await pool.query(
      'INSERT INTO Payment (PaymentID, OrderID, PaymentDate, PaymentMethod, Amount) VALUES (?, ?, ?, ?, ?)',
      [PaymentID, OrderID, PaymentDate, PaymentMethod, Amount]
    );
    res.json({ message: 'Payment created successfully - Trigger will update order total!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/payments/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Payment WHERE PaymentID=?', [req.params.id]);
    res.json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== OTHER READ OPERATIONS ====================
app.get('/api/restaurants', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Restaurant');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/menu-items', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.*, r.Name as RestaurantName 
      FROM MenuItem m 
      LEFT JOIN Restaurant r ON m.RestaurantID = r.RestaurantID
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.*, c.Name as CustomerName, r.Name as RestaurantName 
      FROM Orders o
      LEFT JOIN Customer c ON o.CustomerID = c.CustomerID
      LEFT JOIN Restaurant r ON o.RestaurantID = r.RestaurantID
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT e.*, r.Name as RestaurantName 
      FROM Employee e
      LEFT JOIN Restaurant r ON e.RestaurantID = r.RestaurantID
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== STORED PROCEDURES & FUNCTIONS ====================

// Call stored procedure: Get orders by restaurant
app.get('/api/orders/restaurant/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL GetOrdersByRestaurant(?)', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Call function: Get customer total spent
app.get('/api/customers/:id/total-spent', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT GetCustomerTotalSpent(?) as TotalSpent', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Call cursor procedure
app.get('/api/orders/cursor', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL FetchOrdersCursor()');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
