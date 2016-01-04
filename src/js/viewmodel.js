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
    work.marker( self.addMarker(work) );
  });

  input.oninput = function() {
    self.workList().forEach( function(workItem) {
      workItem.isInList( false );
      if (workItem.name().toUpperCase().search(input.value.toUpperCase()) !== -1) {
        workItem.isInList( true );
      }
    });

    for (i=0; i < self.workList.length; i++)
      self.workList()[i].setVisible(false);
    self.workList().forEach( function(work) {
      for (i=0; i < self.workList.length; i++) {
        if (work.latitude() === self.markers[i].getPosition().lat())
          self.workList()[i].setVisible(true);
      }
    });
  }

}

ko.applyBindings(new viewModel());
