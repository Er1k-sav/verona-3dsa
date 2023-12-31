console.log("script.js")

import { names, bInfos } from "../src/assets/data.js"

const menuButton = document.getElementById("mSvg")
const svgArrow1 = document.getElementById('svgArrow1');
const svgArrow2 = document.getElementById('svgArrow2');
const svgLine = document.getElementById('svgLine');
const bInput = document.getElementById("bIsrc")
var bMenu = false
var bPhone = false
var bInfo = false
var bSrc = false
infoOff()
if (window.innerWidth < 769) {
    bPhone = true
}

if (!bPhone) {
    svgArrow1.style.opacity = "0";
    bInput.placeholder = "Dove vuoi andare?"
}

document.getElementById("bIISLogo").addEventListener("click", () => {
    window.open("https://www.calabreselevi.edu.it/", '_blank');
})

menuButton.addEventListener("mouseover", () => {
    if (!bPhone) {
        if (bMenu) {
            svgArrow2.style.animation = "fadeIn 0.4s";
            svgArrow2.style.opacity = 1;
            svgArrow1.style.animation = "fadeOut 0.4s";
            svgArrow1.style.opacity = 0;
        } else {
            svgArrow1.style.animation = "fadeIn 0.4s";
            svgArrow1.style.opacity = 1;
            svgArrow2.style.animation = "fadeOut 0.4s";
            svgArrow2.style.opacity = 0;
        }
        svgLine.style.animation = "fadeOut 0.4s";
        svgLine.style.opacity = 0;
    }
});

menuButton.addEventListener("mouseout", () => {
    if (!bPhone) {
        svgLine.style.animation = "fadeIn 0.4s";
        svgLine.style.opacity = 1;
        svgArrow2.style.animation = "fadeOut 0.4s";
        svgArrow2.style.opacity = 0;
        svgArrow1.style.animation = "fadeOut 0.4s";
        svgArrow1.style.opacity = 0;
    }
});

menuButton.addEventListener("click", menu)

function menu() {
    bMenu = !bMenu
    if (!bPhone) {
        if (bMenu) {
            document.getElementById("main").style.gridTemplateColumns = "20% 2% 78%";
            document.getElementById("menuBox").style.transform = "translateX(0)"
        } else {
            document.getElementById("main").style.gridTemplateColumns = "1% 2% 97%";
            document.getElementById("menuBox").style.transform = "translateX(-20vw)"
        }
    } else {
        if (bMenu) {
            document.getElementById("main").style.gridTemplateRows = "35% 5% 60%";
            svgArrow1.style.opacity = 1;
            svgArrow2.style.opacity = 0;
        } else {
            document.getElementById("main").style.gridTemplateRows = "88% 5% 7%";
            svgArrow2.style.opacity = 1;
            svgArrow1.style.opacity = 0;
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
    document.getElementById("iBody").innerHTML = bInfos[idx].outerHTML
    document.getElementById("shadow").style.zIndex = 2
    if (bMenu) {
        menu()
    }
}

document.getElementById("results").addEventListener("click", function(event) {
    if (event.target.classList.contains("result")) {
        console.log(parseInt(event.target.id.toString().slice(1)))
        objClick(parseInt(event.target.id.toString().slice(1)))
        bInput.value = ""
        srcOnOff()
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

//srcOnOff()
function srcOnOff() {
    console.log("on")
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
        var elm = document.createElement("div");
        elm.className = "result";
        elm.textContent = "Nessun Risultato Trovato :(";
        elm.style.marginTop = "3vh"
        document.getElementById("results").innerHTML += elm.outerHTML
    }
    for (let i = 0; i < results.length; i++) {
        var elm = document.createElement("div");
        elm.className = "result";
        elm.textContent = results[i];
        elm.id = "r" + names.indexOf(results[i])
        document.getElementById("results").innerHTML += elm.outerHTML
    }
}