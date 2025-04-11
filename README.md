Spot the Difference Game
A simple and fun browser-based game where you compare two images and find the visual differences between them.

# Game Description
"Spot the Difference" challenges the player to identify visual differences between two nearly identical images. The game tracks time and the number of remaining differences. Players win when all differences are found.

# Project Structure
project/ │ ├── index.html # Main HTML file ├── script.js # JavaScript logic ├── style.css # Game styling └── Images/ ├── Spot-the-Difference-1.jpg └── Spot-the-Difference-2.jpg

#How to Run the Game
Clone or Download the Repository

git clone https://github.com/NishantSingh2964/Spot-the-Difference.git
cd Spot-the-Difference
Open index.html in Your Browser

You can double-click index.html or open it via a local server:
# Using Python's simple HTTP server
python3 -m http.server
Then go to http://localhost:8000 in your browser.
Play the Game

Click on the areas in either image to spot differences.
Use the “Show Hints” button if you get stuck.
The timer tracks how long you take.
Click “New Game” to restart.
# How the JSON is Used
The game logic is built around a JSON-like configuration object in the JavaScript file:

const jsonConfig = {
    "gameTitle": "Spot the Difference",
    "images": {
        "image1": "Images/Spot-the-Difference-1.jpg",
        "image2": "Images/Spot-the-Difference-2.jpg"
    },
    "differences": [
        { "x": 124, "y": 235, "width": 50, "height": 50 },
        ...
    ]
};

 #Purpose of JSON Configuration:
Title: Sets the game title dynamically.

Images: Specifies the paths for the two images to be used in the game.

Differences: Defines the clickable areas (x, y, width, height) that represent the correct differences between the two images.

The game reads this object at runtime and:

Loads the image sources into the HTML <img> elements.

Tracks clicks to check if they fall within one of the defined difference rectangles.

Marks correct clicks with visual indicators.

Tracks and updates the score and timer based on player performance.



Let me know if you'd like it.
