import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    res.type("html");
});

app.get("/src/assets/style.css", (req, res) => {
    res.sendFile(__dirname + "/src/assets/style.css");
    res.type("css");
});

app.get("/src/main.js", (req, res) => {
    res.sendFile(__dirname + "/src/main.js");
    res.type("application/javascript");
});

app.get("/src/script.js", (req, res) => {
    res.sendFile(__dirname + "/src/script.js");
    res.type("application/javascript");
});

app.get("/m3.png", (req, res) => {
    res.sendFile(__dirname + "/m3.png");
    res.type("image/png");
});

app.listen(8080);

console.log("App listening on https://localhost:8080/");                                                                                                                                   
