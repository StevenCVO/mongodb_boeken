const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const adresSchema = new Schema({
    straat: {
        type: String,
        required: true
    },
    huisnummer: {
        type: Number,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    woonplaats: {
        type: String,
        required: true
    },
    land: {
        type: String,
        required: true,
        default: "België"
    }
});

// Schema
const auteurSchema = new Schema({
    naam: {
        type: String,
        required: true
    },
    adres: {
        type: adresSchema
    }
}, {
    timestamps: true
});

// Model
const Auteur = model("Auteur", auteurSchema, "auteurs");

module.exports = Auteur;