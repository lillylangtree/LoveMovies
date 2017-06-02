angular.module('movieDBServices', [])
    .factory('MovieModelService', function () { //service included as parameter to controller
//
        return {
            setMovie: setMovie

        };
        function setMovie(title,imdbId,released){
            var storeMovie = {}
            storeMovie.title = title;
            storeMovie.idIMDB = imdbId;
            storeMovie.year = released;

            return storeMovie;

        }
    })
    .factory('MovieListService', function ($http) { //service included as parameter to controller
//  
        $http.defaults.useXDomain = true;
        return {
            getList: getList,
            getById: getById,
			getTrailerById: getTrailerById,
            getFavoritesList: getFavoritesList,
            postFavorite: postFavorite,
            deleteFavorite: deleteFavorite
        };

        function getList(url) {
            return $http.get('/movies', {//return a list of movies based on string search field
                params: {url: url}   //url built in controller
            });
        };

        function postFavorite(movie) { //save a movie to the persistence layer, sent to server
            return $http.post('/favorites', movie); //movie json object sent along with post
        };

        function deleteFavorite(movie) {
            return $http.delete('/deleteFavorite', { //resource on server side, send imdbID as parameter
                params: {imdbID: movie.imdbID}
            });
        };

        function getFavoritesList(url) { //return a list of favourite movies, sent to server side
            return $http.get(url)
        };

        function getById(url) {           //get a movie with imdbID included in the url, constructed in the controller
            return $http.get('/movieDetails', {
				params: {url: url}    
            });					       
        };
		 
		function getTrailerById(url) {           //get a movie trailer with imdbID included in the url, constructed in the controller
           return $http.get('/movieTrailer', {   //url built in controller
                params: {url: url}            
            });
        }; 
    });