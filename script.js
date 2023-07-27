const divBlock = document.getElementById("overview")
const titreBlock = document.createElement('h1');
titreBlock.textContent = "Position de l'ISS";
const position = document.createElement('p');
divBlock.appendChild(titreBlock);
divBlock.appendChild(position);

var map = L.map('map').setView([51.505, -0.09], 13);
var Icon = L.icon({
    iconUrl: 'asset/img/icon.png',

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

/*    //test
    map.setView([31, 24], 13)*/

    map.setView([lat, long]);
    marker.setLatLng([lat, long]);
/*    console.log([lat + "," + long], 13);*/
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}\'', {
        maxZoom: 4,
        minZoom: 2,
        attribution: '©KillianSb'
    }).addTo(map);

    trace();
}

function trace() {
   var Point = L.icon({
        iconUrl: 'asset/img/point.png',

        shadowSize:   [50, 64], // size of the shadow
        iconSize:     [10, 10], // taille de l'icone
/*        iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location*/
    });
    var markerPoint = L.marker([lat, long],{icon: Point}).addTo(map);

    markerPoint.shadowSize([50, 64]);
    markerPoint.shadowUrl = 'asset/img/point.png';
}

Particles.init({
    selector: '.particules',
    color: ['#0051ff', '#ffffff'],
    maxParticles: 100,
    speed: 0.8,
    connectParticles: true,
});

var easter_egg = new Konami(function() {

    playSound();
    equipage();
    particles();
    modifColor();
    iconPositions();

    function playSound() {
        // Créez un nouvel objet Audio en spécifiant le chemin du fichier audio
        const sound = new Audio("asset/son/bruit.mp3");

        // Jouez le son
        sound.play();
    }

    function particles() {
        // Particule rouge
        Particles.init({
            selector: '.particules',
            color: ['#ff0000', '#ffffff'],
            maxParticles: 300,
            speed: 1,
            connectParticles: true,
        });
    }

    function modifColor() {
        // Bordure map rouge
        const mapDiv = document.getElementById("map");
        mapDiv.style.boxShadow = "1px 0 10px #ff0000";

        // Bordure texte rouge
        const divH1 = document.querySelector("h1");
        divH1.style.textShadow = "1px 0 10px #ff0000";
        const divP = document.querySelector("p");
        divP.style.textShadow = "1px 0 10px #ff0000";
    }

    function  equipage() {
        // Equipage
        const equipage = document.createElement('p');
        equipage.textContent = "Russes (Sergey Korsakov, Oleg Artemyev et Denis Matveev), " +
            "NASA (Kjell Lindgren, Robert Hines et Jessica Watkins)," +
            " Samantha Cristoforetti de l’agence spatiale européenne (ESA)";
        equipage.style.textShadow = "1px 0 10px #ff0000";
        divBlock.appendChild(equipage);
    }

    function iconPositions () {
        // Position Titanic
        var Titanic = L.icon({
            iconUrl: 'asset/img/titanic.png',

            shadowSize:   [50, 64], // size of the shadow
            iconSize:     [60, 50], // taille de l'icone
        });
        var markerTitanic = L.marker([41.7258, -49.9408], {icon: Titanic}).addTo(map).bindPopup("Titanic");

        // Position Bermude
        var Bermude = L.icon({
            iconUrl: 'asset/img/triangle.png',

            shadowSize:   [50, 64], // size of the shadow
            iconSize:     [60, 50], // taille de l'icone
        });
        var markerBermude = L.marker([25, -71], {icon: Bermude}).addTo(map).bindPopup("Triangle des bermudes");
    }

/*    // Zone France
    L.circle([47.09, 2.25], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500000
    }).addTo(map);*/

/*    alert('Konami code was successfully');
    window.location.href=("https://http.cat/403");*/
});