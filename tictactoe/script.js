const clickHistory = [];
const winConditions = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], //horizontal
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // vertical
    [1, 5, 9], [3, 5, 7] // diagonal
];

function checkWin(a) {
    var winCount = 0;
    for (w of winConditions) {
        if (a.toString() === w.toString()) {
            winCount++;
        }
    }
    return winCount > 0 ? true : false;
}

$(document).ready(function () {
    $(".box-btn").click(function () {
        // getting id of last clicked animal
        var clickedBtn = this.id;
        clickHistory.unshift(clickedBtn);
        console.log(clickedBtn);
        console.log("Full List: " + clickHistory);
        // getting three last clicks
        const threeLast = clickHistory.slice(0, 3).sort();
        console.log("Last Three: " + threeLast);
        console.log("Winning?: " + checkWin(threeLast));
    });
});