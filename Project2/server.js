const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();

// Set backend to port 5000 to avoid conflict with frontend
const PORT = process.env.PORT || 5000; 

// Middleware
app.use(cors()); // Enable CORS so your frontend can talk to your backend
app.use(express.json());

// In-memory data array to store resources
let items = [
  { id: 1, title: 'First Task', status: 'completed' },
  { id: 2, title: 'Second Task', status: 'pending' }
];

// GET ENDPOINT: Retrieve all items
app.get('/api/items', (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// POST ENDPOINT: Create a new item
app.post('/api/items', (req, res) => {
  const { title, status } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Validation failed: A valid "title" field is required.'
    });
  }

  const newItem = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    title: title.trim(),
    status: status || 'pending'
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: 'Item successfully created',
    data: newItem
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});