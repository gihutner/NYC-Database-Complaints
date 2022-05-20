// API Key for Mapbox. Get one here:
// https://www.mapbox.com/studio/account/tokens/

// API Key for Mapbox. Get one here:
// https://www.mapbox.com/studio/account/tokens/
const key =
    'pk.eyJ1IjoibWFwcGF1c2VyIiwiYSI6ImNqNXNrbXIyZDE2a2cyd3J4Ym53YWxieXgifQ.JENDJqKE1SLISxL3Q_T22w';

// Options for map
const options = {
    lat: 40.7128,
    lng: -74.006,
    zoom: 10.5,
    studio: true, // false to use non studio styles
    //style: 'mapbox.dark' //streets, outdoors, light, dark, satellite (for nonstudio)
    style: 'mapbox://styles/mapbox/traffic-night-v2',
};
// Create an instance of Mapbox
const mappa = new Mappa('Mapbox', key);
let myMap;

let canvas;
let meteorites;

function setup() {
    let cnv = createCanvas(800, 700);
    cnv.parent('bubbleMap');

    // Create a tile map and overlay the canvas on top.
    myMap = mappa.tileMap(options);
    myMap.overlay(cnv);

    // Load the data
    meteorites = loadTable('data/boroughs.csv', 'csv', 'header');

    // Only redraw the meteorites when the map change and not every frame.
    myMap.onChange(drawBoroughs);

    fill(109, 255, 0);
    stroke(100);
}

// The draw loop is fully functional but we are not using it for now.
function draw() {}

function drawBoroughs() {
    clear();
    // let boroughCoords = [
    //     {
    //         name: 'Manhattan',
    //         value: [40.776676, -73.971321],
    //         complaints: 24730,
    //     },
    //     {
    //         name: 'Staten Island',
    //         value: [40.579021, -74.151535],
    //         complaints: 3882,
    //     },
    //     { name: 'Brooklyn', value: [40.650002, -73.949997], complaints: 27332 },
    //     { name: 'Bronx', value: [40.837048, -73.865433], complaints: 21326 },
    //     { name: 'Queens', value: [40.742054, -73.769417], complaints: 19452 },
    // ];
    let boroughCoords = [
        {
            name: 'Manhattan',
            value: [40.776676, -73.971321],
            complaints: 0.0155,
        },
        {
            name: 'Staten Island',
            value: [40.579021, -74.151535],
            complaints: 0.00824,
        },
        {
            name: 'Brooklyn',
            value: [40.650002, -73.949997],
            complaints: 0.01091,
        },
        { name: 'Bronx', value: [40.837048, -73.865433], complaints: 0.01544 },
        { name: 'Queens', value: [40.742054, -73.769417], complaints: 0.00889 },
    ];

    for (let i = 0; i < boroughCoords.length; i++) {
        let lat = boroughCoords[i].value[0];
        let long = boroughCoords[i].value[1];

        if (myMap.map.getBounds().contains([lat, long])) {
            // Transform lat/lng to pixel position
            const pos = myMap.latLngToPixel(lat, long);
            // Get the size of the meteorite and map it. 60000000 is the mass of the largest
            // meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)

            let complaints = boroughCoords[i].complaints;
            let size = map(complaints, 0.008, 0.015, 50, 100) + myMap.zoom();
            ellipse(pos.x, pos.y, size, size);
        }
    }
}
