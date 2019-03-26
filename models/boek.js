const mongoose = require("mongoose");

// Destructuring om de klasse Schema en functie model
// uit het mongoose object te halen
const { Schema, model } = mongoose;

// Schema
const boekSchema = new Schema({
    titel: {
        type: String,
        required: true,
        maxlength: 150
    },
    aantalPaginas: {
        type: Number,
        default: 1,
        min: 1
    },
    genres: {
        // Array van subdocumenten
        // Elk subdocument voldoet aan een nieuw Schema
        type: [{
            type: String,
            lowercase: true,
            enum: ["detective", "romantisch", "horror", "fantasy"],
        }]
    },
    publicatieDatum: {
        type: Date
    },
    isbn: {
        type: String,
        unique: true,
        validate: { // Custom validator (eigen logica schrijven)
            validator: function(waarde) {
                return (waarde.length === 10 || waarde.length === 13);
            },
            message: "Verkeerd formaat ISBN"
        }
    }

});

// Model

// Nieuw model maken voor Boek documenten.
// De tweede parameter is het bijhorende Schema
// De derde parameter is de collectienaam in de databank
const Boek = model("Boek", boekSchema, "boeken");

// Exporteren van model
module.exports = Boek;