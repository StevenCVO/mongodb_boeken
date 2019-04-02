const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Routers importeren
const boeken = require("./routes/boeken");
const auteurs = require("./routes/auteurs");

// Connectie maken met MongoDB databank
mongoose.connect("mongodb://127.0.0.1:27017/boekendb", {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => {
        console.log("Verbonden met Mongodb.");        
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);        
    });

const app = express();

const port = process.env.PORT || 7000;

// Middleware registreren
app.use(cors());
app.use(express.json());

// Router registreren
app.use("/boeken", boeken);
app.use("/auteurs", auteurs);

app.get("/", (req, res) => {
    res.send("Gebruik de API routes.");
});

app.listen(port, () => {
    console.log(`Server luistert op poort ${port}`);    
});