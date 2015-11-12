angular.module('movieDBServices',[])
.factory('MovieListService',function($http) {
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
        return $http.get('/movies', {
            params: { url: url }
        });
      };

    function postFavorite(movie){
        return $http.post('/favorites', movie);
    };

    function deleteFavorite(movie){
        return $http.delete('/deleteFavorite', {
            params: {imdbID: movie.imdbID}
        });
    };

    function getFavoritesList(url){
        return $http.get(url)
    };

    function getById(url){
        return $http.get(url);          
      };
  });