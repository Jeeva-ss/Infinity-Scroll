const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];
const count = 30;

const apiKey = "L_o6kXmKGlReJ6txXZYJ8vLxaF73lP6KJMtCtBXPfFg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${"nature"}&orientation=${"portrait"}`;

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // 'a' tag
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // 'img' tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener('load', imageLoaded);
    // nesting images inside anchor tag
    item.appendChild(img);
    // nesting anchor tag inside container
    imageContainer.appendChild(item);
  });
}

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    imageContainer.innerHTML = `<h1>Comeback later...</h1>`;
  }
};

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// On Load
getPhotos();
