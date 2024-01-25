console.log("script.js")

import { names, bInfos, mapIDs, iAdr, iOpnH, pStr, pName } from "../src/assets/data.js"
import { pings, clearPings } from "../src/main.js"

const menuButton = document.getElementById("mSvg")
const svgArrow1 = document.getElementById('svgArrow1')
const svgArrow2 = document.getElementById('svgArrow2')
const svgLine = document.getElementById('svgLine')
const bInput = document.getElementById("bIsrc")
const Ivol = document.getElementById("Ivol")
const track = document.getElementById("track")
var bMenu = false
var bPhone = false
var bInfo = false
var bSrc = false
var bVol = false
var curPath = -1
infoOff()
pathInit()
track.play()
updateVol()
if (window.innerWidth < 769) {
    bPhone = true
}

if (!bPhone) {
    svgArrow1.style.opacity = "0"
    bInput.placeholder = "Dove vuoi andare?"
}

document.getElementById("bIISLogo").addEventListener("click", () => {
    window.open("https://www.calabreselevi.edu.it/", '_blank')
})

menuButton.addEventListener("mouseover", () => {
    if (!bPhone) {
        if (bMenu) {
            svgArrow2.style.animation = "fadeIn 0.4s"
            svgArrow2.style.opacity = 1
            svgArrow1.style.animation = "fadeOut 0.4s"
            svgArrow1.style.opacity = 0
        } else {
            svgArrow1.style.animation = "fadeIn 0.4s"
            svgArrow1.style.opacity = 1
            svgArrow2.style.animation = "fadeOut 0.4s"
            svgArrow2.style.opacity = 0
        }
        svgLine.style.animation = "fadeOut 0.4s"
        svgLine.style.opacity = 0
    }
})

menuButton.addEventListener("mouseout", () => {
    if (!bPhone) {
        svgLine.style.animation = "fadeIn 0.4s"
        svgLine.style.opacity = 1
        svgArrow2.style.animation = "fadeOut 0.4s"
        svgArrow2.style.opacity = 0
        svgArrow1.style.animation = "fadeOut 0.4s"
        svgArrow1.style.opacity = 0
    }
})

menuButton.addEventListener("click", menu)

function menu() {
    bMenu = !bMenu
    if (!bPhone) {
        if (bMenu) {
            document.getElementById("main").style.gridTemplateColumns = "20% 2% 78%"
            document.getElementById("menuBox").style.transform = "translateX(0)"
        } else {
            document.getElementById("main").style.gridTemplateColumns = "1% 2% 97%"
            document.getElementById("menuBox").style.transform = "translateX(-20vw)"
        }
    } else {
        if (bMenu) {
            document.getElementById("main").style.gridTemplateRows = "35% 5% 60%"
            svgArrow1.style.opacity = 1
            svgArrow2.style.opacity = 0
        } else {
            document.getElementById("main").style.gridTemplateRows = "88% 5% 7%"
            svgArrow2.style.opacity = 1
            svgArrow1.style.opacity = 0
        }
    }
}

let iCLose = document.querySelectorAll(".iClose")
for (let i = 0; i < iCLose.length; i++) {
    iCLose[i].addEventListener("click", () => {
        infoOff()
        bInfo = !bInfo
    })
}

function infoOff() {
    document.getElementById("info").style.visibility = "hidden";
    document.getElementById("shadow").style.zIndex = -1
}

export function objClick(idx) {
    console.log(idx)
    document.getElementById("info").style.visibility = "visible";
    document.getElementById("iTitle").innerHTML = names[idx].toUpperCase()
    iGmap(idx)
    document.getElementById("iBody").innerHTML = document.getElementById("iGmaps").outerHTML + bInfos[idx].outerHTML
    document.getElementById("shadow").style.zIndex = 2
    
    if (bMenu) {
        menu()
    }
}

function iGmap(idx) {
    document.getElementById("iAdr").innerHTML = iAdr[idx]
    document.getElementById("iOpnH").innerHTML = iOpnH[idx]
    document.getElementById("iGmapsBox").innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=100%25&amp;hl=en&amp;q=${mapIDs[idx].replaceAll(" ", "%20")}+(${mapIDs[idx].replaceAll(" ", "%20")})&amp;t=p&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">`
}

document.getElementById("results").addEventListener("click", function(event) {
    if (event.target.classList.contains("result")) {
        let temp = event.target.id
        if (isNaN(temp)) {
            objClick(parseInt(temp.toString().slice(1)))
            bInput.value = ""
            srcOnOff()
        }
    }
})

if (!bPhone) {
    bInput.addEventListener("click", srcOnOff)
    document.getElementById("bSearch").addEventListener("mouseleave", () => {
        if (bSrc) {
            srcOnOff()
        }
    })
} else {
    document.getElementById("bSsvg").addEventListener("click", () => {
        srcOnOff()
        src()
    })
}

bInput.addEventListener("input", src)
document.getElementById("bSesc").addEventListener("click", () => {
    bInput.value = ""
    srcOnOff()
})

function srcOnOff() {
    if (!bSrc || bInput != "") {
        bSrc = !bSrc
    }
    if (!bPhone) {
        if (bSrc) {
            infoOff()
            bInfo = false
            src()
            document.getElementById("bSearch").style.height = "500%"
            document.getElementById("bSearch").style.width = "150%"
            bInput.style.borderBottom = "var(--c4) 2px solid"
            document.getElementById("results").style.marginTop = "1vh"
            document.getElementById("bSesc").style.visibility = "visible"
        } else if (bInput.value == "") {
            document.getElementById("bSearch").style.height = "unset"
            document.getElementById("bSearch").style.width = "max-content"
            bInput.style.borderBottom = ""
            document.getElementById("results").innerHTML = ""
            document.getElementById("results").style.marginTop = ""
            document.getElementById("bSesc").style.visibility = "hidden"
        }
    } else {
        if (bSrc) {
            infoOff()
            bInfo = false
            document.getElementById("bBody").style.gridTemplateColumns = "auto 100%"
            document.getElementById("bSearch").style.width = "90%"
            document.getElementById("bSearch").style.height = "500%"
            document.getElementById("bSearch").style.gridTemplateColumns = "4.2vh 1fr 4.2vh"
            bInput.style.visibility = "visible"
            document.getElementById("bSesc").style.visibility = "visible"
        } else if (bInput.value == "") {
            document.getElementById("bBody").style.gridTemplateColumns = "1fr 7vh"
            document.getElementById("bSearch").style.width = "60%"
            document.getElementById("bSearch").style.height = "60%"
            document.getElementById("bSearch").style.gridTemplateColumns = "auto 0% 0%"
            bInput.style.visibility = "hidden"
            document.getElementById("bSesc").style.visibility = "hidden"
        }
    }
}

function src() {
    let input = bInput.value
    let results = []
    document.getElementById("results").innerHTML = ""
    if (input.length > 0) {
        for (let i = 0; i < names.length; i++) {
            if (names[i].toLowerCase().includes(input.toLowerCase())) {
                results.push(names[i])
            }
        }
    } else {
        results = names
    }
    if (results.length == 0) {
        var elm = document.createElement("div")
        elm.className = "result"
        elm.textContent = "Nessun Risultato Trovato :("
        elm.style.marginTop = "3vh"
        document.getElementById("results").innerHTML += elm.outerHTML
    }
    for (let i = 0; i < results.length; i++) {
        var elm = document.createElement("div")
        elm.className = "result"
        elm.textContent = results[i]
        elm.id = "r" + names.indexOf(results[i])
        document.getElementById("results").innerHTML += elm.outerHTML
    }
}
function pathInit() {
    const mBody = document.getElementById("mBody");
    for (let i = 0; i < pName.length; i++) {
        var Elm = document.createElement("div")
        var Elm1 = document.createElement("div")
        Elm.className = "path"
        Elm.innerHTML = `${pName[i]}`
        Elm.id = `p_${i}`
        Elm1.id = `pI_${i}`
        Elm1.style.marginLeft = "3vw"
        Elm.addEventListener("click", () => {
            pathClick(i)
        })
        mBody.appendChild(Elm)
        mBody.appendChild(Elm1)
    }
}

function pathClick(idx) {
    if (curPath == idx) {
        curPath = -1
        clearPath()
        clearPings()
    } else {
        if (curPath != -1) {
            clearPath()
            clearPings()
        }
        curPath = idx
        pings(pStr[idx])
        for (let i = 0; i < pStr[idx].length; i++) {
            var Elm = document.createElement("div")
            Elm.innerHTML = `${names[pStr[idx][i]]}`
            Elm.className = "result"
            Elm.addEventListener("click", () => {
                objClick(pStr[idx][i])
            })
            
            document.getElementById(`pI_${idx}`).appendChild(Elm)
        }
    }
}

function clearPath() {
    for (let i = 0; i < pStr.length; i++) {
        document.getElementById(`pI_${i}`).innerHTML = ""
    }
}

Ivol.addEventListener("mousedown", (e) => {
    bVol = true;
    updateVolThumb(e);
})

Ivol.addEventListener("mouseup", () => {
    bVol = false;
})

Ivol.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if(bVol) {
        updateVolThumb(e);
    }
})

function updateVolThumb(e) {
    let x = e.pageX - Ivol.offsetLeft
    let width = Ivol.offsetWidth
    let percentage = x / width
    let value = percentage * (Ivol.max - Ivol.min)
    Ivol.value = value

    updateVol()
}

Ivol.addEventListener("change", updateVol)

function updateVol() {
    document.getElementById("Ovol").innerHTML = Ivol.value + "%"
    track.volume = Ivol.value/100
}

track.addEventListener("ended", function() {
    this.currentTime = 0
    this.play()
}, false)
