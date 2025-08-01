# 🎮 Game Catalog

A modern web application to track and catalog your completed games. Built with vanilla HTML, CSS, and JavaScript, designed to work seamlessly with GitHub Pages.

## ✨ Features

- **📊 Statistics Dashboard**: Track total games completed, hours played, average rating, and yearly progress
- **🔍 Search & Filter**: Find games by name, platform, or genre
- **⭐ Rating System**: Rate your games with a 5-star system
- **📝 Comments**: Add personal notes about each game
- **🖼️ Game Covers**: Optional game cover images
- **📱 Responsive Design**: Works perfectly on desktop and mobile devices
- **💾 Local Storage**: All data is stored locally in your browser
- **🎨 Modern UI**: Beautiful gradient design with smooth animations

## 🚀 Demo

Visit the live demo: [Game Catalog](https://zehroque21.github.io/game-catalog/)

## 📸 Screenshots

### Desktop View
![Desktop Screenshot](screenshots/desktop.png)

### Mobile View
![Mobile Screenshot](screenshots/mobile.png)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript (ES6+)**: Interactive functionality and data management
- **Font Awesome**: Beautiful icons
- **LocalStorage API**: Data persistence

## 📋 Game Information Tracked

- Game Name
- Platform (PC, PlayStation, Xbox, Nintendo, Mobile, Other)
- Genre (RPG, Action, Adventure, Strategy, etc.)
- Completion Date
- Hours Played
- Personal Rating (1-5 stars)
- Comments/Notes
- Game Cover Image (optional)

## 🎯 How to Use

1. **Add a Game**: Click the "Add Game" button to open the form
2. **Fill Details**: Enter game information including name, platform, genre, completion date, etc.
3. **Rate & Comment**: Give it a star rating and add your thoughts
4. **Save**: Click "Add Game" to save to your catalog
5. **Search & Filter**: Use the search bar and filters to find specific games
6. **Edit/Delete**: Use the buttons on each game card to modify or remove entries

## 🔧 Installation & Setup

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch" and choose "main"
4. Your catalog will be available at `https://yourusername.github.io/game-catalog/`

### Option 2: Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/zehroque21/game-catalog.git
   cd game-catalog
   ```
2. Open `index.html` in your web browser
3. Start cataloging your games!

## 📊 Features in Detail

### Statistics Dashboard
- **Games Completed**: Total number of games in your catalog
- **Hours Played**: Sum of all gaming hours
- **Average Rating**: Your average game rating
- **This Year**: Games completed in the current year

### Search & Filtering
- **Search**: Find games by name, genre, or platform
- **Platform Filter**: Filter by gaming platform
- **Genre Filter**: Filter by game genre
- **Sorting Options**: Sort by date, rating, hours played, or alphabetically

### Data Management
- All data is stored locally in your browser using LocalStorage
- No server required - works completely offline
- Data persists between browser sessions

## 🎨 Customization

The app uses CSS custom properties for easy theming. You can modify the colors in the CSS file:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #ff6b6b;
  --success-color: #4ecdc4;
  /* ... more variables */
}
```

## 🤝 Contributing

Contributions are welcome! Here are some ways you can help:

1. **Bug Reports**: Found a bug? Open an issue
2. **Feature Requests**: Have an idea? Let's discuss it
3. **Code Contributions**: Submit a pull request
4. **Documentation**: Help improve the docs

### Development Guidelines
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Font Awesome** for the beautiful icons
- **Google Fonts** for typography
- **CSS Gradients** inspiration from various design resources

## 🔮 Future Features

- [ ] Export/Import functionality
- [ ] Game completion statistics charts
- [ ] Integration with gaming APIs for automatic game data
- [ ] Dark/Light theme toggle
- [ ] Backup to cloud storage
- [ ] Social sharing features
- [ ] Game recommendation system

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/zehroque21/game-catalog/issues) page
2. Create a new issue if your question isn't answered
3. Provide as much detail as possible

---

**Happy Gaming! 🎮**

Made with ❤️ by [Amado Roque](https://github.com/zehroque21)

