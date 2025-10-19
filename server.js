const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const connectionString = 'mongodb+srv://petuser:Sairithwik73@petuser.lgajiir.mongodb.net/?retryWrites=true&w=majority&appName=petuser'; // <-- IMPORTANT: PASTE YOUR STRING HERE
mongoose.connect(connectionString)
    .then(() => console.log('MongoDB connection established successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));


const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    age: Number,
    gender: String,
    description: String,
    imageUrl: String
});
const Pet = mongoose.model('Pet', petSchema); 

app.get('/api/pets', async (req, res) => {
    const pets = await Pet.find();
    res.json(pets);
});

app.post('/api/pets', async (req, res) => {
    const newPet = new Pet(req.body);
    const savedPet = await newPet.save();
    res.status(201).json(savedPet);
});


app.delete('/api/pets/:id', async (req, res) => {
    await Pet.findByIdAndDelete(req.params.id);
    res.status(204).send();
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
