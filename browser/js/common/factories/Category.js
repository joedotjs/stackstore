app.factory('CategoryFactory', function($http){
	return{
		getCategories: function(){
			
			return $http.get('/api/category').then(function(response){
				console.log('i got the categories!', response)
				return response.data;
			})
		}
	}
})