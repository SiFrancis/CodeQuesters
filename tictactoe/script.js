let clickHistory = [];
let botClickHistory = [];
let lastThree = [];
let botLastThree = [];
let freeTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const winConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //horizontal
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
    [1, 5, 9], [3, 5, 7] // diagonal
];
let playerWin = false;
let botWin = false;
function checkWin(h) {
    let winCount = 0;
    for (w of winConditions) {
        let commonSet = h.filter((i) => w.includes(i)).sort();
        console.log(commonSet);
        if (commonSet.toString() == w.toString()) winCount++;
    }
    return winCount > 0 ? true : false;
}

function botClick(tileNum) {
    botClickHistory.unshift(tileNum);
    freeTiles = freeTiles.filter((n) => n != tileNum);
    botLastThree = botClickHistory.slice(0, 3).reverse();
    const botClickedBtn = document.getElementById(tileNum);
    botClickedBtn.style.opacity = 0.8;
    botClickedBtn.classList.add('btn-danger');
    botClickedBtn.classList.remove('btn-primary');
    botClickedBtn.disabled = true;
    setTimeout(function () {
        botWin = checkWin(botClickHistory);
        if (botWin) {
            alert("L rattio skill issue");
            resetBoard();
        }
    }, 200);
}

function resetBoard() {
    $(".box-content").css('opacity', '1');
    $(".box-content").prop("disabled", false);
    $(".box-content").addClass('btn-primary');
    $(".box-content").removeClass('btn-success');
    $(".box-content").removeClass('btn-danger');
    clickHistory = [];
    lastThree = [];
    botClickHistory = [];
    botLastThree = [];
    freeTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    eqCount = 0;
}

$(document).ready(function () {
    // clicking boxes
    $(".box-content").click(function () {
        // getting id of last clicked animal
        let clickedBtnId = this.id;
        clickHistory.unshift(parseInt(clickedBtnId));
        console.log(clickHistory)
        freeTiles = freeTiles.filter((n) => n != clickedBtnId);
        // getting last three clicks
        lastThree = clickHistory.slice(0, 3).reverse();
        // disable button
        const clickedBtn = document.getElementById(clickedBtnId);
        clickedBtn.style.opacity = 0.8;
        clickedBtn.classList.add('btn-success');
        clickedBtn.classList.remove('btn-primary');
        clickedBtn.disabled = true;
        // check against list of win cconditions
        setTimeout(function () {
            playerWin = checkWin(clickHistory);
            if (playerWin) {
                alert("yippee");
                resetBoard();
            }
            // if win condition not reach, bot plays random square
            else {
                let randFreeTile = freeTiles[Math.floor(Math.random() * freeTiles.length)];
                botClick(randFreeTile);
            }
        }, 100);
    });
    // reset button
    $("#reset-btn").click(function () {
        resetBoard();
    });
});