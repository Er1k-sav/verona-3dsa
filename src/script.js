console.log("script.js")
const menuButton = document.getElementById("mSvg")
const svgArrow1 = document.getElementById('svgArrow1');
const svgArrow2 = document.getElementById('svgArrow2');
const svgLine = document.getElementById('svgLine');
var bMenu = false

menuButton.addEventListener("mouseover", () => {
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
});

menuButton.addEventListener("mouseout", () => {
    svgLine.style.animation = "fadeIn 0.4s";
    svgLine.style.opacity = 1;
    svgArrow2.style.animation = "fadeOut 0.4s";
    svgArrow2.style.opacity = 0;
    svgArrow1.style.animation = "fadeOut 0.4s";
    svgArrow1.style.opacity = 0;
});

menuButton.addEventListener("click", () => {
    bMenu = !bMenu
    if (bMenu) {
        document.getElementById("main").style.gridTemplateColumns = "20% 2% 78%";
        document.getElementById("menuBox").style.transform = "translateX(0)"
    } else {
        document.getElementById("main").style.gridTemplateColumns = "1% 2% 97%";
        document.getElementById("menuBox").style.transform = "translateX(-20vw)"
    }
})