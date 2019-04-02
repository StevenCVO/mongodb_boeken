const express = require("express");

// Models importeren
const Auteur = require("../models/auteur");

const router = express.Router();

router.get("/", async (req, res) => {
    const auteurs = await Auteur.find();
    return res.send(auteurs);
});

router.post("/", async (req, res) => {
    const data = req.body;

    try {
        const nieuwAuteur = new Auteur(data);
        const toegevoegdAuteur = await Auteur.create(nieuwAuteur);
    
        return res.send(toegevoegdAuteur);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;