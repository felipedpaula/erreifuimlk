window.onload = function() {
    shuffleCells();
};

function shuffleCells() {
    var cells = document.querySelectorAll('.cell');
    var indices = Array.from(Array(cells.length).keys());
    indices.sort(() => Math.random() - 0.5);
    cells.forEach(function(cell, index) {
        cell.style.order = indices[index];
    });
}

var flippedCards = []; // Array para armazenar as cartas viradas
var score = 0; 
var pontuacao = document.querySelector('.pontuacao');

function flipCard(cell) {
    // Verifica se já existem duas cartas viradas
    if (flippedCards.length >= 2 || cell.classList.contains('flipped')) {
        return; // Se sim, sai da função
    }
    
    // Adiciona a classe 'flipped' à célula clicada
    cell.classList.add('flipped');
    
    // Adiciona a célula clicada ao array de cartas viradas
    flippedCards.push(cell);
    
    // Verifica se duas cartas foram viradas
    if (flippedCards.length === 2) {
        // Desativa o evento de clique em todas as células
        disableClicks();
        
        // Verifica se as duas cartas viradas têm a mesma classe
        if (flippedCards[0].classList[1] === flippedCards[1].classList[1]) {
            // Se sim, aumenta o contador de pontos
            score++;
            pontuacao.innerHTML = score;
            console.log("Pontuação: " + score); // Mostra a pontuação no console
            enableClicks(); // Reativa o evento de clique
            flippedCards = []; // Limpa o array de cartas viradas
        } else {
            // Se não, define um temporizador para desvirar as cartas após 2 segundos
            setTimeout(function() {
                resetFlippedCards();
            }, 2000); // 2000 milissegundos = 2 segundos
        }
    }
    
    // Verifica se todas as cartas foram viradas
    if (score === 6) {
        // Se sim, executa a lógica para o fim do jogo
        endGame();
    }
}

function disableClicks() {
    // Desativa o evento de clique em todas as células
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function(cell) {
        cell.onclick = null;
    });
}

function enableClicks() {
    // Ativa o evento de clique em todas as células
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function(cell) {
        cell.onclick = function() {
            flipCard(this);
        };
    });
}

function resetFlippedCards() {
    // Verifica se as duas cartas viradas têm a mesma classe
    if (flippedCards.length === 2 && flippedCards[0].classList[1] === flippedCards[1].classList[1]) {
        // Se sim, sai da função sem desvirar as cartas
        flippedCards = []; // Limpa o array de cartas viradas
        enableClicks(); // Reativa o evento de clique
        return;
    }
    
    // Remove a classe 'flipped' de todas as cartas
    flippedCards.forEach(function(cell) {
        cell.classList.remove('flipped');
    });
    
    // Limpa o array de cartas viradas
    flippedCards = [];
    
    // Ativa o evento de clique em todas as células novamente
    enableClicks();
}

var iframe = document.querySelector('.iframe-area');
var jogo = document.querySelector('.container');
function endGame() {
    setTimeout(function() {
        iframe.style.display = 'block';
        jogo.style.display = 'hidden';
        // window.location.href = 'https://youtu.be/on_3ODlOAIA?t=12';
    }, 100); 
}
