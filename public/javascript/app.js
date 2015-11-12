// defining the app module of the project
angular.module('moviesDBApp', ['ngRoute', 'UIWebComp.directives', 'movieDBControllers', 'movieDBDirectives', 'movieDBServices'])
    .constant("myMovieConfig", {
        "moviesEndpoint": "https://www.omdbapi.com/"
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