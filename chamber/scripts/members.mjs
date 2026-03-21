export async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to fetch members data');
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error('Error loading members:', error);
        return [];
    }
}

export function createMemberCard(company, includeLevel = false) {
    const card = document.createElement('section');
    card.className = 'member-card';

    const levelInfo = includeLevel ? `<p><strong>Member Level:</strong> ${company.membership_level}</p>` : '';

    card.innerHTML = `
        <img loading="lazy" src="images/${company.image}" alt="${company.name} logo" width="50" height="50">
        <h3>${company.name}</h3>
        <p><strong>Address:</strong> ${company.address}</p>
        <p><strong>Phone:</strong> ${company.phone}</p>
        <a href="${company.website}" target="_blank">Visit Website</a>
        ${levelInfo}
    `;

    return card;
}

export function displayTopMembers(container) {
    loadMembers().then(members => {
        const topMembers = members.filter(member => member.membership_level === 3);
        //randomize the top members and select 3 to display
        const randomTopMembers = topMembers
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        randomTopMembers.forEach(member => {
            const card = createMemberCard(member);
            container.appendChild(card);
        });
    });
}