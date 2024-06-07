// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusDisplay.innerText = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    gameState = Array(9).fill('');
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

let gameActive = true;
restartGame();
