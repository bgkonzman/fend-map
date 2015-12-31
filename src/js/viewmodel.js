var viewModel = function() {
  var self = this;
  this.markers = ko.observableArray([]);

  this.workList = ko.observableArray([]);

  this.resetWorkList = function() {
    self.workList([]);
    initialWorks.forEach( function(workItem) {
      self.workList.push( new Work(workItem) );
    });
  }

  this.resetWorkList();

  this.addMarker = function(work) {
    var marker = new google.maps.Marker({
      position: {lat: work.latitude(), lng: work.longitude()},
      title: work.name(),
      map: map
    });
  }

  this.workList().forEach( function(work) {
    self.markers.push( self.addMarker(work) );
  });

}

ko.applyBindings(new viewModel());
