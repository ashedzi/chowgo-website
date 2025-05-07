'use strict';

const trackButton = document.querySelector('.track-button');
const mapArea = document.querySelector('.map');
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map( {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 15,
    pitch: 40
});

const marker = new mapboxgl.Marker({color: '#ff7342'});

const options = {
    enableHighAccuracy: true
}

function getLocation(position) {
    let {latitude, longitude} = position.coords;
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);
}

function errorHandler() {
    console.log('Unable to retreive your location');
}

function disabledOptions() {
    map.keyboard.disable();
    map.scrollZoom.disable();
    map.dragPan.disable();
    map.doubleClickZoom.disable();
    map.touchZoomRotate.disable();
}

function displayPosition() {
    if('geolocation' in navigator) {
        navigator.geolocation.watchPosition(getLocation, errorHandler, options);
        disabledOptions();
    } else {
        console.log('Geolocation is not supported by your browser.');
    }
}

trackButton.addEventListener('click', () => {
    displayPosition();

})
