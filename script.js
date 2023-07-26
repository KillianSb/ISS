const divBlock = document.getElementById("overview")
const titreBlock = document.createElement('h1');
titreBlock.textContent = "Position de l'ISS";
const position = document.createElement('p');
divBlock.appendChild(titreBlock);
divBlock.appendChild(position);

var map = L.map('map').setView([51.505, -0.09], 13);
var Icon = L.icon({
    iconUrl: 'icon.png',

    shadowSize:   [50, 64], // size of the shadow
    iconSize:     [90, 105], // taille de l'icone
});
var marker = L.marker([0, 0],{icon: Icon}).addTo(map);

appelApi();

function appelApi() {
    fetch('http://api.open-notify.org/iss-now.json')
        .then(response => response.json())
        .then(json => {
/*            console.log(json["iss_position"].latitude);
            console.log(json["iss_position"].longitude);*/
            affichage(json);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de l\'appel API:', error);
        });
}

// Appel de la fonction toutes les 3 secondes
setInterval(appelApi, 3000);

function affichage(json) {
    position.textContent = "Latitude: " + json["iss_position"].latitude + " | Longitude: " + json["iss_position"].longitude;
    affichageMap(json);
}
function affichageMap(json) {
    lat = json["iss_position"].latitude;
    long = json["iss_position"].longitude;

    map.setView([lat, long], 13)
    marker.setLatLng([lat, long]);
/*    console.log([lat + "," + long], 13);*/
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}\'', {
        maxZoom: 4,
        minZoom: 2,
        attribution: '©KillianSb'
    }).addTo(map);
}

Particles.init({
    selector: '.particules',
    color: ['#ff0000', '#ffffff', '#000000'],
    maxParticles: 300,
    speed: 0.8,
    connectParticles: true,
});