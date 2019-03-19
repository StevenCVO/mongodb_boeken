const mongoose = require("mongoose");

// Destructuring om de klasse Schema en functie model
// uit het mongoose object te halen
const { Schema, model } = mongoose;

// Schema
const boekSchema = new Schema({
    titel: String,
    auteur: String,
    aantalPaginas: Number,
    genres: [String]
});

// Model

// Nieuw model maken voor Boek documenten.
// De tweede parameter is het bijhorende Schema
// De derde parameter is de collectienaam in de databank
const Boek = model("Boek", boekSchema, "boeken");

// Exporteren van model
module.exports = Boek;