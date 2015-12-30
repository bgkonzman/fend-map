var viewModel = function() {
  var self = this;

  this.workList = ko.observableArray([]);

  initialWorks.forEach( function(workItem) {
    self.workList.push( new Work(workItem) );
  });
}

ko.applyBindings(new viewModel());
