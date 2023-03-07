const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let queryText = document.getElementById("queryText");
const button = document.getElementById("button");
const formContainer = document.getElementById("formContainer");

let ready = false;
let totalImages = 0;
let imagesLoaded = 0;
let photosArray = [];
let count = 30;


// Unsplash API calls
const apiKey = `pbEEymJJJQa6o_nImyLFOqjUHVkV8ShVn-1Y1pcCW9k`;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${'nature'}&orientation=${`portrait`}`;

// To check if all the photos are already
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Display function
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
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

// window.addEventListener("scroll", () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
//     ready = false;
//     getPhotos();
//   }
// });

// Searches for photos
formContainer.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(queryText.value)
  let x = queryText.value
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${x}&orientation=${`portrait`}`
  getPhotos()
  queryText.value = ''
  imageContainer.innerHTML = ''
})

// On Load
getPhotos();