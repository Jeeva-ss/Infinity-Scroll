const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
const count = 10;

const apiKey1 = 'Xlb5NbESEpRlrNYH8YksLvlQ4e98fPc-o4ack27frPU';
const apiKey2 = 'IH4MT-M7KA2QhjAGz9hzc6HufNP0KajW7H1_oVLQ980';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey1 ? apiKey1 : apiKey2}&count=${count}&query=${'sex || sexy || sensual || erotic || bikini'}&orientation=${'portrait'}`;

function displayPhotos() {
  photosArray.forEach((photo) => {
    // 'a' tag
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target', '_blank');
    // 'img' tag
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);
    // nesting images inside anchor tag
    item.appendChild(img);
    // nesting anchor tag inside container
    imageContainer.appendChild(img);
  })
}

const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    imageContainer.innerHTML = `<h1>Comeback later...</h1>`
  }
}

// On Load
getPhotos();
