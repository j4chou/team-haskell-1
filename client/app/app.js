angular.module('myApp', ['myApp.signin',
  'myApp.landing',
  'myApp.signup',
  'myApp.cardio',
  'myApp.cardioModal',
  'myApp.profile',
  'myApp.nutrition',
  'myApp.nutritionModal',
  'myApp.strength',
  'myApp.strengthModal',
  'myApp.bet',
  'ui.router',
  'factories',
  'myApp.dashboard',
  'myApp.modal',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'myApp.social',
  'myApp.socialFactoryModule',
  'myApp.goals',
  'angular-filepicker'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('landing')

    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: '/app/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: '/app/signin/signin.html',
        controller: 'SigninCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/app/profile/profile.html',
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .state('landing', {
        url: '/landing',
        templateUrl: '/app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .state('cardio', {
        url: '/cardio',
        templateUrl: '/app/fitness/cardio.html',
        controller: 'CardioCtrl',
        authenticate: true
      })
      .state('strength', {
        url: '/strength',
        templateUrl: '/app/fitness/strength.html',
        controller: 'StrengthCtrl',
        authenticate: true
      })
      .state('registerProfile', {
        url: '/registerProfile',
        templateUrl: '/app/signup/registerProfile.html',
        controller: 'SignupCtrl',
        authenticate: true
      })
      .state('nutrition', {
        url: '/nutrition',
        templateUrl: '/app/nutrition/nutrition.html',
        controller: 'NutritionCtrl',
        authenticate: true
      })
      .state('nutritionModal', {
        url: '/nutritionModal',
        templateUrl: '/app/nutrition/nutritionModal.html',
        controller: 'NutritionModalCtrl',
        authenticate: true
      })
      .state('social', {
        url: '/social',
        templateUrl: '/app/social/social.html',
        controller: 'socialCtrl',
        authenticate: true
      })
      .state('chatRoom', {
        params: null,
        url: '/chatRoom',
        templateUrl: '/app/social/chat.html',
        controller: 'chatCtrl',
        authenticate: true
      })
      .state('bet', {
        url: '/bet',
        templateUrl: '/app/bet/bet.html',
        controller: 'betCtrl',
        authenticate: true
      })
  })

  .config(function ($httpProvider, filepickerProvider) {
    filepickerProvider.setKey(fileStackAPI)
    $httpProvider.defaults.headers.common['Access']
    // $httpProvider.defaults.useXDomain = true
    // $http.defaults.headers.common['Access-Control-Allow-Credentials'] = true
    // $httpProvider.defaults.headers.common['Access-Control-Allow-Method'] = 'GET, POST, PUT, DELETE'
    // $http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Authorization'

    // delete $httpProvider.defaults.headers.common['X-Requested-With']


    $httpProvider.interceptors.push(function ($timeout, $q, $cookies, $injector) {

      return {
   //      request: function (config) {
   //        config.headers['Token'] = $cookies.get('token')
   //        config.headers.Authorization = "Bearer " + $cookies.get('token')
   //        return config
   //      },
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $injector.get('$state').transitionTo('landing')
            return $q.reject(rejection)
          }
        }
      }
    })
  })

  .run(function ($rootScope, $state, authFactory, $cookies) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.authenticate
      if (requireLogin && authFactory.getToken() === null) {
        event.preventDefault()
        $state.go('landing')
      }
      else if (requireLogin && !authFactory.isAuth()) {
        $cookies.remove('username')
        $cookies.remove('token')
        event.preventDefault()
        $state.go('landing')
      }
    })
  })
