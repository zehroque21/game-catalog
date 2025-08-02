# 🕹️ Retro Game Catalog

A nostalgic, retro-styled web application for tracking your completed video games. Built with modern web technologies and featuring a classic arcade aesthetic.

![Retro Game Catalog](https://img.shields.io/badge/Status-Live-brightgreen) ![Version](https://img.shields.io/badge/Version-2.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🎮 Core Functionality
- **Complete CRUD Operations**: Add, view, edit, and delete games
- **Smart Image Management**: Local image storage with automatic fallbacks
- **Advanced Filtering**: Search by name, filter by platform/genre, sort by various criteria
- **Year-based Organization**: Automatic categorization by completion year
- **Rating System**: 5-star rating system for each game
- **Statistics Dashboard**: Track total games, hours played, average rating, and top genre

### 🎨 Retro Gaming Design
- **Neon Color Palette**: Cyan, pink, green, and yellow neon accents
- **Retro Typography**: Press Start 2P and Orbitron fonts
- **Animated Background**: Subtle pulsing gradients and effects
- **Glowing Elements**: Neon glow effects on buttons and borders
- **Smooth Animations**: Hover effects, transitions, and micro-interactions
- **Responsive Design**: Optimized for desktop and mobile devices

### 🔧 Technical Features
- **Airtable Integration**: Cloud-based data storage and synchronization
- **Local Image Caching**: Faster loading with local game cover images
- **Progressive Enhancement**: Works without JavaScript for basic functionality
- **Modern CSS**: Flexbox, Grid, and CSS custom properties
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚀 Live Demo

**[🎮 Play with the Retro Game Catalog](https://zehroque21.github.io/game-catalog/)**

## 📸 Screenshots

### Main Dashboard
![Dashboard](images/screenshots/dashboard.png)

### Game Grid
![Game Grid](images/screenshots/game-grid.png)

### Add Game Modal
![Add Game](images/screenshots/add-game.png)

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Airtable account and API token
- Basic understanding of web development (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/zehroque21/game-catalog.git
   cd game-catalog
   ```

2. **Open in browser**
   ```bash
   # Option 1: Direct file access
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Configure Airtable**
   - Visit the app in your browser
   - Enter your Airtable API token when prompted
   - Start adding your games!

### Airtable Setup

1. **Create Airtable Base**
   - Sign up at [airtable.com](https://airtable.com)
   - Create a new base called "Game Catalog"

2. **Create Table Structure**
   ```
   Table Name: GamesSimple
   Fields:
   - Name (Single line text)
   - Platform (Single line text)
   - Genre (Single line text)
   - StartDate (Single line text)
   - CompletionDate (Single line text)
   - HoursPlayed (Single line text)
   - Rating (Single line text)
   - Comments (Long text)
   - ImageURL (Single line text)
   - Status (Single line text)
   ```

3. **Get API Token**
   - Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
   - Create a new token with read/write permissions
   - Copy the token (starts with `pat...`)

## 🎯 Usage Guide

### Adding Games
1. Click the "ADD GAME" button
2. Fill in the required fields (Name, Platform, Genre, Completion Date)
3. Optionally add hours played, rating, comments, and cover image URL
4. Click "Add Game" to save

### Managing Games
- **Edit**: Click the "Edit" button on any game card
- **Delete**: Click the "Delete" button and confirm
- **Search**: Use the search box to find specific games
- **Filter**: Use dropdown filters for platform and genre
- **Sort**: Choose sorting criteria (name, rating, hours, date)

### Year Tabs
Games are automatically organized by completion year. Click on year tabs to filter games by specific years.

### Statistics
The dashboard shows:
- Total games completed
- Total hours played
- Average rating across all games
- Most played genre

## 🎨 Customization

### Color Scheme
The retro color palette can be customized in `styles.css`:

```css
:root {
    --neon-cyan: #00ffff;
    --neon-pink: #ff00ff;
    --neon-green: #00ff00;
    --neon-yellow: #ffff00;
    /* ... more colors */
}
```

### Adding Game Images
1. Add images to `images/games/` directory
2. Update `game-images-mapping.js` with the mapping:
   ```javascript
   const gameImageMapping = {
       'Game Name': 'images/games/game-cover.jpg',
       // ... more mappings
   };
   ```

### Fonts
The app uses two main fonts:
- **Press Start 2P**: For headings and retro elements
- **Orbitron**: For body text and modern elements

## 📁 Project Structure

```
game-catalog/
├── index.html              # Main HTML file
├── styles.css              # Retro styling and animations
├── script-airtable.js       # Main application logic
├── game-images-mapping.js   # Local image mapping
├── images/
│   └── games/              # Game cover images
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🔧 Technical Details

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance
- Lazy loading for images
- Efficient DOM manipulation
- Minimal external dependencies
- Optimized CSS animations

### Security
- Client-side token storage
- HTTPS-only API calls
- Input validation and sanitization
- No server-side dependencies

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Ensure mobile responsiveness
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Fonts**: Google Fonts (Press Start 2P, Orbitron)
- **Icons**: Font Awesome
- **API**: Airtable for data storage
- **Inspiration**: Classic arcade games and retro computing aesthetics

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Issues**: Look for existing solutions
2. **Create an Issue**: Describe your problem in detail
3. **Join Discussions**: Share ideas and feedback

## 🎮 Happy Gaming!

Track your gaming journey in style with the Retro Game Catalog. Whether you're a casual gamer or a hardcore completionist, this tool helps you celebrate your gaming achievements with a nostalgic flair.

---

**Made with ❤️ and lots of ☕ by the gaming community**

