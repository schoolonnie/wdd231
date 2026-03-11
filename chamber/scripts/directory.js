const listbutton = document.querySelector('#list-toggle');
const cardsection = document.querySelector('#member-cards')
const listsection = document.querySelector('#members-list')

listbutton.addEventListener('click', () => {
    listbutton.classList.toggle('active');
    cardsection.classList.toggle('active');
}); 

async function loadCompanyCards() {
    try {
        const response = await fetch('data/members.json');
        
        const data = await response.json(); 

        data.members.forEach(company => {
            const card = document.createElement('section');
            card.className = "member-card";
            
            card.innerHTML = `
                <img loading="lazy" class="card-img" src="images/${company.image}" alt="${company.name} logo" width="50" height="50">
                <h3>${company.name}</h3>
                <p><strong>Address:</strong> ${company.address}</p>
                <p><strong>Phone:</strong> ${company.phone}</p>
                <a href="${company.website}" target="_blank">Visit Website</a>
                <p><strong>Member Level:</strong> ${company.membership_level}</p>
            `;
            
            cardsection.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

loadCompanyCards();