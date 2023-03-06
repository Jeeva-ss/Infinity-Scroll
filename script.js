const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];
const count = 30;

const apiKey1 = "Xlb5NbESEpRlrNYH8YksLvlQ4e98fPc-o4ack27frPU";
const apiKey2 = "IH4MT-M7KA2QhjAGz9hzc6HufNP0KajW7H1_oVLQ980";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey1 ? apiKey1 : apiKey2}&count=${count}&query=${`nature || car || bus || food`}&orientation=${"portrait"}`;

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
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

// On Load
getPhotos();
