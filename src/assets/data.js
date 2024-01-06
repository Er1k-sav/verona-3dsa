export let box =   [[0.3, 0.22, 0.5], //FERMO
                    [0.3, 0.26, 0.6], //EUFEMIA
                    [0.3, 0.3, 0.6], //ANASTASIA
                    [0.3, 1.5, 0.3], //LAMBERTI
                    ////[0.4, 0.2, 0.4], //RAGIONE
                    [0.2, 1, 0.2], //GARDELLO
                    [0.2, 0.3, 0.2], //CATENA
                    [0.2, 0.5, 0.15], //ALBERTO
                    [0.5, 0.2, 0.3], //SGARZARIE
                    [0.2, 0.15, 0.5], //PIETRA
                    [0.2, 0.15, 0.5], //NAVI
                    [0.2, 0.15, 0.5], //NUOVO
                    [0.35, 0.2, 0.35], //DOMUS
                    [0.15, 0.16, 0.15], //MADONNA
                    [0.35, 0.2, 0.35], //MAZZANTI
                    [0.15, 0.16, 0.15], //ARCHE
                    [0.2, 0.2, 0.25], //CAPITANO
                    [0.2, 0.3, 0.25], //ROMEO
                    [0.2, 0.3, 0.25], //CANGRANDE
                    ////[0.3, 0.8, 0.3], //CASTELLO
                    [0.2, 0.3, 0.6]] //CASTELVECCHIO

export let pos =   [[3.3, 0, 2.94, -2.44, 0.3], //FERMO
                    [0.82, 0, 0.34, -2.51, 0.3], //EUFEMIA
                    [3.1, 0, -0.72, -2.54, 0.2], //ANASTASIA
                    [2.5, 0, 0.7, 3.74, 0.2], //LAMBERTI
                    ////[2.62, 0.1, 0.14, 0.6], //RAGIONE
                    [1.75, 0, 0.34, 0.6, .15], //GARDELLO
                    [-3.95, 0.15, -0.5, 0.3], //CATENA
                    [2.95, 0.25, -1.73, -0.8], //ALBERTO
                    [1.36, 0.1, 0.5, 0.6], //SGARZARIE
                    [3.32, 0.075, -2, -0.9], //PIETRA
                    [3.9, 0.075, 2.88, -1.6], //NAVI
                    [3.9, 0.075, 0.9, -1.5], //NUOVO
                    [1.86, 0.1, 0.7, 0.6], //DOMUS
                    [2.2, 0.08, 0.9, 0.6], //MADONNA
                    [2.3, 0.1, 0.36, 0.6], //MAZZANTI
                    [2.88, 0.08, 0.38, 0.6], //ARCHE
                    [2.76, 0.1, 0.56, 0.6], //CAPITANO
                    [3.2, 0.15, 0.4, 0.6], //ROMEO ([3.1, 0.1, 0.3, 0.6])
                    [2.76, 0.15, 0.13, 0.6], //CANGRANDE
                    ////[-1.3, 0.4, 2.38, 0.6], //CASTELLO
                    [-1.8, 0.15, 2.15, 0.15]] //CASTELVECCHIO

export let names = ["San Fermo", "Sant' Eufemia", "Sant' Anastasia", "Torre dei Lamberti", "Torre del Gardello", "Torre della Catena", "Torre di Alberto I", "Corte Sgarzarie", "Ponte Pietra", "Ponte Navi", "Ponte Nuovo", "Domus Mercatorum", "Madonna Verona", "Case Mazzanti", "Arche Scaligere", "Palazzo del Capitano", "Casa di Romeo", "Palazzo Cangrande", "Castelvecchio"]

let Elm = []

for (let i = 0; i < pos.length; i++) {
    Elm.push(document.getElementById(i.toString()))
}

export let bInfos = Elm