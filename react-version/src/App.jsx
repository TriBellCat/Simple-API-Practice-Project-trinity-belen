import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [imageLimit, setImageLimit] = useState(20);
  const [breedIds, setBreedIds] = useState('beng, abys');
  const [apiKey, setApiKey] = useState('');
  const [catImages, setCatImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateCat = async () => {
    if (!apiKey) {
      setError('API key is required.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const breeds = breedIds.split(',');
      const limitPerBreed = Math.floor(imageLimit / breeds.length);
      const promises = breeds.map(async (breed) => {
        const apiUrl = `https://api.thecatapi.com/v1/images/search?limit=${limitPerBreed}&breed_ids=${breed.trim()}&api_key=${apiKey}`;
        const response = await fetch(apiUrl);
        const catData = await response.json();
        return catData;
      });
  
      const catDataArrays = await Promise.all(promises);
      setCatImages(catDataArrays.flat());
    } 
    catch (error) {
      setError(error);
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Cat API</h1>

      <label htmlFor="limit">Image Limit: </label>
      <input
        type="number"
        id="limit"
        value={imageLimit}
        onChange={(e) => setImageLimit(e.target.value)}
      />
      <br />

      <label htmlFor="breed_ids">Breed Ids: </label>
      <input
        type="text"
        id="breed_ids"
        value={breedIds}
        onChange={(e) => setBreedIds(e.target.value)}
      />
      <br />

      <label htmlFor="apiKey">API Key: </label>
      <input
        type="password"
        id="apiKey"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <br />

      <button onClick={handleGenerateCat} disabled={isLoading}>
        Generate Cat
      </button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {catImages.length > 0 && (
        <div id="cat-images">
          {catImages.map((catImage) => (
            <img key={catImage.id} src={catImage.url} alt="A random cat" />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;