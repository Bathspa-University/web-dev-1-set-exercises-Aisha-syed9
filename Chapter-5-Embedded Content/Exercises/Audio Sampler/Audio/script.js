// Get DOM elements
const soundboard = document.getElementById('soundboard');
const textToSpeechInput = document.getElementById('text-to-speech-input');
const textToSpeechButton = document.getElementById('text-to-speech-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');

// Array of sample names and file paths
const samples = [
    { name: 'ah-ha', path: 'ah-ha.mp3' },
    { name: 'back-of-the-net', path: 'back-of-the-net.mp3' },
    { name: 'bangoutodorder', path: 'bangoutoforder.mp3' },
    { name: 'dan', path: 'dan.mp3' },
    { name: 'emailoftheevening', path: 'emailoftheevening.mp3' },
    { name: 'hellopartridge', path: 'hellopartridge.mp3' },
    { name: 'iateascotchegg', path: 'iateascotchegg.mp3' },
    { name: 'imconfused', path: 'imconfused.mp3' },

    // Add more samples here...
];

// Function to create and play audio elements
function createAudio(sample) {
    const audio = new Audio(sample.path);
    audio.play();
}

// Function to create sound buttons
function createSoundButtons() {
    samples.forEach(sample => {
        // Create button element
        const button = document.createElement('button');
        button.classList.add('sound-button');
        button.textContent = sample.name; // Set button text to sample name
        button.addEventListener('click', () => createAudio(sample)); // Add click event listener to play audio
        soundboard.appendChild(button); // Append button to soundboard
    });
}

// Text to Speech feature
textToSpeechButton.addEventListener('click', () => {
    const text = textToSpeechInput.value.trim(); // Get text from input
    if (text !== '') {
        const utterance = new SpeechSynthesisUtterance(text); // Create speech synthesis utterance
        speechSynthesis.speak(utterance); // Speak the text
    }
});

// Pagination
const itemsPerPage = 9;
let currentPage = 1;

// Function to update pagination buttons based on current page
function updatePaginationButtons() {
    if (currentPage === 1) {
        prevPageButton.style.display = 'none'; // Hide previous page button on first page
    } else {
        prevPageButton.style.display = 'inline-block'; // Show previous page button otherwise
    }

    const totalPages = Math.ceil(samples.length / itemsPerPage);
    if (currentPage === totalPages) {
        nextPageButton.style.display = 'none'; // Hide next page button on last page
    } else {
        nextPageButton.style.display = 'inline-block'; // Show next page button otherwise
    }
}

// Function to display samples for a given page
function displaySamples(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageSamples = samples.slice(startIndex, endIndex); // Get samples for current page

    soundboard.innerHTML = ''; // Clear existing buttons

    pageSamples.forEach(sample => {
        // Create button for each sample
        const button = document.createElement('button');
        button.classList.add('sound-button');
        button.textContent = sample.name; // Set button text to sample name
        button.addEventListener('click', () => createAudio(sample)); // Add click event listener to play audio
        soundboard.appendChild(button); // Append button to soundboard
    });

    updatePaginationButtons(); // Update pagination buttons
}

// Event listeners for pagination buttons
prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displaySamples(currentPage); // Display previous page samples
    }
});

nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(samples.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displaySamples(currentPage); // Display next page samples
    }
});

// Initial display
displaySamples(currentPage); // Display samples for initial page
