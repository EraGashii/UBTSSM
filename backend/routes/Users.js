import express from 'express';

const router = express.Router();

// Simulated in-memory database for users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Route to get users
router.get('/', (req, res) => {
  res.json(users);
});

// Route to create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Route to delete a user by ID
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  users = users.filter(user => user.id !== userId);

  res.status(200).json({ message: 'User deleted successfully' });
});

export default router;
