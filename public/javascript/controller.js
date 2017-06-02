angular.module('movieDBControllers', [])
    .controller('MovieListController', function ($scope, MovieListService, myMovieConfig, $location, $routeParams) {
        //get list of movies for display
        //parameter: search, contains title of movie to search for
        //MovieListService is the service that has resources to obtain favourite movies list
        //see service.js for details
        //myMovieConfig set in app.js file
        $scope.loading = true;
        var search = $routeParams.movieTitle;
        $scope.title = "Searching For Movies: '" + search + "'";

        getMovies(search);

        function getMovies(search) {
            var movies = search; // search string for searching movies, sent to url as parameter
            //construct url
            var url = myMovieConfig.moviesEndpoint + '?' + 'title=' + movies + '&token=' +  
						myMovieConfig.myapifilmstoken + '&format=json&limit=10';

            MovieListService.getList(url).then(//retrieve movies for display
                function (result) { //success, got data back from api call
                    if (!result.data.Error) {
						$scope.movieList = result.data.data.movies;
                        $scope.movieList = result.data.data.movies.filter(function (val) {
                            return val.urlPoster != null //filter out invalid movies
                        });
                        $scope.loading = false;
                    }
                    else
                        $location.path('/error/' + result.data.Error + '/' + result.data.Response);
                }
            ).catch(
                function (error) { //error from api call
                    $location.path('/error/' + "Error Retrieving Movie Data" + '/' + '404')
				})
		}
    })
    .controller('MovieFavoritesController', function ($scope, MovieListService, $location) {
        //MovieListService is the service that has resources to obtain favourite movies list
        //see service.js for details
        $scope.loading = true;
        $scope.title = 'My Favorite Movies';

        getMovies( );

        function getMovies( ) {

            MovieListService.getFavoritesList('/favorites').then(//retrieve movie favorites
                function (result) { //success got data back from api call
                    $scope.movieList = result.data //moviesList now bound to view template
                    $scope.loading = false;
                }
            ).catch(
                function (error) {
                    $location.path('/error/' + "Error Retrieving Favourites Data" + '/' + '404');
                });
        }
        $scope.deleteFavorite = function(movie) {//requested delete from favorites list, enabled by button in view
            MovieListService.deleteFavorite(movie).then(//success delete from favorites list
                function (result) {
                    if (result.status == 200 && result.statusText == 'OK') {
                        getMovies(); //re-get favorite list
                    }
                },
                function (error) {
                    $location.path('/error/' + error.data.status_message + '/' + error.status)
                }
            );
        }
    })
    .controller('MovieDetailsController', function ($scope, $location, $sce, $routeParams, MovieListService,MovieModelService,myMovieConfig) {
        //show movie details
        //MovieListDervice contains functions to get movie details and add to favorites list
        //see service.js for details
        //myMovieConfig defined in the app.js file
        //MovieModelService service to set and return movie model object, which gets stored to database
        $scope.title = 'Movie Details';
        $scope.showFav = false; //disable add favorites button

        var id = $routeParams.movieId;
        var url = myMovieConfig.moviesEndpoint + '?idIMDB=' + id + '&token=' + myMovieConfig.myapifilmstoken;
        MovieListService.getById(url).then(//success got movies details from api call
            function (result) {
                var movie = result.data.data.movies[0];
                $scope.movie = movie; //binding to view data
                $scope.animateIn = "animated zoomInRight";

                if ($routeParams.fromFavorites)
                    $scope.showFav = false; //disable add favorites button
                else
                    $scope.showFav = true; //enable favorite button

				
				return(movie.idIMDB);
				},
                function (error) {
                    $location.path('/error/' + error.data.status_message + '/' + error.status)
                }
            )
			.then(
				function(imdbID){
				 	var url = myMovieConfig.moviesTrailerEndPoint  + imdbID + '&token=' + myMovieConfig.myapifilmstoken;
				 	MovieListService.getTrailerById(url).then(function(result) {
						if (result.data.error) 
							$scope.trailer = false;
						else {

						var trailer_id = result.data.data.trailer[0].trailer_id;
				 		if (trailer_id.length > 0) {
							console.log(trailer_id);
							//$scope.$apply(function () {
							$scope.trailer = true;
							$scope.trailerSrc = $sce.trustAsResourceUrl("https://v.traileraddict.com/" + trailer_id);
								//$scope.trailerSrc = $sce.trustAsResourceUrl(trailerSrc.data.trailer.src);
							//});
						}
					    }
					})
				},
                function (error) {
                    $location.path('/error/' + error.data.status_message + '/' + error.status)
                }
			).catch(
                function (error) {

                    $location.path('/error/' + "Error Retrieving Trailer Data" + '/' + '404')
                }
            );
		$scope.showTrailer = function() {
                      $scope.fadeIn = 'in'
                    }
		$scope.closeModal = function() {
                      $scope.fadeIn = 'out'
                    }	
        $scope.addFavourite = function(){//add movie to favourites, enabled by addFavorites button in view
            var storeMovie = MovieModelService.setMovie($scope.movie.title,$scope.movie.idIMDB,$scope.movie.year);
            MovieListService.postFavorite(storeMovie).then(//success added to favorites list
                function (result) {
                    if (result.status == 200 && result.statusText == 'OK') {
                        $scope.showFav = false;//disable add favorites button
                    }
                },
                function (error) {
                    $location.path('/error/' + error.data.status_message + '/' + error.status)
                }
            );
        }
    })
    .controller('MovieErrorController', function ($scope, $routeParams) {
        // show error message
        $scope.message = $routeParams.message;
        $scope.status = $routeParams.status;
    })
    .controller('AboutController', function ($scope) {
        //displays map with locations see template map.html for details
        //template uses map directive for display
        $scope.title = 'About Us';
        $scope.maps = [{
            address: 'Trinity College Dublin, Dublin',
            zoom: 14,
            width: 400
        }, {
            address: '51st Street, New York, New York',
            zoom: 14,
            width: 400
        }];
        $scope.map = $scope.maps[0];
    })
    .controller('MenuController', function ($scope, $location) {
    //controller on the menu takes the movie search string and moves to route /popular/:movieTitle
        $scope.movie = '';

        $scope.movieSearch = function () {

            $location.path('/popular/' + movieForm.movie.value);
       }
    });