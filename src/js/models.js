var initialWorks = [
  {
    name: "Jesuit School of Theology",
    latitude: 37.877573,
    longitude: -122.2606307,
    wikiPageId: 3091769
  },
  {
    name: "Saint Ignatius College Preparatory",
    latitude: 37.7482065,
    longitude: -122.4980097,
    wikiPageId: 1419521
  },
  {
    name: "Bellarmine College Preparatory",
    latitude: 37.342492,
    longitude: -121.9213557,
    wikiPageId: 903645
  },
  {
    name: "Santa Clara University",
    latitude: 37.3496418,
    longitude: -121.9411762,
    wikiPageId: 433127
  },
  {
    name: "University of San Francisco",
    latitude: 37.7757492,
    longitude: -122.4525743,
    wikiPageId: 30876663
  },
  {
    name: "Saint Agnes Catholic Church",
    latitude: 37.7716131,
    longitude: -122.4481817,
    wikiPageId: null
  },
  {
    name: "El Retiro San Iñigo",
    latitude: 37.3696409,
    longitude: -122.1215603,
    wikiPageId: null
  },
  {
    name: "Sacred Heart Jesuit Center",
    latitude: 37.2135481,
    longitude: -121.984493,
    wikiPageId: null
  }
]

var Work = function(workItem) {
  this.name = ko.observable(workItem.name);
  this.latitude = ko.observable(workItem.latitude);
  this.longitude = ko.observable(workItem.longitude);
  this.marker = null;
  this.markerIcon = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  this.infoWindow = null;
  this.isInList = ko.observable(true);
  this.isClicked = ko.observable(false);
  this.wikiInfo = null;
  this.wikiPageId = workItem.wikiPageId
}
