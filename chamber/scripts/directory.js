import { loadMembers, createMemberCard } from './members.mjs';

const listButton = document.querySelector('#list-toggle');
const cardSection = document.querySelector('#member-cards');
const listSection = document.querySelector('#members-list');

if (listButton) {
    listButton.addEventListener('click', () => {
        listButton.classList.toggle('active');
        if (cardSection) cardSection.classList.toggle('active');
    });
}

async function loadCompanyCards() {
    try {
        const members = await loadMembers();
        members.forEach(company => {
            const card = createMemberCard(company, true); // include level
            if (cardSection) cardSection.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

loadCompanyCards();