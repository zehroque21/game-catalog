// Game Catalog App
class GameCatalog {
    constructor() {
        this.games = this.loadGames();
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderGames();
        this.updateStats();
    }

    bindEvents() {
        // Modal events
        document.getElementById('addGameBtn').addEventListener('click', () => this.openModal());
        document.querySelector('.empty-state .add-game-btn').addEventListener('click', () => this.openModal());
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

        document.getElementById('ratingInput').addEventListener('mouseleave', () => {
            const currentRating = parseInt(document.getElementById('rating').value);
            this.highlightStars(currentRating);
        });
    }

    setRating(rating) {
        document.getElementById('rating').value = rating;
        this.highlightStars(rating);
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            const icon = star.querySelector('i');
            if (index < rating) {
                icon.className = 'fas fa-star';
                star.classList.add('active');
            } else {
                icon.className = 'far fa-star';
                star.classList.remove('active');
            }
        });
    }

    openModal(game = null) {
        const modal = document.getElementById('gameModal');
        const modalTitle = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');

        if (game) {
            modalTitle.textContent = 'Edit Game';
            submitBtn.textContent = 'Update Game';
            this.currentEditId = game.id;
            this.populateForm(game);
        } else {
            modalTitle.textContent = 'Add New Game';
            submitBtn.textContent = 'Add Game';
            this.currentEditId = null;
            this.resetForm();
        }

        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('gameModal');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        this.resetForm();
    }

    populateForm(game) {
        document.getElementById('gameName').value = game.name;
        document.getElementById('platform').value = game.platform;
        document.getElementById('genre').value = game.genre;
        document.getElementById('completionDate').value = game.completionDate;
        document.getElementById('hoursPlayed').value = game.hoursPlayed || '';
        document.getElementById('comments').value = game.comments || '';
        document.getElementById('imageUrl').value = game.imageUrl || '';
        this.setRating(game.rating || 0);
    }

    resetForm() {
        document.getElementById('gameForm').reset();
        document.getElementById('rating').value = '0';
        this.highlightStars(0);
        this.currentEditId = null;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const game = {
            id: this.currentEditId || this.generateId(),
            name: document.getElementById('gameName').value.trim(),
            platform: document.getElementById('platform').value,
            genre: document.getElementById('genre').value,
            completionDate: document.getElementById('completionDate').value,
            hoursPlayed: parseFloat(document.getElementById('hoursPlayed').value) || 0,
            rating: parseInt(document.getElementById('rating').value) || 0,
            comments: document.getElementById('comments').value.trim(),
            imageUrl: document.getElementById('imageUrl').value.trim(),
            createdAt: this.currentEditId ? 
                this.games.find(g => g.id === this.currentEditId).createdAt : 
                new Date().toISOString()
        };

        if (this.currentEditId) {
            this.updateGame(game);
        } else {
            this.addGame(game);
        }

        this.closeModal();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    addGame(game) {
        this.games.push(game);
        this.saveGames();
        this.renderGames();
        this.updateStats();
        this.showNotification('Game added successfully!', 'success');
    }

    updateGame(updatedGame) {
        const index = this.games.findIndex(g => g.id === updatedGame.id);
        if (index !== -1) {
            this.games[index] = updatedGame;
            this.saveGames();
            this.renderGames();
            this.updateStats();
            this.showNotification('Game updated successfully!', 'success');
        }
    }

    deleteGame(id) {
        if (confirm('Are you sure you want to delete this game?')) {
            this.games = this.games.filter(g => g.id !== id);
            this.saveGames();
            this.renderGames();
            this.updateStats();
            this.showNotification('Game deleted successfully!', 'success');
        }
    }

    renderGames() {
        const container = document.getElementById('gamesContainer');
        const emptyState = document.getElementById('emptyState');
        
        const filteredGames = this.getFilteredGames();

        if (filteredGames.length === 0) {
            container.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');
        container.innerHTML = filteredGames.map(game => this.createGameCard(game)).join('');

        // Bind card events
        container.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameId = e.target.closest('.game-card').dataset.gameId;
                const game = this.games.find(g => g.id === gameId);
                this.openModal(game);
            });
        });

        container.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const gameId = e.target.closest('.game-card').dataset.gameId;
                this.deleteGame(gameId);
            });
        });
    }

    createGameCard(game) {
        const stars = this.createStarsHTML(game.rating || 0);
        const imageHTML = game.imageUrl ? 
            `<img src="${game.imageUrl}" alt="${game.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
             <div class="placeholder" style="display: none;"><i class="fas fa-gamepad"></i></div>` :
            `<div class="placeholder"><i class="fas fa-gamepad"></i></div>`;

        return `
            <div class="game-card" data-game-id="${game.id}">
                <div class="game-image">
                    ${imageHTML}
                </div>
                <div class="game-content">
                    <div class="game-header">
                        <div>
                            <div class="game-title">${game.name}</div>
                            <div class="game-rating">${stars}</div>
                        </div>
                        <div class="game-platform">${game.platform}</div>
                    </div>
                    <div class="game-info">
                        <div><strong>Genre:</strong> ${game.genre}</div>
                        <div><strong>Completed:</strong> ${this.formatDate(game.completionDate)}</div>
                        <div><strong>Hours:</strong> ${game.hoursPlayed || 'N/A'}</div>
                        <div><strong>Rating:</strong> ${game.rating || 'N/A'}/5</div>
                    </div>
                    ${game.comments ? `<div class="game-comments">${game.comments}</div>` : ''}
                    <div class="game-actions">
                        <button class="btn-edit">
                            <i class="fas fa-edit"></i>
                            Edit
                        </button>
                        <button class="btn-delete">
                            <i class="fas fa-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    createStarsHTML(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += `<i class="fas fa-star" style="color: ${i <= rating ? '#ffd700' : '#ddd'}"></i>`;
        }
        return stars;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    getFilteredGames() {
        let filtered = [...this.games];

        // Search filter
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(game => 
                game.name.toLowerCase().includes(searchTerm) ||
                game.genre.toLowerCase().includes(searchTerm) ||
                game.platform.toLowerCase().includes(searchTerm)
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
                case 'date-desc':
                    return new Date(b.completionDate) - new Date(a.completionDate);
                case 'date-asc':
                    return new Date(a.completionDate) - new Date(b.completionDate);
                case 'rating-desc':
                    return (b.rating || 0) - (a.rating || 0);
                case 'rating-asc':
                    return (a.rating || 0) - (b.rating || 0);
                case 'hours-desc':
                    return (b.hoursPlayed || 0) - (a.hoursPlayed || 0);
                case 'hours-asc':
                    return (a.hoursPlayed || 0) - (b.hoursPlayed || 0);
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return new Date(b.completionDate) - new Date(a.completionDate);
            }
        });

        return filtered;
    }

    filterGames() {
        this.renderGames();
    }

    updateStats() {
        const totalGames = this.games.length;
        const totalHours = this.games.reduce((sum, game) => sum + (game.hoursPlayed || 0), 0);
        const avgRating = totalGames > 0 ? 
            this.games.reduce((sum, game) => sum + (game.rating || 0), 0) / totalGames : 0;
        
        const currentYear = new Date().getFullYear();
        const thisYear = this.games.filter(game => 
            new Date(game.completionDate).getFullYear() === currentYear
        ).length;

        document.getElementById('totalGames').textContent = totalGames;
        document.getElementById('totalHours').textContent = Math.round(totalHours);
        document.getElementById('avgRating').textContent = avgRating.toFixed(1);
        document.getElementById('thisYear').textContent = thisYear;
    }

    loadGames() {
        const saved = localStorage.getItem('gameCatalog');
        return saved ? JSON.parse(saved) : [];
    }

    saveGames() {
        localStorage.setItem('gameCatalog', JSON.stringify(this.games));
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 25px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#4ecdc4' : 
                           type === 'error' ? '#ff6b6b' : '#667eea'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Export/Import functionality
    exportData() {
        const data = {
            games: this.games,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `game-catalog-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    importData(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.games && Array.isArray(data.games)) {
                    this.games = data.games;
                    this.saveGames();
                    this.renderGames();
                    this.updateStats();
                    this.showNotification('Data imported successfully!', 'success');
                } else {
                    throw new Error('Invalid file format');
                }
            } catch (error) {
                this.showNotification('Error importing data. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameCatalog = new GameCatalog();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'n':
                    e.preventDefault();
                    window.gameCatalog.openModal();
                    break;
                case 'e':
                    e.preventDefault();
                    window.gameCatalog.exportData();
                    break;
            }
        }
    });
});

// Add some sample data for demonstration (remove in production)
if (localStorage.getItem('gameCatalog') === null) {
    const sampleGames = [
        {
            id: 'sample1',
            name: 'The Legend of Zelda: Breath of the Wild',
            platform: 'Nintendo',
            genre: 'Adventure',
            completionDate: '2024-01-15',
            hoursPlayed: 120,
            rating: 5,
            comments: 'Amazing open-world experience. One of the best games I\'ve ever played!',
            imageUrl: '',
            createdAt: '2024-01-15T10:00:00.000Z'
        },
        {
            id: 'sample2',
            name: 'Cyberpunk 2077',
            platform: 'PC',
            genre: 'RPG',
            completionDate: '2024-02-20',
            hoursPlayed: 85,
            rating: 4,
            comments: 'Great story and visuals, but had some bugs. Worth playing after patches.',
            imageUrl: '',
            createdAt: '2024-02-20T14:30:00.000Z'
        },
        {
            id: 'sample3',
            name: 'God of War',
            platform: 'PlayStation',
            genre: 'Action',
            completionDate: '2024-03-10',
            hoursPlayed: 45,
            rating: 5,
            comments: 'Incredible storytelling and character development. The relationship between Kratos and Atreus is beautifully crafted.',
            imageUrl: '',
            createdAt: '2024-03-10T16:45:00.000Z'
        }
    ];
    
    localStorage.setItem('gameCatalog', JSON.stringify(sampleGames));
}

