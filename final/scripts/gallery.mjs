// ES Module for Rabbit Gallery
// Data Fetching with Fetch API and error handling
async function fetchRabbits() {
    try {
        // Await the fetch response to resolve before parsing the JSON
        const response = await fetch('data/rabbits.json');
        // If the data is fetched successfully, we return the parsed JSON data. 
        const rabbits = await response.json();
        return rabbits;

        // If we can't fetch the data or parse it, we catch the error and log it, then return an empty array to prevent further errors in the app.
    } catch (error) {
        console.error('Error fetching rabbits:', error);
        return [];
    }
}

// Local Storage for favorites
function getFavorites() {
    const favorites = localStorage.getItem('rabbitFavorites');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('rabbitFavorites', JSON.stringify(favorites));
}

function toggleFavorite(rabbitId) {
    let favorites = getFavorites();
    if (favorites.includes(rabbitId)) {
        favorites = favorites.filter(id => id !== rabbitId);
    } else {
        favorites.push(rabbitId);
    }
    saveFavorites(favorites);
    return favorites.includes(rabbitId);
}

// DOM Manipulation and Event Handling
function createRabbitCard(rabbit) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(rabbit.id);

    const card = document.createElement('div');
    card.className = `rabbit-card ${isFavorite ? 'favorite' : ''}`;
    card.innerHTML = `
        <img src="${rabbit.image}" alt="${rabbit.name}" loading="lazy">
    `;

    card.addEventListener('click', () => openModal(rabbit));
    return card;
}

// Modal Dialog
function openModal(rabbit) {
    const modal = document.getElementById('rabbit-modal');
    const modalImage = document.getElementById('modal-image');
    const modalName = document.getElementById('modal-name');
    const modalBreed = document.getElementById('modal-breed');
    const modalAge = document.getElementById('modal-age');
    const modalWeight = document.getElementById('modal-weight');
    const modalFood = document.getElementById('modal-food');
    const modalPersonality = document.getElementById('modal-personality');
    const favoriteBtn = document.getElementById('favorite-btn');

    modalImage.src = rabbit.image;
    modalImage.alt = rabbit.name;
    modalName.textContent = rabbit.name;
    modalBreed.textContent = rabbit.breed;
    modalAge.textContent = `${rabbit.age} years`;
    modalWeight.textContent = rabbit.weight;
    modalFood.textContent = rabbit.favoriteFood;
    modalPersonality.textContent = rabbit.personality;

    const favorites = getFavorites();
    const isFavorite = favorites.includes(rabbit.id);
    favoriteBtn.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

    favoriteBtn.onclick = () => {
        const nowFavorite = toggleFavorite(rabbit.id);
        favoriteBtn.textContent = nowFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        // Re-display to update order and borders
        displayRabbits();
    };

    modal.showModal();

    // Close modal on outside click or close button
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });

    document.getElementById('close-modal').addEventListener('click', () => {
        modal.close();
    });
}

// Dynamic Content Generation using Array Methods
let cachedRabbits = [];

async function displayRabbits() {
    if (cachedRabbits.length === 0) {
        cachedRabbits = await fetchRabbits();
    }
    const gallery = document.getElementById('rabbit-gallery');

    if (cachedRabbits.length === 0) {
        gallery.innerHTML = '<p>Error loading rabbits. Please try again later.</p>';
        return;
    }

    const favorites = getFavorites();

    // Sort rabbits so favorites appear first
    // We use the spread operator to create a temp new array to avoid changing the original cachedRabbits
    const sortedRabbits = [...cachedRabbits].sort((a, b) => {

        // Create a boolean for whether each of the 2 compared rabbits is a favorite
        const aFav = favorites.includes(a.id);
        const bFav = favorites.includes(b.id);

        // If a is favorited and b isn't, we return -1 to lower the index of a and make it appear first. If b is favorited and a isn't, we return 1 to raise the index of a and make it appear after b. If both are favorited or both aren't, we return 0 to keep their order the same.
        if (aFav && !bFav) return -1;
        if (!aFav && bFav) return 1;
        return 0;
    });

    // Clear gallery
    gallery.innerHTML = '';
    // Use map to create cards - this takes the sortedRabbits array and "maps" the createRabbitCard function to each rabbit, returning an array of cards which we then "spread" into the gallery with append and the spread(...) operator
    const cards = sortedRabbits.map(createRabbitCard);
    gallery.append(...cards);
}

// Initialize the gallery
document.addEventListener('DOMContentLoaded', displayRabbits);