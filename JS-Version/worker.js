self.onmessage = async (event) => {
    const { breeds, imageLimit, apiKey } = event.data;
    const limitPerBreed = Math.floor(imageLimit / breeds.length);
    const promises = breeds.map(async (breed) => {
        const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limitPerBreed}&breed_ids=${breed.trim()}&api_key=${apiKey}`;
        const response = await fetch(apiUrl);
        const catData = await response.json();
        return catData;
    });

    //Responds back to the main script
    Promise.all(promises).then((catDataArrays) => {
        self.postMessage(catDataArrays);
    });

    //Gets the result of the first fulfilled promise
    Promise.any(promises).then((firstFulfilledPromise) => {
        console.log(firstFulfilledPromise);
    }).catch((error) => {
        console.log(error);
    });
};
