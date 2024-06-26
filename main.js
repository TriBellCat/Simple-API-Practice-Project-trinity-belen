//Creates a new worker
const worker = new Worker('worker.js');

async function generateCat() {
    //Gets user information from what they input
    const imageLimit = document.getElementById("limit").value;
    const breedsInput = document.getElementById("breed_ids").value;
    const apiKey = document.getElementById("apiKey").value;

    //Splits the input string into an array of breeds
    const breeds = breedsInput.split(',');

    //Sets up the division for the cat images 
    const catImagesDiv = document.getElementById('cat-images');
    catImagesDiv.innerHTML = '';

    //Posts a message to the web worker
    worker.postMessage({ breeds, imageLimit, apiKey });

    //Listens for messages from the web worker
    worker.onmessage = (event) => {
        const catDataArrays = event.data;
        for (let catData of catDataArrays) {
            catData.forEach(cat => {
                const img = document.createElement('img');
                img.src = cat.url;
                img.alt = 'A random cat';
                catImagesDiv.appendChild(img);
            });
        }
    };
}

document.getElementById('generate-cat').addEventListener('click', generateCat);

document.getElementById("limit").value = "20";
document.getElementById("breed_ids").value = "beng, abys";

