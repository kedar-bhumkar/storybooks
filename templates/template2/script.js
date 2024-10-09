
var chValue = "";
// Function to get URL parameter
 function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }


async function loadMetadata() {
    chValue = getUrlParameter('ch');

    if (!chValue) {
      chValue = "test";    
    }
    const response = await fetch(`../../metadata/${chValue}/mapping.json`);
    return await response.json();
}

function createImageElement(imagePath, description, isLeft) {
    const container = document.createElement('div');
    container.className = `image-container ${isLeft ? 'left' : 'right'}`;

    const img = document.createElement('img');
    img.src = `../../metadata/${chValue}/images/${imagePath}`;
    img.alt = description || 'Image from The Watchman';
    img.onclick = () => openModal(img.src);

    const p = document.createElement('p');
    p.textContent = description || '';

    container.appendChild(img);
    container.appendChild(p);

    return container;
}

function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
}

async function initializeGallery() {
    const metadata = await loadMetadata();
    const titleElement = document.getElementById('title');
    const contentElement = document.getElementById('content');

    titleElement.textContent = metadata.title;

    metadata.data.forEach((item, index) => {
        const isLeft = Math.random() < 0.5;
        const imageElement = createImageElement(item.main_img, item.info, isLeft);
        contentElement.appendChild(imageElement);
    });

    // Set up modal close functionality
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = closeModal;

    // Close modal when clicking outside the image
    window.onclick = (event) => {
        const modal = document.getElementById('imageModal');
        if (event.target == modal) {
            closeModal();
        }
    };
}

document.addEventListener('DOMContentLoaded', initializeGallery);
