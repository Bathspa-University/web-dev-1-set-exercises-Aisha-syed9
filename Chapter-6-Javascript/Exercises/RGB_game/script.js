document.addEventListener('DOMContentLoaded', function() {
    // Getting references to various elements in the document
    const startButton = document.getElementById('startButton');
    const gameContent = document.getElementById('gameContent');
    const rgbValue = document.getElementById('rgbValue');
    const colorOptions = document.getElementById('colorOptions');
    const message = document.getElementById('message');
    const score = document.getElementById('score');
    const restartButton = document.getElementById('restartButton');

    let correctColor; // Variable to store the correct RGB color
    let lives = 3; // Number of lives the player has
    let playerScore = 0; // Player's current score

    // Function to generate a random RGB color
    function generateColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Function to display colors for the game
    function displayColors() {
        // Generating a new correct color for the player to guess
        correctColor = generateColor();
        // Displaying the correct RGB value for the player to see
        rgbValue.textContent = correctColor;
        // Clearing previous color options
        colorOptions.innerHTML = '';
        // Array to store color options
        const options = [];
        options.push(correctColor); // Adding the correct color to the options
        // Adding two more random colors to the options
        for (let i = 0; i < 2; i++) {
            let option = generateColor();
            // Ensuring no duplicate options
            while (options.includes(option)) {
                option = generateColor();
            }
            options.push(option);
        }
        // Shuffling the options for random order
        options.sort(() => Math.random() - 0.5);
        // Creating HTML elements for each color option
        options.forEach(color => {
            const div = document.createElement('div');
            div.classList.add('option');
            div.style.backgroundColor = color;
            // Adding event listener to check answer when clicked
            div.addEventListener('click', () => checkAnswer(color));
            colorOptions.appendChild(div);
        });
    }

    // Function to check player's answer
    function checkAnswer(color) {
        // If player's guess matches the correct color
        if (color === correctColor) {
            // Increase score
            playerScore++;
            // Display correct message
            message.textContent = 'Correct!';
        } else {
            // Decrease lives
            lives--;
            // If no lives left, end game
            if (lives === 0) {
                gameOver();
            } else {
                // Display incorrect message with remaining lives
                message.textContent = `Incorrect! Lives left: ${lives}`;
            }
        }
        // Update score display
        updateScore();
        // Display new set of colors
        displayColors();
    }

    // Function to update score display
    function updateScore() {
        // Update displayed score with current score value
        score.textContent = `Score: ${playerScore}`;
    }

    // Function to handle game over scenario
    function gameOver() {
        // Display game over message with final score
        message.textContent = `Game Over! Final Score: ${playerScore}`;
        // Remove event listeners from color options
        document.querySelectorAll('.option').forEach(option => {
            option.removeEventListener('click', checkAnswer);
        });
        // Display restart button
        restartButton.style.display = 'block';
    }

    // Event listener for restart button click
    restartButton.addEventListener('click', () => {
        // Reset lives and score
        lives = 3;
        playerScore = 0;
        // Update score display
        updateScore();
        // Display new set of colors
        displayColors();
        // Reset message display
        message.textContent = '';
        // Hide restart button
        restartButton.style.display = 'none';
    });

    // Event listener for start button click
    startButton.addEventListener('click', () => {
        // Hide start button
        startButton.style.display = 'none';
        // Display game content
        gameContent.style.display = 'block';
        // Initialize score display
        updateScore();
        // Display initial set of colors
        displayColors();
    });
});
