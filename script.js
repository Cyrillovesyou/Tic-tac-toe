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
    cells.forEach(cell => cell.addEventListener("click" , cellClicked));
    statusTxt.textContent = `${currentPlayer}'s turn`;
    running = true;  
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this , cellIndex);
    checkWinner();
}
function updateCell(cell , index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "0" : "X";
    statusTxt.textContent = `${currentPlayer}'s turn`
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length ; i++){
        const conditions = winConditions[i];
        const cellA = options[conditions[0]]
        const cellB = options[conditions[1]]
        const cellC = options[conditions[2]]


        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusTxt.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
         statusTxt.textContent = `Draw`;
        running = false;
    }
    else{
        changePlayer();
    }

}
 function resetBtn(){
    currentPlayer = "X";
    options = ["","","","","","","","",""]
    statusTxt.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
 }   