// Weather Stack API Info
const apiKey = '92060bb649c09fa96a7eff438c069c89';
const forecastUrl = 'http://api.weatherstack.com/current';

// Variables to obtain location of sections on the webpage
const inputZip = document.querySelector('#input');
const inputButton = document.querySelector('#submit');
const temperatureField = document.querySelector('#temperatureField');
const commentsField = document.querySelector('#comments');
const favoritesField = document.querySelector('#favorites');

let zipString = '';
let zipArray = [];
let zipIndex = 0;

// getForecast function makes the API call to Weatherstack to obtain current
// temperature and the local time for the input zip code.

const getForecast = async () => {
  const zip = inputZip.value;
  const urlToFetch = forecastUrl + '?access_key=' + apiKey + '&query=' + zip
  + '&units=f';
  try {
      const response = await fetch(urlToFetch);
      if (response.ok) {
        const jsonResponse = await response.json();
        const currentTemp = jsonResponse.current.temperature;
        const currentCity = jsonResponse.location.name;
        const currentTime = jsonResponse.location.localtime;
        const weatherTemp = createString(zip, currentCity, currentTemp,
        currentTime);
        temperatureField.append(weatherTemp);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

// createTempHTML function creates the string of temperature, local date/time,
// and comments to return to the page.

const createString = (zip, city, temperature, localtime) => {
  const comments = commentsField.value;
  zipString = `For Zip Code: ${zip} - ${city},
    Current Temperature: ${temperature}, Local date/time: ${localtime},
    Comments: ${comments}`;
  return zipString;
}

// displayTemperature function gets and returns the zip, city, temperature,
// and the local date/time to the webpage.

const displayTemperature = (event) => {
  event.preventDefault();
  temperatureField.innerHTML = '';
  getForecast();
  return;
}

// addFavorites function adds the output from the API to the favorites section.

const addFavorites = (event) => {
  event.preventDefault();
  zipArray.push(zipString);
  favoritesField.innerHTML = 'Result has been added to favorites';
  return;
}

// viewFavorites function displays the favorites on the page.

const viewFavorites = (event) => {
  event.preventDefault();
  const favElement = document.getElementById("favorites");
  favoritesField.innerHTML = '';
  if (zipArray.length === 0) {
    favoritesField.innerHTML = 'There are no favorites to view';
  } else {
    for (zipIndex = 0; zipIndex < zipArray.length; zipIndex++) {
      let zipIndexDisplay = zipIndex + 1;
      let favPara = document.createElement("p");
      let favText = document.createTextNode(`${zipIndexDisplay}.
        ${zipArray[zipIndex]}`);
      favPara.appendChild(favText);
      favElement.appendChild(favPara);
    }
  }
  return;
}

// clearFavorites function clears the Favorites section.

const clearFavorites = (event) => {
  event.preventDefault();
  if (zipArray.length === 0) {
    favoritesField.innerHTML = 'There are no favorites to clear';
  } else {
    zipArray = [];
    favoritesField.innerHTML = 'Favorites have been cleared';
  }
  return;
}

// updateFavorites function updates a specific favorite with the output from
// the WeatherStack API

const updateFavorites = (event) => {
  event.preventDefault();
  const updateField = document.querySelector('#updateInput');
  const updateNumber = updateField.value;
  zipArray[updateNumber - 1] = zipString;
  return
}

// deleteFavorites function deletes a specific favorite from the output.

const deleteFavorites = (event) => {
  event.preventDefault();
  const deleteField = document.querySelector('#delInput');
  const deleteNumber = deleteField.value;
  zipArray.splice(deleteNumber - 1, 1);
  return
}

submit.addEventListener('click', displayTemperature);
addFav.addEventListener('click', addFavorites);
viewFav.addEventListener('click', viewFavorites);
clearFav.addEventListener('click', clearFavorites);
updateFav.addEventListener('click', updateFavorites);
deleteFav.addEventListener('click', deleteFavorites);
