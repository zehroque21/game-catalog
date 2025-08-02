// Mapeamento de imagens locais dos jogos
const gameImageMapping = {
    'Octhopath Traveler': 'images/games/octopath-traveler.jpg',
    'INSIDE': 'images/games/inside.png',
    'Super Mario Bros': 'images/games/super-mario-bros.png',
    'Starfox 64': 'images/games/starfox-64.jpg',
    'Diablo 4': 'images/games/diablo-4.png',
    'Assasins Creed 2': 'images/games/assassins-creed-2.jpg',
    'The Spider Man Miles Morales': 'images/games/spider-man-miles-morales.jpg',
    'Super Mario 3D World': 'images/games/super-mario-3d-world.jpg',
    'Assasins Creed Brotherhood': 'images/games/assassins-creed-brotherhood.jpg',
    // Adicionar mais jogos conforme necessário
};

// Função para obter imagem local do jogo
function getGameImage(gameName) {
    return gameImageMapping[gameName] || 'images/games/default-game.png';
}

// Exportar para uso no script principal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { gameImageMapping, getGameImage };
}

