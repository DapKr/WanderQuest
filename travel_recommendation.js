function createResultDiv(container, imageUrl, innerContent, button) {
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result';
    
    // Create an image element
    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    resultDiv.appendChild(imageElement);

    // Create a separate inner div for the text content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'resultContent';
    contentDiv.innerHTML = innerContent;
    resultDiv.appendChild(contentDiv);

    // Create a visit button
    const visitBtn = document.createElement('button');
    visitBtn.className = 'secondaryBtn';
    visitBtn.textContent = 'Visit';
    contentDiv.appendChild(visitBtn);

    container.appendChild(resultDiv);
}

function getLocalTime(timeZone) {
    const currentUtc = moment.utc(); // Current time in UTC
    const localDate = currentUtc.tz(timeZone); // Convert to local time
    const formattedDate = localDate.format('ddd, MMM D, YYYY'); // Format date
    const formattedTime = localDate.format('HH:mm:ss'); // Format time
    return { formattedDate, formattedTime }; // Return both formatted date and time
}

function searchLocation() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultContainer = document.getElementById('searchResults');
    resultContainer.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => {
            console.log("Accessed file");
            return response.json();
        })
        .then(data => {
            let foundResults = false; // Flag to check if we found any results

            if (input.includes('beach')) {
                data.beaches.forEach(beach => {
                    foundResults = true;
                    const { formattedDate, formattedTime } = getLocalTime(beach.timeZone);
                    createResultDiv(resultContainer, beach.imageUrl, `<h3>${beach.name}</h3><p>${beach.description}</p><p>${formattedDate} ${formattedTime}</p>`);
                });
            } else if (input.includes('temple')) {
                data.temples.forEach(temple => {
                    foundResults = true;
                    const { formattedDate, formattedTime } = getLocalTime(temple.timeZone);
                    createResultDiv(resultContainer, temple.imageUrl, `<h3>${temple.name}</h3><p>${temple.description}</p><p>${formattedDate} ${formattedTime}</p>`);
                });
            } else if (input.includes('country')) {
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        foundResults = true;
                        const { formattedDate, formattedTime } = getLocalTime(city.timeZone);
                        createResultDiv(resultContainer, city.imageUrl, `<h3>${city.name}</h3><p>${city.description}</p><p>${formattedDate} ${formattedTime}</p>`);
                    });
                });
            } else {
                const foundCountry = data.countries.find(country =>
                    country.name.toLowerCase() === input
                );
                if (foundCountry) {
                    foundResults = true;
                    foundCountry.cities.forEach(city => {
                        const { formattedDate, formattedTime } = getLocalTime(city.timeZone);
                        createResultDiv(resultContainer, city.imageUrl, `<h3>${city.name}</h3><p>${city.description}</p><p>${formattedDate} ${formattedTime}</p>`);
                    });
                }
            }

            if (!foundResults) {
                const noResultDiv = document.createElement('div');
                noResultDiv.className = 'noResult';
                noResultDiv.innerHTML = 'No results found';
                resultContainer.appendChild(noResultDiv);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            const errorResultDiv = document.createElement('div');
            errorResultDiv.className = 'noResult';
            errorResultDiv.innerHTML = 'An error occurred while fetching data.';
            resultContainer.appendChild(errorResultDiv);
        });
}

btnSearch.addEventListener('click', searchLocation);

function clearSearch() {
    const inputText = document.getElementById('searchInput');
    inputText.value="";
}

btnClear.addEventListener('click', clearSearch);
