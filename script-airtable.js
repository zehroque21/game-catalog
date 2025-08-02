// Game Catalog App with Airtable Integration
class GameCatalogAirtable {
    constructor() {
        this.games = [];
        this.currentEditId = null;
        this.airtableToken = null;
        this.baseId = 'app6jc6W6lEDel88G';
        this.tableId = 'tblnBC7qG4ijRxPKJ'; // GamesSimple table
        this.init();
    }

    async init() {
        await this.checkConfiguration();
        this.bindEvents();
        if (this.airtableToken) {
            await this.loadGamesFromAirtable();
        }
        this.renderGames();
        this.updateStats();
    }

    async checkConfiguration() {
        this.airtableToken = localStorage.getItem('airtableToken');
        
        if (!this.airtableToken) {
            this.showConfigModal();
        }
    }

    showConfigModal() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999;';
        
        modal.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 12px; max-width: 500px; width: 90%;">
                <h2 style="margin-bottom: 1rem; color: #2c3e50;">🔐 Configure Airtable Token</h2>
                <p style="margin-bottom: 1.5rem; color: #666;">Enter your Airtable token to connect to your game database:</p>
                <input type="text" id="tokenInput" placeholder="pat..." style="width: 100%; padding: 12px; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 1rem; font-family: monospace;">
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button id="saveToken" style="background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">Save & Continue</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('saveToken').addEventListener('click', () => {
            const token = document.getElementById('tokenInput').value.trim();
            if (token) {
                this.airtableToken = token;
                localStorage.setItem('airtableToken', token);
                document.body.removeChild(modal);
                this.loadGamesFromAirtable();
                this.showNotification('Token saved successfully!', 'success');
            }
        });
    }

    async loadGamesFromAirtable() {
        try {
            this.showNotification('Loading games from Airtable...', 'info');
            
            const response = await fetch(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}`, {
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            this.games = data.records.map(record => ({
                id: record.id,
                name: record.fields.Name || '',
                platform: record.fields.Platform || '',
                genre: record.fields.Genre || '',
                startDate: record.fields.StartDate || '',
                completionDate: record.fields.CompletionDate || '',
                hoursPlayed: parseFloat(record.fields.HoursPlayed) || 0,
                rating: parseInt(record.fields.Rating) || 0,
                comments: record.fields.Comments || '',
                imageUrl: record.fields.ImageURL || '',
                status: record.fields.Status || 'Completed'
            }));

            this.showNotification(`${this.games.length} games loaded successfully!`, 'success');
            this.renderGames();
            this.updateStats();
            
        } catch (error) {
            console.error('Error loading games:', error);
            this.showNotification(`Error loading games: ${error.message}`, 'error');
        }
    }

    async saveGameToAirtable(gameData) {
        try {
            const airtableData = {
                fields: {
                    Name: gameData.name,
                    Platform: gameData.platform,
                    Genre: gameData.genre,
                    StartDate: gameData.startDate,
                    CompletionDate: gameData.completionDate,
                    HoursPlayed: gameData.hoursPlayed.toString(),
                    Rating: gameData.rating.toString(),
                    Comments: gameData.comments,
                    ImageURL: gameData.imageUrl || '',
                    Status: gameData.status || 'Completed'
                }
            };

            const response = await fetch(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(airtableData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            const result = await response.json();
            return result.id;
            
        } catch (error) {
            console.error('Error saving game:', error);
            throw error;
        }
    }

    async updateGameInAirtable(gameId, gameData) {
        try {
            const airtableData = {
                fields: {
                    Name: gameData.name,
                    Platform: gameData.platform,
                    Genre: gameData.genre,
                    StartDate: gameData.startDate,
                    CompletionDate: gameData.completionDate,
                    HoursPlayed: gameData.hoursPlayed.toString(),
                    Rating: gameData.rating.toString(),
                    Comments: gameData.comments,
                    ImageURL: gameData.imageUrl || '',
                    Status: gameData.status || 'Completed'
                }
            };

            const response = await fetch(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}/${gameId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(airtableData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            return await response.json();
            
        } catch (error) {
            console.error('Error updating game:', error);
            throw error;
        }
    }

    async deleteGameFromAirtable(gameId) {
        try {
            const response = await fetch(`https://api.airtable.com/v0/${this.baseId}/${this.tableId}/${gameId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.airtableToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `HTTP ${response.status}`);
            }

            return true;
            
        } catch (error) {
            console.error('Error deleting game:', error);
            throw error;
        }
    }

    bindEvents() {
        // Modal events
        document.getElementById('addGameBtn').addEventListener('click', () => this.openModal());
        document.querySelector('.empty-state .add-game-btn')?.addEventListener('click', () => this.openModal());
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeModal());
        document.getElementById('gameModal').addEventListener('click', (e) => {
            if (e.target.id === 'gameModal') this.closeModal();
        });

        // Form events
        document.getElementById('gameForm').addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Rating events
        this.bindRatingEvents();

        // Filter and search events
        document.getElementById('searchInput').addEventListener('input', () => this.filterGames());
        document.getElementById('platformFilter').addEventListener('change', () => this.filterGames());
        document.getElementById('genreFilter').addEventListener('change', () => this.filterGames());
        document.getElementById('sortBy').addEventListener('change', () => this.filterGames());

        // Settings button
        document.getElementById('settingsBtn').addEventListener('click', () => {
            if (confirm('Reset Airtable configuration? You will need to enter your token again.')) {
                localStorage.removeItem('airtableToken');
                location.reload();
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    bindRatingEvents() {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => this.setRating(index + 1));
            star.addEventListener('mouseenter', () => this.highlightStars(index + 1));
        });

        document.getElementById('ratingInput')?.addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('ratingInput').dataset.rating) || 0;
            this.highlightStars(currentRating);
        });
    }

    setRating(rating) {
        document.getElementById('ratingInput').dataset.rating = rating;
        this.highlightStars(rating);
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    }

    openModal(game = null) {
        this.currentEditId = game ? game.id : null;
        const modal = document.getElementById('gameModal');
        const form = document.getElementById('gameForm');
        const title = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');

        if (game) {
            title.textContent = 'Edit Game';
            submitBtn.textContent = 'Update Game';
            this.populateForm(game);
        } else {
            title.textContent = 'Add New Game';
            submitBtn.textContent = 'Add Game';
            form.reset();
            this.setRating(0);
        }

        modal.classList.add('show');
        document.getElementById('gameName').focus();
    }

    populateForm(game) {
        document.getElementById('gameName').value = game.name;
        document.getElementById('platform').value = game.platform;
        document.getElementById('genre').value = game.genre;
        document.getElementById('completionDate').value = game.completionDate;
        document.getElementById('hoursPlayed').value = game.hoursPlayed;
        document.getElementById('comments').value = game.comments;
        this.setRating(game.rating);
    }

    closeModal() {
        document.getElementById('gameModal').classList.remove('show');
        this.currentEditId = null;
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const rating = parseInt(document.getElementById('ratingInput')?.dataset.rating) || 0;
        
        const gameData = {
            name: document.getElementById('gameName').value.trim(),
            platform: document.getElementById('platform').value,
            genre: document.getElementById('genre').value,
            completionDate: document.getElementById('completionDate').value,
            hoursPlayed: parseFloat(document.getElementById('hoursPlayed').value) || 0,
            rating: rating,
            comments: document.getElementById('comments').value.trim(),
            startDate: '', // Can be added later if needed
            imageUrl: document.getElementById('imageUrl')?.value || '', // Can be added later if needed
            status: 'Completed'
        };

        if (!gameData.name) {
            this.showNotification('Game name is required!', 'error');
            return;
        }

        if (!gameData.platform) {
            this.showNotification('Platform is required!', 'error');
            return;
        }

        if (!gameData.genre) {
            this.showNotification('Genre is required!', 'error');
            return;
        }

        if (!gameData.completionDate) {
            this.showNotification('Completion date is required!', 'error');
            return;
        }

        try {
            if (this.currentEditId) {
                // Update existing game
                await this.updateGameInAirtable(this.currentEditId, gameData);
                
                // Update local data
                const gameIndex = this.games.findIndex(g => g.id === this.currentEditId);
                if (gameIndex !== -1) {
                    this.games[gameIndex] = { ...this.games[gameIndex], ...gameData };
                }
                
                this.showNotification('Game updated successfully!', 'success');
            } else {
                // Add new game
                const newId = await this.saveGameToAirtable(gameData);
                
                // Add to local data
                this.games.push({ id: newId, ...gameData });
                
                this.showNotification('Game added successfully!', 'success');
            }

            this.closeModal();
            this.renderGames();
            this.updateStats();
            
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    async editGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            this.openModal(game);
        }
    }

    async deleteGame(gameId) {
        if (!confirm('Are you sure you want to delete this game?')) {
            return;
        }

        try {
            await this.deleteGameFromAirtable(gameId);
            
            // Remove from local data
            this.games = this.games.filter(g => g.id !== gameId);
            
            this.showNotification('Game deleted successfully!', 'success');
            this.renderGames();
            this.updateStats();
            
        } catch (error) {
            this.showNotification(`Error deleting game: ${error.message}`, 'error');
        }
    }

    renderGames() {
        const filteredGames = this.getFilteredGames();
        this.renderTabs(filteredGames);
        this.renderGameGrid(filteredGames);
    }

    getFilteredGames() {
        let filtered = [...this.games];

        // Search filter
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(game => 
                game.name.toLowerCase().includes(searchTerm) ||
                game.platform.toLowerCase().includes(searchTerm) ||
                game.genre.toLowerCase().includes(searchTerm)
            );
        }

        // Platform filter
        const platformFilter = document.getElementById('platformFilter').value;
        if (platformFilter) {
            filtered = filtered.filter(game => game.platform === platformFilter);
        }

        // Genre filter
        const genreFilter = document.getElementById('genreFilter').value;
        if (genreFilter) {
            filtered = filtered.filter(game => game.genre === genreFilter);
        }

        // Sort
        const sortBy = document.getElementById('sortBy').value;
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'rating':
                    return b.rating - a.rating;
                case 'hours':
                    return b.hoursPlayed - a.hoursPlayed;
                case 'date':
                default:
                    return new Date(b.completionDate) - new Date(a.completionDate);
            }
        });

        return filtered;
    }

    renderTabs(games) {
        const tabsContainer = document.getElementById('yearTabs');
        const years = [...new Set(games.map(game => {
            const date = new Date(game.completionDate);
            return isNaN(date.getTime()) ? 'Unknown' : date.getFullYear();
        }))].sort((a, b) => b - a);

        tabsContainer.innerHTML = `
            <button class="tab-btn active" data-year="all">All Years</button>
            ${years.map(year => `
                <button class="tab-btn" data-year="${year}">${year}</button>
            `).join('')}
        `;

        // Bind tab events
        tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterByYear(e.target.dataset.year);
            });
        });
    }

    filterByYear(year) {
        const games = this.getFilteredGames();
        let filteredByYear = games;

        if (year !== 'all') {
            filteredByYear = games.filter(game => {
                const date = new Date(game.completionDate);
                if (year === 'Unknown') {
                    return isNaN(date.getTime());
                }
                return date.getFullYear() == year;
            });
        }

        this.renderGameGrid(filteredByYear);
    }

    renderGameGrid(games) {
        const container = document.getElementById('gamesContainer');
        
        if (games.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎮</div>
                    <h3>No games found</h3>
                    <p>Start building your game catalog!</p>
                    <button class="add-game-btn">Add Your First Game</button>
                </div>
            `;
            return;
        }

        container.innerHTML = games.map(game => this.createGameCard(game)).join('');
    }

    createGameCard(game) {
        // Use local image mapping if available, otherwise fallback to provided URL
        const imageUrl = this.getGameImageUrl(game);
        const stars = '★'.repeat(game.rating) + '☆'.repeat(5 - game.rating);
        
        return `
            <div class="game-card">
                <div class="game-image">
                    <img src="${imageUrl}" alt="${game.name}" onerror="this.src='${this.getPlaceholderImage(game)}'">
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.name}</h3>
                    <div class="game-meta">
                        <span class="platform">${game.platform}</span>
                        <span class="genre">${game.genre}</span>
                    </div>
                    <div class="game-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-text">${game.rating}/5</span>
                    </div>
                    <div class="game-stats">
                        <span class="hours">${game.hoursPlayed}h</span>
                        <span class="date">${this.formatDate(game.completionDate)}</span>
                    </div>
                    ${game.comments ? `<p class="game-comments">${this.truncateText(game.comments, 100)}</p>` : ''}
                </div>
                <div class="game-actions">
                    <button class="btn-edit" onclick="gameCatalog.editGame('${game.id}')">Edit</button>
                    <button class="btn-delete" onclick="gameCatalog.deleteGame('${game.id}')">Delete</button>
                </div>
            </div>
        `;
    }

    getGameImageUrl(game) {
        // First try to get local image using the mapping
        if (typeof window.getGameImage === 'function') {
            const localImage = window.getGameImage(game.name);
            if (localImage && localImage !== 'images/games/default-game.png') {
                return localImage;
            }
        }
        
        // Fallback to provided URL or placeholder
        return game.imageUrl || this.getPlaceholderImage(game);
    }

    getPlaceholderImage(game) {
        const colors = {
            'RPG': '#9b59b6',
            'Action': '#e74c3c',
            'Adventure': '#f39c12',
            'Strategy': '#3498db',
            'Sports': '#27ae60',
            'Racing': '#e67e22',
            'Puzzle': '#8e44ad',
            'Simulation': '#16a085'
        };
        
        const color = colors[game.genre] || '#95a5a6';
        
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="280" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="280" height="200" fill="${color}"/>
                <text x="140" y="90" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${game.name}</text>
                <text x="140" y="120" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="12">${game.platform}</text>
            </svg>
        `)}`;
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Unknown';
        return date.toLocaleDateString();
    }

    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    updateStats() {
        const totalGames = this.games.length;
        const totalHours = this.games.reduce((sum, game) => sum + game.hoursPlayed, 0);
        const avgRating = totalGames > 0 ? (this.games.reduce((sum, game) => sum + game.rating, 0) / totalGames).toFixed(1) : 0;
        
        // Calculate top genre
        const genreCounts = {};
        this.games.forEach(game => {
            genreCounts[game.genre] = (genreCounts[game.genre] || 0) + 1;
        });
        
        const topGenre = Object.keys(genreCounts).reduce((a, b) => 
            genreCounts[a] > genreCounts[b] ? a : b, '-'
        );

        document.getElementById('totalGames').textContent = totalGames;
        document.getElementById('totalHours').textContent = totalHours;
        document.getElementById('averageRating').textContent = avgRating;
        document.getElementById('topGenre').textContent = totalGames > 0 ? topGenre : '-';
    }

    editGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            this.openModal(game);
        }
    }

    async deleteGame(gameId) {
        if (!confirm('Are you sure you want to delete this game?')) {
            return;
        }

        try {
            await this.deleteGameFromAirtable(gameId);
            this.games = this.games.filter(g => g.id !== gameId);
            this.renderGames();
            this.updateStats();
            this.showNotification('Game deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting game:', error);
            this.showNotification(`Error deleting game: ${error.message}`, 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;

        const colors = {
            success: '#27ae60',
            error: '#e74c3c',
            info: '#3498db',
            warning: '#f39c12'
        };

        notification.style.background = colors[type] || colors.info;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app
let gameCatalog;
document.addEventListener('DOMContentLoaded', () => {
    gameCatalog = new GameCatalogAirtable();
});

