angular.module('movieDBDirectives',[])
.directive('movieInfoBox', function() {
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
      console.log("movie info directive link: " + scope.movie.title);
    },
    controller: function($scope){
    	console.log("movie info directive controller: " + $scope.movie.title);
    },
    templateUrl: 'templates/directives/movie-info-box.html'
  };
})
.directive('movieTrailer', function() {
  return {
    restrict: 'E',    // E -> element
    scope: {
      trailerSrc: '=',
      fadeIn: '='
    },
    templateUrl: 'templates/directives/movie-trailer.html',
    link: function(scope,element,attrs) {
                    console.log(scope);                   
                    

                    scope.$watch(attrs.fadeIn, function(value) {
                          if (value === 'in') {
                            if (element.find("iframe")[0].src !== scope.trailerSrc)
                                element.find("iframe")[0].src=scope.trailerSrc;  
                            }
                          else
                            element.find("iframe")[0].src="";   
                        });

                    scope.closeModal = function() {
                      scope.fadeIn = 'out';                   
                    }
                  
                  },
    controller: function($scope,$element) {
                    console.log($scope);
                    $scope.fadeIn='out';
                    
                  }
  };
})
.directive('makeMap', function() {
         
        var directive = {
            restrict: 'EA',            
            templateUrl: 'templates/directives/map.html',
            scope: {
                map: '='
            },
            link: function(scope, element, attrs){
                console.log("in map directive link");
            },
            controller: function mapController($scope) {
            
                    $scope.zoomIn = function(){
                        $scope.map.zoom++;
                    };

                    $scope.zoomOut = function(){
                        $scope.map.zoom--;
                    };
                    $scope.mapDimensions = function() {
                        if (!$scope.map.width)
                            var width = 300;
                        else
                            width = $scope.map.width;
                        if (!$scope.map.height)
                            var height = 300;
                        else
                            height = $scope.map.height;
                        return width + 'x' + height;
                    }        
                }                    
            };
        return directive;     
    });

