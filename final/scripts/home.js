const gallery = document.getElementById('image-gallery');
const galleryImages = Array.from(document.querySelectorAll('#image-gallery .gallery img'));
const prevButton = document.getElementById('gallery-prev');
const nextButton = document.getElementById('gallery-next');
let currentIndex = 0;

function updateGallery() {
    galleryImages.forEach((img, index) => {
        img.classList.toggle('visible', index === currentIndex);
        img.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
    });
}

function showPreviousImage() {
    currentIndex = (currentIndex + galleryImages.length - 1) % galleryImages.length;
    updateGallery();
}

function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGallery();
}

if (galleryImages.length) {
    updateGallery();
}

prevButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showPreviousImage();
});

nextButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showNextImage();
});

window.addEventListener('keydown', (event) => {
    if (!gallery.contains(document.activeElement)) return;
    if (event.key === 'ArrowLeft') {
        showPreviousImage();
    }
    if (event.key === 'ArrowRight') {
        showNextImage();
    }
});