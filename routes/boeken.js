const express = require("express");

// Models importeren
const Boek = require("../models/boek");

const router = express.Router();

// async toevoegen aan functie om await te kunnen gebruiken
router.get("/", async (req, res) => {
    // Data uit databank halen
    const boeken = await Boek.find();

    return res.send(boeken);
});

// Nieuw boek toevoegen
router.post("/", async (req, res) => {
    const data = req.body;

    try {
        // Maak een nieuw boek op basis van het model (enkel in het geheugen!)
        const nieuwBoek = new Boek(data);
    
        // Sla het nieuw boek op in de databank en geef het nieuwe boek
        // inclusief id ook terug
        const toegevoegdBoek = await Boek.create(nieuwBoek);
    
        return res.send(toegevoegdBoek);
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    const _id = req.params.id;

    try {
        // Om één document te verwijderen: deleteOne
        // Om meerdere documenten te verwijderen: deleteMany
        const resultaat = await Boek.deleteOne({
            _id     // Zelfde als _id: _id
        });
    
        if (!resultaat.deletedCount) {
            return res.send(`Boek met id ${_id} werd niet gevonden!`);
        }
    
        return res.send(`Boek met id ${_id} succesvol verwijderd!`);
    } catch (err) {
        return res.status(400).send(err);
    }
});

module.exports = router;