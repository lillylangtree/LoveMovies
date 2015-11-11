(function(){
	'use strict';

	angular
		.module('UIWebComp.directives',[])
		.directive('uiWebCompMakeMap', makeMap);

//more flexible map directive:

	function makeMap () {
		 
		var directive = {
			restrict: 'EA',			
			templateUrl: '../templates/directives/map.html',
			link: link,
			controller: mapController,
			scope: {
				map: '='
			}	
		};
		return directive;

		function link (scope, element, attrs){
			console.log("in event details directive link");
		}
	}

		mapController.$inject = ['$scope'];

		function mapController($scope) {
				//console.log("in event details map directive controller");
				//console.log("showing scope map" + $scope.map);
				$scope.$watch('map',function() {
					console.log("map directive controller watching map change", $scope.map);
				});
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
				};
				
				$scope.returnAddressOrNot = function(){
					console.log("address: " + $scope.map.address);
					if($scope.map.address)
						return true;
					else
						return false;	
				};
		}		
	}

)();