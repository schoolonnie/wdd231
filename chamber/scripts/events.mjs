import {events} from "../data/discover.mjs";

const eventsSection = document.getElementById("events-section");
const lastVisitElement = document.getElementById("last-visit");

// Display last visit time
const lastVisit = localStorage.getItem("lastVisit");
const daysSince = lastVisit ? Math.floor((Date.now() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)) : null;

// Store current visit time
localStorage.setItem("lastVisit", new Date().toISOString());

// Update last visit message
if (daysSince < 1) {
    lastVisitElement.textContent = "Back so soon? Awesome!";
} else if (!lastVisit) {
    lastVisitElement.textContent = "Welcome! Let us know if you have any questions.";
} else {
    lastVisitElement.textContent = `You last visited ${daysSince} days ago.`;
}

// Create event cards
events.forEach(event => {
    const eventCard = document.createElement("div");
    eventCard.classList.add("event-card");

    const figure = document.createElement("figure");
    const eventImage = document.createElement("img");
    eventImage.src = `images/${event.image}`;
    eventImage.loading = "lazy";
    eventImage.alt = event.name;
    eventImage.width = 300;
    eventImage.height = 200;
    eventImage.classList.add("event-image");
    figure.appendChild(eventImage);
    eventCard.appendChild(figure);

    const eventTitle = document.createElement("h2");
    eventTitle.textContent = event.name;
    eventCard.appendChild(eventTitle);

    const eventAddress = document.createElement("address");
    eventAddress.textContent = event.address;
    eventCard.appendChild(eventAddress);

    const eventDescription = document.createElement("p");
    eventDescription.textContent = event.description;
    eventCard.appendChild(eventDescription);

    const learnMoreButton = document.createElement("button");
    learnMoreButton.textContent = "Learn More";
    eventCard.appendChild(learnMoreButton);
    learnMoreButton.addEventListener("click", () => {
        window.open(event.link, "_blank");
    });

    eventsSection.appendChild(eventCard);
});
