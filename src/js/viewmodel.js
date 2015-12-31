var viewModel = function() {
  var self = this;

  this.workList = ko.observableArray([]);

  initialWorks.forEach( function(workItem) {
    self.workList.push( new Work(workItem) );
  });
}

ko.applyBindings(new viewModel());

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat: 37.557664, lng: -122.1630287}
    });
}
