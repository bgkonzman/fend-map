var viewModel = function() {
  var self = this;
  var input = document.getElementById("input");
  this.workList = ko.observableArray([]);

  initialWorks.forEach( function(workItem) {
    self.workList.push( new Work(workItem) );
  });

  this.addMarker = function(work) {
    var marker = new google.maps.Marker({
      position: {lat: work.latitude(), lng: work.longitude()},
      title: work.name(),
      map: map
    });
    return marker;
  }

  this.workList().forEach( function(work) {
    work.marker = self.addMarker(work);
  });

  input.oninput = function() {
    self.workList().forEach( function(work) {
      if (work.name().toUpperCase().search(input.value.toUpperCase()) !== -1) {
        work.isInList( true );
      }
      else {
        work.isInList( false );
      }
    });

    self.workList().forEach( function(work) {
      if ( work.isInList() ) {
        work.marker.setVisible(true);
      }
      else {
        work.marker.setVisible(false);
      }
    });
  }

}

ko.applyBindings(new viewModel());
