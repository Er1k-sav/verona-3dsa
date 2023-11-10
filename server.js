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

app.get("/style.css", (req, res) => {
    res.sendFile(__dirname + "/style.css");
    res.type("css");
});

app.get("/main.js", (req, res) => {
    res.sendFile(__dirname + "/main.js");
    res.type("application/javascript");
});

app.listen(8080);

console.log("App listening on https://localhost:8080/");                                                                                                                                   