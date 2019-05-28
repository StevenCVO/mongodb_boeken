const mongoose = require("mongoose");

// Destructuring om de klasse Schema en functie model
// uit het mongoose object te halen
const { Schema, model } = mongoose;
const Auteur = require("./auteur");

// Schema
const boekSchema = new Schema({
    titel: {
        type: String,
        required: true,
        maxlength: 150
    },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: Auteur
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
        //unique: true,
        validate: { // Custom validator (eigen logica schrijven)
            validator: function(waarde) {                
                return (waarde.length === 10 || waarde.length === 13);
            },
            message: "Verkeerd formaat ISBN"
        },
        // Set eigenschap neemt een functie aan die de uiteindelijke
        // waarde bepaalt die naar de databank geschreven wordt
        set: function(waarde) {
            return waarde
                .replace(/-/g, "") // Regex met optie 'g' voor globaal
                .replace(/ /g, "")
                .trim(); // Spaties vooraan en achteraan weghalen
        },
        // Match vergelijkt de string met een regex (zoek op internet)
        // match: /(?=(?:\D*\d){10})(?:(?:\D*\d){3})?$/
    },
    vertaling: {
        type: Boolean,
        default: false
    },
    taalOrigineel: {
        type: String,
        required: function() {
            return this.vertaling;
        }
    }
}, {
    timestamps: true    // Toevoegen van timestamps bij aanmaken en updaten
});

// Model

// Nieuw model maken voor Boek documenten.
// De tweede parameter is het bijhorende Schema
// De derde parameter is de collectienaam in de databank
const Boek = model("Boek", boekSchema, "boeken");

// Exporteren van model
module.exports = Boek;