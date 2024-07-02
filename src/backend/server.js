// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ideasDB');

const ideaSchema = new mongoose.Schema({
  name: String,
  registration: String,
  title: String,
  description: String,
  classification: [String],
  status: { type: String, default: 'Aguardando avaliação' },
  evaluationNote: { type: String, default: 'Aguardando avaliação' }
});

const Idea = mongoose.model('Idea', ideaSchema);

app.get('/ideas', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json(ideas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/ideas', async (req, res) => {
  const idea = new Idea({
    name: req.body.name,
    registration: req.body.registration,
    title: req.body.title,
    description: req.body.description,
    classification: req.body.classification
  });

  try {
    const newIdea = await idea.save();
    res.status(201).json(newIdea);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
