const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET = 'mysecret'; // Você deve usar um segredo mais forte e armazená-lo de forma segura.

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ideasDB');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String // 'admin' or 'entrepreneur'
});

const ideaSchema = new mongoose.Schema({
  name: String,
  registration: String,
  title: String,
  description: String,
  classification: [String],
  status: { type: String, default: 'Aguardando avaliação' },
  evaluationNote: { type: String, default: 'Aguardando avaliação' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Idea = mongoose.model('Idea', ideaSchema);

// Middleware para verificar o token JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Rota para registrar um novo usuário
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});

// Rota para obter ideias
app.get('/ideas', authenticateJWT, async (req, res) => {
  const { user } = req;
  try {
    let ideas;
    if (user.role === 'admin') {
      ideas = await Idea.find().populate('userId', 'username');
    } else {
      ideas = await Idea.find({ userId: user.userId }).populate('userId', 'username');
    }
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para adicionar uma nova ideia
app.post('/ideas', authenticateJWT, async (req, res) => {
  const { user } = req;
  const idea = new Idea({ ...req.body, userId: user.userId });

  try {
    const newIdea = await idea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar uma ideia (apenas para administradores)
app.patch('/ideas/:id', authenticateJWT, async (req, res) => {
  const { user } = req;
  if (user.role !== 'admin') {
    return res.sendStatus(403);
  }

  try {
    const updatedIdea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
