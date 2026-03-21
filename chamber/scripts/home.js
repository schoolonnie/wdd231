import { displayTopMembers } from './members.mjs';

const currentWeather = document.querySelector('#current-weather');
const forecastContainer = document.querySelector('#forecast-container');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-caption');

const apikey = '76e902f939cb3bd915793ae29c6f117d';
const lat = 49.75;
const lon = 6.64;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`;

async function apiFetch() {
    try {
        const currentResponse = await fetch(currentUrl);
        const forecastResponse = await fetch(forecastUrl);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw Error('OpenWeather request failed');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);
    } catch (error) {
        console.error(error);
        currentWeather.textContent = 'Failed to load weather data';
        if (forecastContainer) forecastContainer.textContent = '';
    }
}

function displayCurrentWeather(data) {
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const desc = data.weather[0].description;
    
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    currentWeather.innerHTML = `
        <img src="${iconsrc}" alt="${desc}" width="80" height="80">
        <p><strong>${Math.round(data.main.temp)}°F</strong></p>
        <p>High: ${Math.round(data.main.temp_max)}°F</p>
        <p>Low: ${Math.round(data.main.temp_min)}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${Math.round(data.wind.speed)} mph</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
    `;
}

function displayForecast(forecastData) {
    const byDate = {};

    forecastData.list.forEach((entry) => {
        const day = entry.dt_txt.slice(0, 10);
        // if new date
        if (!byDate[day]) {
            byDate[day] = {
                min: entry.main.temp_min,
                max: entry.main.temp_max,
                icon: entry.weather[0].icon,
                description: entry.weather[0].description,
            };
        } else { // if seen date, update
            byDate[day].min = Math.min(byDate[day].min, entry.main.temp_min);
            byDate[day].max = Math.max(byDate[day].max, entry.main.temp_max);
        }
    });

    // slice up organized by-date-data to get the next 3 days (including today)
    const dates = Object.keys(byDate).slice(0, 3);
    // construct HTML for each day and insert into forecast container
    forecastContainer.innerHTML = dates
        .map((dateString, i) => {
            const date = new Date(dateString);
            // if index is 0 (first day), label "today", else default to weekday name
            const label = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });
            const dayData = byDate[dateString];
            const icon = `https://openweathermap.org/img/w/${dayData.icon}.png`;

            return `
                <div class="forecast-day">
                    <strong>${label}</strong>
                    <img src="${icon}" alt="${dayData.description}" width="40" height="40">
                    <p>${Math.round(dayData.max)}°F / ${Math.round(dayData.min)}°F</p>
                </div>
            `;
        })
        .join('');
}

function initHomePage() {
    apiFetch();
    const topMembersContainer = document.querySelector('#top-member-cards');
    if (topMembersContainer) {
        displayTopMembers(topMembersContainer);
    }
}

initHomePage();
