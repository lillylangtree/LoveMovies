angular.module('movieDBControllers', [])
    .controller('MovieListController', function ($scope, MovieListService, myMovieConfig, $location, $routeParams) {
        $scope.loading = true;
        var search = $routeParams.movieTitle;
        $scope.title = "Searched For Movies: '" + search + "'";

        getMovies(search);

        function getMovies(search) {
            var movies = search; // search string for searching movies, sent to url as parameter
            var url = myMovieConfig.moviesEndpoint + '?' + 's=' + movies + '&plot=full';

            MovieListService.getList(url).then(
                function (result) { //success, got data back from api call
                    $scope.movieList = result.data.Search.filter(function (val) {
                        return val.Poster !== 'N/A' //filter out invalid movies
                    });
                    $scope.loading = false;
                }
            ).catch(
                function (error) { //error from api call
                    console.log('error', error);
                    $location.path('/error/' + error.data.status_message + '/' + error.status);
                });
        }
    })
    .controller('MovieFavoritesController', function ($scope, MovieListService, $location) {
        //MovieListService is the service that has resources to obtain favourite movies list
        $scope.loading = true;
        $scope.title = 'My Favorite Movies';

        getMovies( );

        function getMovies( ) {

            MovieListService.getFavoritesList('/favorites').then(
                function (result) { //success got data back from api call
                    $scope.movieList = result.data //moviesList now bound to view template
                    $scope.loading = false;
                }
            ).catch(
                function (error) {
                    $location.path('/error/' + error.data.status_message + '/' + error.status);
                });
        }
        $scope.deleteFavorite = function(movie) {
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
    .controller('MovieDetailsController', function ($scope, $location, $routeParams, MovieListService, myMovieConfig) {
// 
        $scope.title = 'Movie Details';
        $scope.showFav = true;
        if ($routeParams.fromFavorites)
            $scope.showFav = false; //disable add favorites button
        var id = $routeParams.movieId;
        var url = myMovieConfig.moviesEndpoint + '?i=' + id + '&r=json&tomatoes=true';
        MovieListService.getById(url).then(//success got movies details from api call
            function (result) {
                var movie = result.data;
                $scope.movie = movie; //binding to view data
                $scope.animateIn = "animated zoomInRight"
            }
            ,
            function (error) {

                $location.path('/error/' + error.data.status_message + '/' + error.status)
            }
            )
            .catch(
                function (error) {

                    $location.path('/error/' + error.data.status_message + '/' + error.status)
                }
            );
        $scope.addFavourite = function(){
            MovieListService.postFavorite($scope.movie).then(//success added to favorites list
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
// 
        $scope.message = $routeParams.message;
        $scope.status = $routeParams.status;
    })
    .controller('AboutController', function ($scope) {
// 
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
// 
        $scope.movie = '';

        $scope.movieSearch = function () {

            $location.path('/popular/' + movieForm.movie.value);
       }
    });