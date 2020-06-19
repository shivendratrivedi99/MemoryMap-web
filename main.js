colors = [
    "rgba(255, 0, 0, 0.979)",
    "rgba(255, 145, 0, 0.979)",
    "rgba(251, 255, 0, 0.979)",
    "rgba(157, 255, 0, 0.979)",
    "rgba(0, 255, 242, 0.979)",
    "rgba(0, 17, 255, 0.979)",
    "rgba(255, 0, 212, 0.979)",
    "rgba(162, 0, 255, 0.979)"
];
var nColors = 8;
var moves = 0, score = 0;
colorIndex = [0, 0, 0, 0, 0, 0, 0, 0];
var clickCounter = 0;
completionCounter = 0;
var idss1, idss2;

function create() {
    for (i = 0; i < 2 * nColors; i++) {
        var block = document.createElement("div");
        var overBlock = document.createElement("div");
        if (i < 10) {
            block.id = "block" + "0" + i;
            overBlock.id = "block" + "0" + i + "0" + i;
        }
        else {
            block.id = "block" + i;
            overBlock.id = "block" + i + i;
        }
        block.className = "block";
        overBlock.className = "overBlock";
        overBlock.onclick = function () { onClick(this.id) };
        document.getElementById("container").appendChild(block);
        document.getElementById("overContainer").appendChild(overBlock);
    }
}
function applyColor() {
    for (i = 0; i < 2 * nColors; i++) {
        var ele = document.getElementsByClassName("block");
        while (1) {
            var colorId = Math.round(Math.random() * nColors);
            if (colorIndex[colorId] < 2) {
                break;
            }
        }
        ele[i].style.backgroundColor = colors[colorId];
        colorIndex[colorId]++;
    }

}

function onClick(ids) {
    moves++;
    displayMoves();
    ++clickCounter;

    if (clickCounter == 1) {

        idss1 = ids;
        console.log(ids);
        document.getElementsByClassName("overBlock")[ids].style.backgroundColor = "rgba(255, 255, 255, 0)";
        document.getElementsByClassName("overBlock")[ids].style.transition = "background-Color 0.5s";

    }
    else if (clickCounter == 2) {

        idss2 = ids;
        console.log(ids);
        document.getElementsByClassName("overBlock")[ids].style.backgroundColor = "rgba(255, 255, 255, 0)";
        document.getElementsByClassName("overBlock")[ids].style.transition = "background-Color 0.5s";
        if (idss1 != idss2) {
            if (document.getElementById(idss1.substr(0, idss1.length - 2)).style.backgroundColor === document.getElementById(idss2.substr(0, idss2.length - 2)).style.backgroundColor) {

                console.log("same color " + idss1.substr(0, idss1.length - 2) + " " + idss2.substr(0, ids.length - 2));
                document.getElementById(idss1).style.backgroundColor = "white";
                document.getElementById(idss1).style.transition = "background-color 0.55s";
                document.getElementById(idss2).style.backgroundColor = "white";
                document.getElementById(idss2).style.transition = "background-color 0.95s";
                document.getElementById(idss1).className = "hide";
                document.getElementById(idss2).className = "hide";
                clickCounter = 0;
                checkCompletion();
            }
        }
    }
    else {
        clickCounter = 0;
        for (i = 0; i < 2 * nColors; i++) {
            document.getElementsByClassName("overBlock")[i].style.backgroundColor = "saddlebrown";
        }
        // ++clickCounter;
        // idss1=ids;
        // idss2="";
        // console.log(ids);
        // document.getElementsByClassName("overBlock")[ids].style.backgroundColor = "rgba(255, 255, 255, 0)";
        // document.getElementsByClassName("overBlock")[ids].style.transition = "background-Color 0.5s";
    }
}
function displayMoves() {
    document.getElementById("highscore").innerText = "Highscore:" + document.querySelectorAll('.hide').length * 100;

    document.getElementById("moves").innerText = "Moves:" + moves;

}
function checkCompletion() {
    var a = document.querySelectorAll('.hide').length;

    if (a === 2 * nColors) {
        console.log("complete");
        document.getElementById("container").style.left = "-100%";
        document.getElementById("overContainer").style.left = "-100%";
        document.getElementById("container").style.transition = "left 0.5s";
        document.getElementById("overContainer").style.transition = "left 0.5s";

        document.getElementById("congrats").style.display = "inline-block";
        document.getElementById("congrats").style.opacity = "1";
        document.getElementById("congrats").style.transition = "opacity 20s";
        document.getElementById("congrats").style.transition = "display 20s";


    }
}
function log() {
    for (i = 0; i < nColors; i++) {
        console.log(colorIndex[i]);
    }
}
window.onbeforeunload = function () {
    return "wait";
};