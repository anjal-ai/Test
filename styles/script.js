// Array of image paths
const images = [
    "assets/Image2.avif",
    "assets/Image2.avif",
    "assets/Image3.avif",
    "assets/Image4.avif"
];

// Get the hero image element
const heroImage = document.getElementById("hero-image");

let currentIndex = 0;
function changeHeroImage() {
    heroImage.classList.add("hidden");

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        heroImage.src = images[currentIndex];
        heroImage.classList.remove("hidden");
    }, 1000);
}

// Change the image every 5 seconds
setInterval(changeHeroImage, 5000);
