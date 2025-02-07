export let pos =   [[3.3, 2.94, -2.44, 0.3], //FERMO
                    [0.82, 0.34, -2.51, 0.3], //EUFEMIA
                    [3.1, -0.72, -2.54, 0.2], //ANASTASIA
                    [2.5, 0.7, 3.74, 0.18], //LAMBERTI
                    [1.75, 0.34, 0.6, 0.15], //GARDELLO
                    [-3.95, -0.5, -1.27, 0.1], //CATENA
                    [2.98, -1.73, -0.9, 0.13], //ALBERTO
                    [1.36, 0.5, 2.17, 0.22], //SGARZARIE
                    [3.32, -2, -4.04, 0.02], //PIETRA
                    [3.9, 2.88, -1.6, 0.02], //NAVI
                    [3.9, 0.9, -1.5, 0.02], //NUOVO
                    [2.1, 0.94, 0.6, 0.03], //DOMUS
                    [2.05, 0.56, 0.6, 0.1], //MADONNA
                    [2.3, 0.36, 3.74, 0.2], //MAZZANTI
                    [2.88, 0.38, 0.6, 0.07], //ARCHE
                    [2.72, 0.5, 0.6, 0.09], //CAPITANIO
                    [3.12, 0.31, 2.17, 0.06], //ROMEO
                    [2.74, 0.24, 3.74, 0.06], //CANGRANDE
                    [-1.8, 2.15, 0.15, 0.025], //CASTELVECCHIO
                    [/*-3.8, -3*/4.5, 0.3, 1.57, 0.4], //FIUME
                    [0, 3.7, -0.4, 0.1]] //MURA

export let names = ["San Fermo", "Sant' Eufemia", "Santa Anastasia", "Torre dei Lamberti", "Torre del Gardello", "Torre della Catena", "Torre di Alberto I", "Corte Sgarzarie", "Ponte Pietra", "Ponte Navi", "Ponte Nuovo", "Domus Mercatorum", "Madonna Verona", "Case Mazzanti", "Arche Scaligere", "Palazzo del Capitanio", "Casa di Romeo", "Palazzo Cangrande", "Castelvecchio", "Fiume & Isolo", "Mura Scaligere"]

export let mapIDs = ["Chiesa di San Fermo Maggiore", "Chiesa di Sant'Eufemia  Verona", "Basilica di Santa Anastasia Piazza S.Anastasia", "Torre dei Lamberti", "Torre del Gardello", "Torre della Catena", "Torre di Ponte Pietra", "Area archeologica di Corte Sgarzerie", "Ponte Pietra Bridge", "Ponte Navi Bridge", "Ponte Nuovo Ponte Nuovo Bridge", "Domus Mercatorum", "Fontana Madonna Verona ", "Case dei Mazzanti Historical", "Arche Scaligere", "Palazzo di Cansignorio", "Casa di Romeo Via Arche Scaligere 3A", "Palazzo del Podestà Verona", "Ponte di Castelvecchio", "Piazza Isolo Verona", "Verona"]

export let iOpnH = ["Lun-Ven => 10-17 </br> Sab-Dom => 10-17:30", "Lun-Dom => 9:30-11:30 16-19:30", "Lun-Ven => 10-17 </br> Sab => 9:30-18 </br> Dom => 13-17:30", "Lun-Ven => 10-18 </br> Mer => Chiuso </br> Sab-Dom => 11-19", "Non Visitabile", "Non Visitabile", "24h/24", "Sab => 10-12 </br> Dom => 10-12:30", "24h/24", "24h/24", "24h/24", "24h/24", "24h/24", "Non Visitabile", "Mar-Dom => 10-13 15-18", "Non Visitabile", "24h/24", "Non Visitabile", "24h/24", "24h/24", "24h/24"]

export let iAdr = ["Via Dogana, 2, 37121 Verona VR", "Piazzetta Sant'Eufemia, 1, 37121 Verona VR", "Piazza S.Anastasia, 37121 Verona VR", "Via della Costa, 1, 37121 Verona VR", "Via della Costa, 1, 37121 Verona VR", "37126 Verona VR", "Via Ponte Pietra, 34, 37121 Verona VR", "Corte Sgarzarie, 8, 37121 Verona VR", "37121 Verona VR", "Ponte delle Navi, 37121 Verona VR", "Ponte Nuovo, 37121 Verona VR", "Piazza Erbe, 17, 37121 Verona VR", "Piazza Erbe, 37121 Verona VR", "Piazza Erbe, 32/A, 37121 Verona VR", "Via S. Maria Antica, 4, 37121 Verona VR", "P.za dei Signori, 22, 37121 Verona VR", "Via Arche Scaligere, 3a, 37121 Verona VR", "P.za dei Signori, 37121 Verona VR", "Corso Castelvecchio, 2, 37121 Verona VR", "37129 Verona VR", "37121 Verona VR"]

export let pStr = [[18, 0, 14, 3, 4, 2]/*, [0, 14, 16, 17], [5, 8, 9, 10, 18, 20], [3, 4, 6], [8, 9, 10, 18, 19], [0, 1, 2]*/]

export let pName = ["🇨🇱 Cile 🇨🇱"/*, "Dante", "Cavalieri", "Torri", "Ponti", "Cattedrali"*/]

let Elm = []
for (let i = 0; i < pos.length; i++) {
    Elm.push(document.getElementById(i.toString()))
}
export let bInfos = Elm
