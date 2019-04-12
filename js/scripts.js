// Zoe Martiniak's basic website
// Hiding all elements not on 'Home Page'
$('.Music').hide();
$('.Boxes').hide();
$('#back').hide();
$('#gobox').hide();
$('.Mood').hide();
$('#numBoxes').hide();

// On click of boomRoom button, hide home page elements
// and open the drop down menu to select a mood
$('#boomRoom').on('click', function() {
  $('p').hide();
  $('#boomRoom').hide();
  $('#boxRoom').hide();
  $('#back').show();
  $('.Boxes').hide();
  $('.Mood').show();
});

// When selecting a mood, display (toggle) the corresponding playlist
// I hide all Music classes sure all other playlists don't show if you're browsing through
$('#moods').change(function() {
    if ($(this).val() === 'blank') {
        $('.Music').hide();};
    if ($(this).val() === 'eccentric') {
        $('.Music').hide();
        $('#SpiritBee').toggle();  };
    if ($(this).val() === 'funky') {
        $('.Music').hide();
        $('#GalcherLustworth').toggle();  };
    if ($(this).val() === 'moody') {
        $('.Music').hide();
        $('#NegGem').toggle(); };
    if ($(this).val() === 'indie') {
        $('.Music').hide();
        $('#FieldMedic').toggle();  };
    if ($(this).val() === 'rebellious') {
        $('.Music').hide();
        $('#KingKrule').toggle(); };
    if ($(this).val() === 'relaxed') {
        $('.Music').hide();
        $('#Duster').toggle(); };
});

// When selecting the boxRoom button, hide all home page elements
// and show the input box to put in the number of boxes desired
$('#boxRoom').on('click', function() {
  $('p').hide()
  $('#boomRoom').hide();
  $('#boxRoom').hide();
  $('#back').show();
  $('#gobox').show();
  $('#numBoxes').show();
});

// When submitting the number of boxes, the value with be stored
// and parsed as an integer, and the desired num of boxes will be displayed
$('#boxSubmit').on('click', function() {
  var numClicks = 0;
  $('.Boxes').hide();
  $('.Boxes').removeAttr('style');
  var boxNum = $('#boxInput').val();
  boxNum = parseInt(boxNum); //parsing the string input to integer
  console.log('Number of boxes: ', boxNum)
  if (boxNum > 0)  {
    $('#Box1').show();};
  if (boxNum > 1) {
    $('#Box2').show();};
  if (boxNum > 2) {
    $('#Box3').show();};
  if (boxNum > 3) {
    $('#Box4').show();};
  if (boxNum > 4) {
    $('#Box5').show();};
  if (boxNum > 5) {
    $('#Box6').show();};
  if (boxNum > 6) {
    $('#Box7').show();};
});

// When you select the clickme button (gobox), the boxes will animate

var numClicks = 0;
$('#gobox').on('click', function() {
numClicks = numClicks + 1;
if (numClicks%4 === 1) {
$('#Box1').animate({
      top: '150px',
      opacity: '0.5',
    }, 'slow');
$('#Box2').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box3').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box4').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box10').animate({
      top: '10px',
      opacity: '0.5',
      height: '150px',
      width: '150px'
    }, 'slow', function () { $(this).removeAttr('style'); });}
if (numClicks%4 === 2) {
$('#Box1').animate({
      right: '150px',
      opacity: '0.5',
    }, 'slow');
$('#Box2').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box3').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box4').animate({
      bottom: '10px',
      opacity: '0.5',
    }, 'slow');
$('#Box10').animate({
      top: '10px',
      opacity: '0.5',
      height: '150px',
      width: '150px'
    }, 'slow', function () { $(this).removeAttr('style'); });}

console.log('Number of clicks: ',numClicks)
  })


$('#back').on('click', function() {
  $('p').show();
  $('#boomRoom').show();
  $('#boxRoom').show();
  $('.Music').hide();
  $('#back').hide();
  $('.Boxes').hide();
  $('#gobox').hide();
  $('.Mood').hide();
  $('#numBoxes').hide();

})



mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
container: 'mapContainer',
style: 'mapbox://styles/mapbox/streets-v9',
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


studentPizzaShops.forEach(function(item){
  let color='steelblue';
  if (item.nyuprogram === 'wagner') color = 'orange';
  if (item.nyuprogram === 'cusp') color = 'purple';
  if (item.nyuprogram === 'adjunct') color = 'green';

  console.log(item.name)
  // create a marker for each pizza favoritepizzashop
  new mapboxgl.Marker({
    color: color,
  })
    .setLngLat([item.lng, item.lat])
    .setPopup(new mapboxgl.Popup({offset:40}) // sets a popup on this marker
      .setText(`${item.name} says their favorite pizza is `))
    .addTo(map);
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
