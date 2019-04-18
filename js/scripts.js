// Zoe Martiniak's basic website


mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/dark-v10',
center: [-73.950348,40.733210],
zoom: 10
});


PizzaShops.forEach(function(item){
  let color='steelblue';
  if (item.price === '$') color = '#008000';
  if (item.price === '$$') color = '#fed976';
  if (item.price === '$$$') color = '#fc4e2a';

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
