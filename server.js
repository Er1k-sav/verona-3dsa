import express from "express"
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
    res.type("html")
});

app.get("/src/assets/style.css", (req, res) => {
    res.sendFile(__dirname + "/src/assets/style.css")
    res.type("css")
});

app.get("/musica.mp3", (req, res) => {
    res.sendFile(__dirname + "/musica.mp3");
    res.type("audio/mpeg");
});

app.get("/src/main.js", (req, res) => {
    res.sendFile(__dirname + "/src/main.js")
    res.type("application/javascript")
});

app.get("/src/script.js", (req, res) => {
    res.sendFile(__dirname + "/src/script.js")
    res.type("application/javascript")
});

app.get("/src/assets/data.js", (req, res) => {
    res.sendFile(__dirname + "/src/assets/data.js")
    res.type("application/javascript")
});

app.get("/src/assets/images/map.png", (req, res) => {
    res.sendFile(__dirname + "/src/assets/images/map.png")
    res.type("image/png")
});

app.get("/src/assets/images/logo.png", (req, res) => {
    res.sendFile(__dirname + "/src/assets/images/logo.png")
    res.type("image/png")
});

app.get("/src/assets/images/IISlogo.png", (req, res) => {
    res.sendFile(__dirname + "/src/assets/images/IISlogo.png")
    res.type("image/png")
});

for (let i = 0; i < 19; i++) {
    app.get(`/src/assets/models/${i}.glb`, (req, res) => {
        res.sendFile(__dirname + `/src/assets/models/${i}.glb`);
        res.type("model/gltf-binary")
    })
}

let nFiles = [3, 7, 10, 3, 1, 2, 1, 2, 2, 1, 2, 2, 1, 0, 2, 1, 1, 2, 4]

for (let i = 0; i < 19; i++) {
    for (let j = 0; j < nFiles[i]; j++) {
        app.get(`/src/assets/images/infos/${i}/${j}.png`, (req, res) => {
            res.sendFile(__dirname + `/src/assets/images/infos/${i}/${j}.png`)
            res.type("image/png")
        })
    }
}

app.listen(8080);

console.log("App listening on https://localhost:8080/");
