const gallery = document.getElementById('image-gallery');
const galleryImages = Array.from(document.querySelectorAll('#image-gallery .gallery img'));
const prevButton = document.getElementById('gallery-prev');
const nextButton = document.getElementById('gallery-next');
const galleryHint = document.getElementById('gallery-hint');
let currentIndex = 0;

function updateGallery() {
    galleryImages.forEach((img, index) => {
        img.classList.toggle('visible', index === currentIndex);
        img.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
    });

    galleryHint.textContent = gallery.classList.contains('open')
        ? `Image ${currentIndex + 1} of ${galleryImages.length}`
        : 'Click the image to open the gallery';
}

function openGallery() {
    gallery.classList.add('open');
    updateGallery();
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

gallery.addEventListener('click', (event) => {
    const firstImageWrapper = event.target.closest('#first-image');
    if (firstImageWrapper && !gallery.classList.contains('open')) {
        openGallery();
    }
});

prevButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showPreviousImage();
});

nextButton.addEventListener('click', (event) => {
    event.stopPropagation();
    showNextImage();
});

window.addEventListener('keydown', (event) => {
    if (!gallery.classList.contains('open')) return;
    if (event.key === 'ArrowLeft') {
        showPreviousImage();
    }
    if (event.key === 'ArrowRight') {
        showNextImage();
    }
});