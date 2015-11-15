angular.module('movieDBServices',[])
.factory('MovieListService',function($http) { //service included as parameter to controller
//  
    $http.defaults.useXDomain = true;
    return  {
            getList: getList,
            getById: getById,
            getFavoritesList: getFavoritesList,
            postFavorite: postFavorite,
            deleteFavorite: deleteFavorite
        };

    function getList(url){
        return $http.get('/movies', {//return a list of movies based on string search field
            params: { url: url }   //url built in controller
        });
      };

    function postFavorite(movie){ //save a movie to the persistence layer, sent to server
        return $http.post('/favorites', movie); //movie json object sent along with post
    };

    function deleteFavorite(movie){
        return $http.delete('/deleteFavorite', { //resource on server side, send imdbID as parameter
            params: {imdbID: movie.imdbID}
        });
    };

    function getFavoritesList(url){ //return a list of favourite movies, sent to server side
        return $http.get(url)
    };

    function getById(url){           //get a movie with imdbID included in the url, constructed in the controller
        return $http.get(url);       //url of form https://omdbapi.com?t=<imdbID>&r-json&tomatoes=true
      };                             //tomatoes parameter give more details on movie
  });