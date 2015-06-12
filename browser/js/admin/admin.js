app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
        	user: function (AuthService) {
        		return AuthService.getLoggedInUser()
        	}
        }
    });

    $stateProvider.state('admin.users', {
        url: '/admin/users/:id',
        templateUrl: 'js/admin/substates/users.html',
        controller: 'AdminUsersCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            users: function (UsersFactory) {
                return UsersFactory.getUsers()
            }
        }
    });

    $stateProvider.state('admin.artwork', {
        url: '/admin/artwork',
        templateUrl: 'js/admin/substates/artwork.html',
        controller: 'AdminArtworkCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            artwork: function (ProductFactory) {
                return ProductFactory.getProduct()
            },
            categories: function (CategoryFactory) {
                return CategoryFactory.getCategories()
            }
        }
    });

    $stateProvider.state('admin.reviews', {
        url: '/admin/reviews',
        templateUrl: 'js/admin/substates/reviews.html',
        controller: 'AdminReviewsCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            artwork: function (ProductFactory) {
                return ProductFactory.getProduct()
            },
            categories: function (CategoryFactory) {
                return CategoryFactory.getCategories()
            }
        }
    });

    $stateProvider.state('admin.events', {
        url: '/admin/events',
        templateUrl: 'js/admin/substates/events.html',
        controller: 'AdminEventsCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            },
            events: function (EventsFactory) {
                return EventsFactory.getEvents()
            }
        }
    });

    $stateProvider.state('admin.orders', {
        url: '/admin/orders',
        templateUrl: 'js/admin/substates/orders.html',
        controller: 'AdminOrdersCtrl',
        resolve: {
            user: function (AuthService) {
                return AuthService.getLoggedInUser()
            }
        }
    });

});

app.controller('AdminCtrl', function ($scope, user, $state) {

    $scope.user = user

});

app.controller('AdminUsersCtrl', function ($scope, $stateParams, user, users, UsersFactory, $state) {

    $scope.user = user
    $scope.users = users 

    $scope.getSingleUser = UsersFactory.getUsers($stateParams.id)


});

app.controller('AdminArtworkCtrl', function ($scope, user, artwork, categories, ProductFactory, $state) {

    $scope.user = user
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    }

});

app.controller('AdminReviewsCtrl', function ($scope, user, artwork, categories, ReviewsFactory, ProductFactory, $state) {

    $scope.user = user
    $scope.products = artwork;
    $scope.categories = categories;

    $scope.reviews = {}

    $scope.filterProducts = function(){
        var categoryId = $scope.categoryName._id
        ProductFactory.getProduct(categoryId).then(function(response){
            $scope.products = response;
        }); 
    }

    $scope.getReview = function (id) {
        ReviewsFactory.getReviews(id)
        .then(function (review) {
            console.log(review)
            $scope.reviews[id] = review
        })
    }

});

app.controller('AdminEventsCtrl', function ($scope, user, events, $state) {

    $scope.user = user
    $scope.events = events

});

app.controller('AdminOrdersCtrl', function ($scope, user, $state) {

    $scope.user = user

});