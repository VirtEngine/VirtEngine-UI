app.controller("GraphCtrl", ["$scope", "$dialog", "EditorFormOptions", "Sources", function($scope, $dialog, EditorFormOptions, Sources) {
 

  var defaults = {
    size_x: 2, size_y: 2,
    update_interval: 10,
    range: "30-minutes",
    graph_type: "area"
  };

  if (!$scope.widget.id) {
    _.extend($scope.widget, defaults);
  }
  
  $scope.graphTypes           = EditorFormOptions.graphTypes;
  $scope.aggregate_functions  = EditorFormOptions.aggregate_functions;

  $scope.supportsTargetBrowsing = function() {
    return Sources.supportsTargetBrowsing($scope.widget);
  };

  $scope.editTargets = function() {
    dialog.targets = $scope.widget.targets;
    dialog.source = $scope.widget.source;
    dialog.open().then(convertTargetsArrayToString);
  };

  function convertTargetsArrayToString(result) {
    $scope.widget.targets = _.map(dialog.$scope.targets, function(t) {
      return t.content;
    }).join(";");
  }

}]);