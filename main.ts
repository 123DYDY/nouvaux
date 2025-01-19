const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Configuration du canvas
canvas.width = 800;
canvas.height = 600;

// Propriétés du joueur
let player = {
    x: 50,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    speed: 5,
    color: 'green'
};

// Propriétés de l'ennemi
let enemy = {
    x: canvas.width - 100,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    color: 'red'
};

// Niveaux
let currentLevel = 1;
let maxLevels = 2;
let gameOver = false;

// Fonction pour dessiner le joueur
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fonction pour dessiner l'ennemi
function drawEnemy() {
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

// Fonction pour dessiner le texte du niveau
function drawLevelText() {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(`Niveau ${currentLevel}`, 20, 40);
}

// Fonction de mise à jour de la position du joueur
function updatePlayerPosition() {
    if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) player.x += player.speed;
    if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
    if (keys['ArrowDown'] && player.y < canvas.height - player.height) player.y += player.speed;
}

// Fonction de détection de collision
function checkCollision() {
    if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
        return true;
    }
    return false;
}

// Fonction pour réinitialiser la position du joueur et de l'ennemi pour le prochain niveau
function resetPositions() {
    player.x = 50;
    player.y = canvas.height - 60;
    enemy.x = canvas.width - 100;
    enemy.y = canvas.height - 100;
}

// Fonction pour gérer la logique du jeu à chaque frame
function gameLoop() {
    if (gameOver) return;

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le joueur, l'ennemi et le niveau
    drawPlayer();
    drawEnemy();
    drawLevelText();

    // Mettre à jour la position du joueur
    updatePlayerPosition();

    // Vérifier la collision
    if (checkCollision()) {
        // Passer au niveau suivant
        if (currentLevel < maxLevels) {
            currentLevel++;
            resetPositions();
        } else {
            // Jeu terminé
            gameOver = true;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '40px Arial';
            ctx.fillText('Félicitations, vous avez terminé le jeu!', 150, canvas.height / 2);
        }
    }

    // Appeler gameLoop à chaque frame
    requestAnimationFrame(gameLoop);
}

// Gestion des événements de touches pour déplacer le joueur
let keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Démarrer le jeu
gameLoop();
