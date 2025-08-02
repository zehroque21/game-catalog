// Game image mapping for local assets
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
    // Default fallback image
    'default': 'images/games/default-game.png'
};

// Function to get game image path
function getGameImage(gameName) {
    // Try exact match first
    if (gameImageMapping[gameName]) {
        return gameImageMapping[gameName];
    }
    
    // Try partial match for similar names
    const normalizedName = gameName.toLowerCase();
    for (const [key, value] of Object.entries(gameImageMapping)) {
        if (key.toLowerCase().includes(normalizedName) || normalizedName.includes(key.toLowerCase())) {
            return value;
        }
    }
    
    // Return default if no match found
    return gameImageMapping.default;
}

// Export for use in main script
if (typeof window !== 'undefined') {
    window.gameImageMapping = gameImageMapping;
    window.getGameImage = getGameImage;
}

