export let pos =   [[3.3, 2.94, -2.44, 0.3], //FERMO
                    [0.82, 0.34, -2.51, 0.3], //EUFEMIA
                    [3.1, -0.72, -2.54, 0.2], //ANASTASIA
                    [2.5, 0.7, 3.74, 0.18], //LAMBERTI
                    [1.75, 0.34, 0.6, .15], //GARDELLO
                    [-3.95, -0.5, -1.27, .1], //CATENA
                    [2.98, -1.73, -0.9, .13], //ALBERTO
                    [1.36, 0.5, 2.17, .22], //SGARZARIE
                    [3.32, -2, -4.04, .02], //PIETRA
                    [3.9, 2.88, -1.6, .02], //NAVI
                    [3.9, 0.9, -1.5, .02], //NUOVO
                    [2.1, 0.94, 0.6, .03], //DOMUS
                    [2.05, 0.56, 0.6, .1], //MADONNA
                    [2.3, 0.36, 3.74, .2], //MAZZANTI
                    [2.88, 0.38, 0.6, .07], //ARCHE
                    [2.72, 0.5, 0.6, .09], //CAPITANIO
                    [3.12, 0.31, 2.17, .06], //ROMEO
                    [2.74, 0.24, 3.74, .06], //CANGRANDE
                    [-1.8, 2.15, 0.15, .025]] //CASTELVECCHIO

export let names = ["San Fermo", "Sant' Eufemia", "Santa Anastasia", "Torre dei Lamberti", "Torre del Gardello", "Torre della Catena", "Torre di Alberto I", "Corte Sgarzarie", "Ponte Pietra", "Ponte Navi", "Ponte Nuovo", "Domus Mercatorum", "Madonna Verona", "Case Mazzanti", "Arche Scaligere", "Palazzo del Capitanio", "Casa di Romeo", "Palazzo Cangrande", "Castelvecchio"]

export let mapIDs = ["Chiesa di San Fermo Maggiore", "Chiesa di Sant'Eufemia  Verona", "Basilica di Santa Anastasia Piazza S.Anastasia", "Torre dei Lamberti", "Torre del Gardello", "Torre della Catena", "Torre di Ponte Pietra", "Area archeologica di Corte Sgarzerie", "Ponte Pietra Bridge", "Ponte Navi Bridge", "Ponte Nuovo Ponte Nuovo Bridge", "Domus Mercatorum", "Fontana Madonna Verona ", "Case dei Mazzanti Historical", "Arche Scaligere", "Palazzo di Cansignorio", "Casa di Romeo Via Arche Scaligere 3A", "Palazzo del Podestà Verona", "Ponte di Castelvecchio"]

export let iOpnH = ["Lun-Ven => 10-17 </br> Sab-Dom => 10-17:30", "Lun-Dom => 9:30-11:30 16-19:30", "Lun-Ven => 10-17 </br> Sab => 9:30-18 </br> Dom => 13-17:30", "Lun-Ven => 10-18 </br> Mer => Chiuso </br> Sab-Dom => 11-19", "Non Visitabile", "Non Visitabile", "24h/24", "Sab => 10-12 </br> Dom => 10-12:30", "24h/24", "24h/24", "24h/24", "/", "24h/24", "/", "/", "/", "24h/24", "/", "24h/24"]

export let iAdr = ["Via Dogana, 2, 37121 Verona VR", "Piazzetta Sant'Eufemia, 1, 37121 Verona VR", "Piazza S.Anastasia, 37121 Verona VR", "Via della Costa, 1, 37121 Verona VR", "Via della Costa, 1, 37121 Verona VR", "37126 Verona VR", "Via Ponte Pietra, 34, 37121 Verona VR", "Corte Sgarzarie, 8, 37121 Verona VR", "37121 Verona VR", "Ponte delle Navi, 37121 Verona VR", "Ponte Nuovo, 37121 Verona VR", "Piazza Erbe, 17, 37121 Verona VR", "Piazza Erbe, 37121 Verona VR", "Piazza Erbe, 32/A, 37121 Verona VR", "Via S. Maria Antica, 4, 37121 Verona VR", "P.za dei Signori, 22, 37121 Verona VR", "Via Arche Scaligere, 3a, 37121 Verona VR", "P.za dei Signori, 37121 Verona VR", "Corso Castelvecchio, 2, 37121 Verona VR"]

//export let coords = [[45.43918322839255, 11.00004607670956], [45.443111683828526, 10.993443765291731], [45.44512693814932, 10.99962559013084], [45.4429680283074, 10.99776121422446], [45.44356965384231, 10.996515263027883], [45.445075437145626, 10.98208518708498], [45.44748483415449, 10.999571050005212], [45.443509073954345, 10.99582437090889], [45.447799553121236, 11.000030089016231], [45.43923086307812, 11.001439916441365], [45.442650012466906, 11.001331776552052], [45.442786249876434, 10.997124576357265], [45.44323038655243, 10.997086049046727], [45.44353295604631, 10.997189340502977], [45.44359241142518, 10.998833482636472], [45.44336437888571, 10.99851552515274], [45.443555117685165, 10.999284797431109], [45.44367180528564, 10.9985294300728], [45.440411919025564, 10.987280900845837]]

let Elm = []

for (let i = 0; i < pos.length; i++) {
    Elm.push(document.getElementById(i.toString()))
}

export let bInfos = Elm