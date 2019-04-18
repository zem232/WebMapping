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

var colors = ['#fed976', '#feb24c', '#fd8d3c', '#fc4e2a'];

PizzaShops.forEach(function(item){
  let color='steelblue';
  if (item.price === '$') color = 'green';
  if (item.price === '$$') color = 'yellow';
  if (item.price === '$$$') color = 'red';

  console.log(item.name, ':',item.location.address1, item.location.city)
  // create a marker for each pizza favoritepizzashop
  new mapboxgl.Marker({
    color: color,
  })
    .setLngLat([item.coordinates.longitude, item.coordinates.latitude])
    .setPopup(new mapboxgl.Popup({offset:40}) // sets a popup on this marker
      .setText(`${item.name} , ${item.price}, ${item.location.address1} `))
    .addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
