var initialWorks = [
  {
    name: 'Jesuit School of Theology',
    latitude: 37.877573,
    longitude: -122.2587676,
    heading: 75,
    wikiPageId: 3091769
  },
  {
    name: 'Saint Ignatius College Preparatory',
    latitude: 37.7480876,
    longitude: -122.4953876,
    heading: 270,
    wikiPageId: 1419521
  },
  {
    name: 'Bellarmine College Preparatory',
    latitude: 37.3420504,
    longitude: -121.9194589,
    heading: 100,
    wikiPageId: 903645
  },
  {
    name: 'Santa Clara University',
    latitude: 37.3496334,
    longitude: -121.9410245,
    heading: 210,
    wikiPageId: 433127
  },
  {
    name: 'University of San Francisco',
    latitude: 37.7789477,
    longitude: -122.4521154,
    heading: 30,
    wikiPageId: 30876663
  },
  {
    name: 'Saint Agnes Catholic Church',
    latitude: 37.7714676,
    longitude: -122.445568,
    heading: 270,
    wikiPageId: null
  },
  {
    name: 'El Retiro San Iñigo',
    latitude: 37.3714639,
    longitude: -122.1171939,
    heading: 240,
    wikiPageId: null
  },
  {
    name: 'Sacred Heart Jesuit Center',
    latitude: 37.2151957,
    longitude: -121.9807369,
    heading: 150,
    wikiPageId: null
  }
];

/* A Work object represents one particular Jesuit work. */
var Work = function(workItem) {
  this.name = workItem.name;
  this.latitude = workItem.latitude;
  this.longitude = workItem.longitude;
  this.heading = workItem.heading;
  this.marker = null;
  this.markerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
  this.infoWindow = null;
  this.isInList = ko.observable(true);
  this.isClicked = ko.observable(false);
  this.wikiInfo = null;
  this.wikiPageId = workItem.wikiPageId;
};
