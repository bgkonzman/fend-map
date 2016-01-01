var viewModel = function() {
  var self = this;
  var input = document.getElementById("input");
  this.markers = [];
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

  input.onkeyup = function() {
    self.workList([]);
    initialWorks.forEach( function(workItem) {
      if (workItem.name.search(input.value) !== -1) {
        self.workList.push( new Work(workItem) );
      }
    });
  }

}

ko.applyBindings(new viewModel());
