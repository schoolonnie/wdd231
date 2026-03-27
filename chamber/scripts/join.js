const now = new Date();
const formattedDateTime = now.toISOString();
const membershipDetails = document.getElementById('membership-details');
const npButton = document.getElementById('np-btn');
const bronzeButton = document.getElementById('bronze-btn');
const silverButton = document.getElementById('silver-btn');
const goldButton = document.getElementById('gold-btn');
const displayInfo = document.getElementById('display-info');
const timestampElement = document.getElementById('timestamp');

if (timestampElement) {
    timestampElement.value = formattedDateTime;
}
const membershipDescriptions = [
    { value: "np", name: "Non-Profit", description: "This is for non-profit organizations.", perks: ["Access to community resources", "Networking opportunities", "Discounts on events", "!! No James Included !!"] },
    { value: "bronze", name: "Bronze", cost: "$25/month", description: "Bronze membership description.", perks: ["Access to member directory", "Discounts on events", "VIP pass to James meeting event"] },
    { value: "silver", name: "Silver", cost: "$50/month", description: "Silver membership description.", perks: ["Access to member directory", "Discounts on events", "Priority customer service", "VIP pass to James meeting event", "One FREE James"] },
    { value: "gold", name: "Gold", cost: "$100/month", description: "Gold membership description.", perks: ["Access to member directory", "Discounts on events", "Priority customer service", "Exclusive networking events", "VIP pass to James meeting event", "Five FREE James", "Meet the One True James who started this commerce (Disclaimer: not actually named James)"] }
];

function displayMembershipDetails(level) {
    membershipDetails.innerHTML = '';
    membershipDetails.innerHTML = `
        <button id="closeModal">❌</button>
        <p><strong>Level</strong>: ${membershipDescriptions.find(m => m.value === level)?.name}</p>
        <p><strong>Cost</strong>: ${membershipDescriptions.find(m => m.value === level)?.cost || 'N/A'}</p>
        <p><strong>Description</strong>: ${membershipDescriptions.find(m => m.value === level)?.description}</p>
        <p><strong>Perks</strong>:<br>-- ${membershipDescriptions.find(m => m.value === level)?.perks.join('<br>-- ')}</p>
    `;
    membershipDetails.showModal();
  
    const closeModal = membershipDetails.querySelector('#closeModal');
    closeModal.addEventListener("click", () => {
        membershipDetails.close();
    });
}

function displaySubmittedInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstname');
    const lastName = urlParams.get('lastname');
    const email = urlParams.get('email');
    const phone = urlParams.get('phone');
    const businessName = urlParams.get('business-name');
    const membership = urlParams.get('member-level');
    const timestamp = urlParams.get('timestamp');

    displayInfo.innerHTML = `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business Name:</strong> ${businessName}</p>
        <p><strong>Membership Level:</strong> ${membership}</p>
        <p><strong>Submitted At:</strong> ${new Date(timestamp).toLocaleString()}</p>
    `;
}


if (membershipDetails) {
    const attach = (btn, level) => {
        if (!btn) return;
        btn.addEventListener('click', () => displayMembershipDetails(level));
    };

    attach(npButton, 'np');
    attach(bronzeButton, 'bronze');
    attach(silverButton, 'silver');
    attach(goldButton, 'gold');
}

// Call displaySubmittedInfo if on the thankyou page
if (displayInfo) {
    displaySubmittedInfo();
}