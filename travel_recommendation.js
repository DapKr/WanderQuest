function createResultDiv(container, innerHTML) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    resultDiv.innerHTML = innerHTML;
    container.appendChild(resultDiv);
}

function searchLocation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultContainer = document.getElementById('searchResults');
    resultContainer.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => {
            console.log("accessed file");
            return response.json();
        })
        .then(data => {
            let foundResults = false; // Flag to check if we found any results

            if (input.includes('beach')) {
                data.beaches.forEach(beach => {
                    foundResults = true;
                    createResultDiv(resultContainer, `<h3>${beach.name}</h3><p>${beach.description}</p>`);
                });
            } else if (input.includes('temple')) {
                data.temples.forEach(temple => {
                    foundResults = true;
                    createResultDiv(resultContainer, `<h3>${temple.name}</h3><p>${temple.description}</p>`);
                });
            } else {
                const foundCountry = data.countries.find(country =>
                    country.name.toLowerCase() === input
                );
                if (foundCountry) {
                    foundResults = true;
                    foundCountry.cities.forEach(city => {
                        createResultDiv(resultContainer, `<h3>${city.name}</h3><p>${city.description}</p>`);
                    });
                }
            }

            if (!foundResults) {
                createResultDiv(resultContainer, '<p>No results found.</p>');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            createResultDiv(resultContainer, 'An error occurred while fetching data.');
        });
}

btnSearch.addEventListener('click', searchLocation);