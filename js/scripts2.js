// Zoe Martiniak's basic website


mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-73.950348,40.733210],
zoom: 10
});

// create a popup for the marker
var popup = new mapboxgl.Popup({ offset: 25 })
.setText('This is arguably the best park in NYC.');

// create a marker with a popup
var marker = new mapboxgl.Marker()
  .setLngLat([-73.943476,40.724326])
  .setPopup(popup) // sets a popup on this marker
  .addTo(map);

map.addControl(new mapboxgl.NavigationControl());

// Defining the variables
var price1 = ["==", ["get", "price"], "$"];
var price2 = ["==", ["get", "price"], "$$"];
var price3 = ["==", ["get", "price"], "$$$"];
var price4 = ["==", ["get", "price"], "?"];

// Defining colors
var colors = ['#fed976', '#fd8d3c', '#fc4e2a','lightgray'];


map.on('load', function () {
// add a clustered GeoJSON source for a sample set of pizza shops
map.addSource('pizzas', {
"type": "geojson",
"data": "https://gist.githubusercontent.com/zem232/b5a65d75bcd0c0bc67b99204f986c0de/raw/56f5dada1191d3b3fd88bc52bfcbabfb504bf0ee/nyc_pizza_shops.geojson",
"cluster": true,
//"clusterRadius": 80,
"clusterProperties": { // keep separate counts for each magnitude category in a cluster
"mag1": ["+", ["case", price1, 1, 0]],
"mag2": ["+", ["case", price2, 1, 0]],
"mag3": ["+", ["case", price3, 1, 0]],
"mag4": ["+", ["case", price4, 1, 0]],
}
});
// circle and symbol layers for rendering individual earthquakes (unclustered points)
map.addLayer({
"id": "earthquake_circle",
"type": "circle",
"source": "pizzas",
"filter": ["!=", "cluster", true],
"paint": {
"circle-color": ["case",
price1, colors[0],
price2, colors[1],
price3, colors[2],
price4, colors[3]],
"circle-opacity": 0.6,
"circle-radius": 12
}
});
map.addLayer({
"id": "earthquake_label",
"type": "symbol",
"source": "pizzas",
"filter": ["!=", "cluster", true],
"layout": {
"text-field": ["number-format", ["get", "price"], {"min-fraction-digits": 1, "max-fraction-digits": 1}],
"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
"text-size": 10
},
"paint": {
"text-color": ["case", ["<", ["get", "price"], 3], "black", "white"]
}
});

// objects for caching and keeping track of HTML marker objects (for performance)
var markers = {};
var markersOnScreen = {};

function updateMarkers() {
var newMarkers = {};
var features = map.querySourceFeatures('earthquakes');

// for every cluster on the screen, create an HTML marker for it (if we didn't yet),
// and add it to the map if it's not there already
for (var i = 0; i < features.length; i++) {
var coords = features[i].geometry.coordinates;
var props = features[i].properties;
if (!props.cluster) continue;
var id = props.cluster_id;

var marker = markers[id];
if (!marker) {
var el = createDonutChart(props);
marker = markers[id] = new mapboxgl.Marker({element: el}).setLngLat(coords);
}
newMarkers[id] = marker;

if (!markersOnScreen[id])
marker.addTo(map);
}
// for every marker we've added previously, remove those that are no longer visible
for (id in markersOnScreen) {
if (!newMarkers[id])
markersOnScreen[id].remove();
}
markersOnScreen = newMarkers;
}

// after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
map.on('data', function (e) {
if (e.sourceId !== 'pizzas' || !e.isSourceLoaded) return;

map.on('move', updateMarkers);
map.on('moveend', updateMarkers);
updateMarkers();
});
});

// code for creating an SVG donut chart from feature properties
function createDonutChart(props) {
var offsets = [];
var counts = [props.price1, props.price2, props.price3, props.price4];
var total = 0;
for (var i = 0; i < counts.length; i++) {
offsets.push(total);
total += counts[i];
}
var fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16;
var r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18;
var r0 = Math.round(r * 0.6);
var w = r * 2;

var html = '<svg width="' + w + '" height="' + w + '" viewbox="0 0 ' + w + ' ' + w +
'" text-anchor="middle" style="font: ' + fontSize + 'px sans-serif">';

for (i = 0; i < counts.length; i++) {
html += donutSegment(offsets[i] / total, (offsets[i] + counts[i]) / total, r, r0, colors[i]);
}
html += '<circle cx="' + r + '" cy="' + r + '" r="' + r0 +
'" fill="white" /><text dominant-baseline="central" transform="translate(' +
r + ', ' + r + ')">' + total.toLocaleString() + '</text></svg>';

var el = document.createElement('div');
el.innerHTML = html;
return el.firstChild;
}

function donutSegment(start, end, r, r0, color) {
if (end - start === 1) end -= 0.00001;
var a0 = 2 * Math.PI * (start - 0.25);
var a1 = 2 * Math.PI * (end - 0.25);
var x0 = Math.cos(a0), y0 = Math.sin(a0);
var x1 = Math.cos(a1), y1 = Math.sin(a1);
var largeArc = end - start > 0.5 ? 1 : 0;

return ['<path d="M', r + r0 * x0, r + r0 * y0, 'L', r + r * x0, r + r * y0,
'A', r, r, 0, largeArc, 1, r + r * x1, r + r * y1,
'L', r + r0 * x1, r + r0 * y1, 'A',
r0, r0, 0, largeArc, 0, r + r0 * x0, r + r0 * y0,
'" fill="' + color + '" />'].join(' ');
}



PizzaShops.forEach(function(item){
  let color='steelblue';
  if (item.price === '$') color = 'green';
  if (item.price === '$$') color = 'yellow';
  if (item.price === '$$$') color = 'red';

  console.log(item.name, item.coordinates.longitude)
  // create a marker for each pizza favoritepizzashop
  new mapboxgl.Marker({
    color: color,
  })
    .setLngLat([item.coordinates.longitude, item.coordinates.latitude])
    .setPopup(new mapboxgl.Popup({offset:40}) // sets a popup on this marker
      .setText(`${item.name} , ${item.price} `))
    .addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
