const navbutton = document.querySelector('#ham-btn');
const navlinks = document.querySelector('#nav-bar');


navbutton.addEventListener('click', () => {
    navbutton.classList.toggle('open');
    navlinks.classList.toggle('open');
});