const cells = document.querySelectorAll(".cell");
const statusTxt = document.querySelector("#statusTxt");

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [0,4,8],
];

let options = ["","","","","","","","",""];
let running = false;
let currentPlayer = "X";

initializeGame();

function initializeGame(){
    cells.forEach((cell, index) => {
        cell.addEventListener("click", cellClicked);
        cell.setAttribute("cellIndex", index); // Ensure each cell has a cellIndex
    });
    statusTxt.textContent = `${currentPlayer}'s turn`;
    running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusTxt.textContent = `${currentPlayer}'s turn`;
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const [a, b, c] = winConditions[i];
        const cellA = options[a];
        const cellB = options[b];
        const cellC = options[c];

        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }

        if(cellA === cellB && cellB === cellC){
            roundWon = true;
            // Highlight winning cells
            [a, b, c].forEach(index => {
                cells[index].style.backgroundColor = "#2ecc71";
            });
            break;
        }
    }

    if(roundWon){
        statusTxt.textContent = `${currentPlayer} wins!`;
        running = false;
    } else if(!options.includes("")){
        statusTxt.textContent = `Draw`;
        running = false;
    } else {
        changePlayer();
    }
}

function resetBtn(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    statusTxt.textContent = `${currentPlayer}'s turn`;
    running = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("X", "O");
        cell.style.backgroundColor = "rgb(50, 71, 139)"; // Reset background
    });
}
