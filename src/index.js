const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const port = 3000;

const Film = mongoose.model('Film', {
     title: String, 
     description: String, 
     image_url: String,
     trailer_url: String,
    });

app.get("/", async (req, res) => {
  const film = await Film.find();
  return res.send(film);
});

app.post("/", async (req, res) => {
    const film = new Film({ 
        title: req.body.title, 
        description: req.body.director, 
        image_url: req.body.image_url, 
        trailer_url: req.body.trailer_url, 
    });

    await film.save();
    return res.send(film);
});

app.put("/:id", async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id);
    film.title = req.body.title;
    film.description = req.body.description;
    film.image_url = req.body.image_url;
    film.trailer_url = req.body.trailer_url;
    await film.save();
    return res.send(film);
});

app.delete("/:id", async (req, res) => {
    const film = await Film.findByIdAndDelete(req.params.id);
    return res.send(film);
});

app.listen(port, () => {
    mongoose.connect("mongodb+srv://hunaldoneto23:Ffl6RnjMnu3Foqda@starwars-api.k2kxcj8.mongodb.net/?retryWrites=true&w=majority&appName=starwars-api");
    console.log(`App Running at port:${port}`);
});