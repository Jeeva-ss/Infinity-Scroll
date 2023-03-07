const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];
let count = 5;

const apiKey = `pbEEymJJJQa6o_nImyLFOqjUHVkV8ShVn-1Y1pcCW9k`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${`nature`}&orientation=${`portrait`}`;

// check images are loaded or not
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    totalImages === 5 ? count = 10 : ' ';
  }
}

// helper function
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
      target: "_blank",
    });
    // 'img' tag
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // on load event
    img.addEventListener("load", imageLoaded);
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
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    imageContainer.innerHTML = `<h1>Comeback later...</h1>`;
  }
};

// load more on scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
