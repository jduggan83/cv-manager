/**
 * Created by DugganJ on 10/11/2015.
 */
app.controller('menuCtrl', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
    var self = this;
    self.active = "upload";

    $rootScope.$on('$locationChangeSuccess', function () {
        var path = $location.path();
        self.active = path.slice(1);
    });
}]);