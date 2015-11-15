angular.module('movieDBDirectives',[]).directive('movieInfoBox', function() {
    //directive displays movie information in a panel
    //usage <movie-info-box info='movie'></movie-info-box>
    //info value passed to directive becomes the scope of the directive, scope.movie
  return {
    restrict: 'AEC',    // usage of the directive: A -> attribute, E -> element, C -> class (default: EC)
    scope: {
      movie: '=info'    // injects the 'movie' object that is given with the 'info' attribute
    },
    replace: true,      // replaces the directive DOM item with the template html (default: false)
    transclude: false,  // wraps the items inside the directive DOM (default: false)
    link: function (scope, elem, attrs) {
      console.log("movie info directive link: " + scope.movie.Title);
    },
    controller: function($scope){
    	console.log("movie info directive controller: " + $scope.movie.Title);
    },
    templateUrl: 'templates/directives/movie-info-box.html'
  };
});

