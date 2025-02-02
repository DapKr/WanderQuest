function searchLocation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.innerHTML = '';
    const resultContainer = document.getElementById('searchResults'); // Get the parent element
    resultContainer.appendChild(resultDiv);

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
    console.log("accessed file")
        .then(data => {
            if (input.includes('beach')) {
                data.beaches.forEach(beach => {
                    resultsDiv.innerHTML += `<div><h3>${beach.name}</h3><p>${beach.description}</p></div>`;
                });
            } else if (input.includes('temple')) {
                data.temples.forEach(temple => {
                    resultsDiv.innerHTML += `<div><h3>${temple.name}</h3><p>${temple.description}</p></div>`;
                });
            } else {
                const foundCountry = data.countries.find(country =>
                    country.name.toLowerCase() === input
                );
                if (foundCountry) {
                    foundCountry.cities.forEach(city => {
                        resultsDiv.innerHTML += `<div><h3>${city.name}</h3><p>${city.description}</p></div>`;
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No results found.</p>'; // No matches
                }
            }
        })
        /*const country = data.countries.find(item => item.name.toLowerCase() === input);
        const city = data.cities.find(item => item.name.toLowerCase() === input);
        const temple = data.temples.find(item => item.name.toLowerCase() === input);
        const beach = data.beaches.find(item => item.name.toLowerCase() === input);
        console.log ("accessed file and data")*/



        /*if (country) {
            const name = countries.name.join(', ');
            const image = countries.imageUrl.join(', ');
            const description = countries.description.join(', ');

            resultDiv.innerHTML += `<h2>${countries.name}</h2>`;
            resultDiv.innerHTML += `<img src="${ountries.imageUrl}" alt="picture of location">`;
            resultDiv.innerHTML += `<p>${countries.description}</p>`;

            resultDiv.innerHTML += `<p><strong>Name:</strong> ${name}</p>`;
            resultDiv.innerHTML += `${image}</p>`;
            resultDiv.innerHTML += `<p><strong>About:</strong> ${description}</p>`;

            console.log (resultDiv);
        } else {
            resultDiv.innerHTML = 'Condition not found.';
        }
    })*/
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}
btnSearch.addEventListener('click', searchLocation);