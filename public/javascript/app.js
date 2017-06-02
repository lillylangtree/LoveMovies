// defining the app module of the project
angular.module('moviesDBApp', ['ngRoute', 'UIWebComp.directives', 'movieDBControllers', 'movieDBDirectives', 'movieDBServices'])
    .constant("myMovieConfig", {
        "moviesEndpoint": "http://www.myapifilms.com/imdb/idIMDB",
		"myapifilmstoken": "ca8e141b-b14a-4767-a784-14b403e95c22" ,
		"moviesTrailerEndPoint": "http://api.myapifilms.com/trailerAddict/taapi?idIMDB="
    })
    .config(function ($routeProvider) {
        // use the HTML5 History API
        // $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html'
            })
            .when('/popular/:movieTitle', {
                templateUrl: 'templates/movies.html',
                controller: 'MovieListController'
            })
            .when('/favorites', {
                templateUrl: 'templates/favorites.html',
                controller: 'MovieFavoritesController'
            })
            .when('/movie/:movieId', {
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsController'
            })
            .when('/movie/:movieId/:fromFavorites', {
                templateUrl: 'templates/movieDetails.html',
                controller: 'MovieDetailsController'
            })
            .when("/about", {
                templateUrl: "templates/about.html",
                controller: "AboutController"
            })
            .when("/error/:message/:status", {
                templateUrl: "templates/error.html",
                controller: 'MovieErrorController'
            })
            .otherwise({redirectTo: '/'});
    });