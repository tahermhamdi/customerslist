var myApp = angular.module("myApp", []);
myApp.controller("AppCtrl", [
    "$scope",
    "$http",
    function($scope, $http) {
        var refresh = function() {
            $http.get("/customerslistapp").then(function(response) {
                $scope.customerslist = response.data;
                $scope.customer = null;
            });
        };

        refresh();

        $scope.addCustomer = function() {
            console.log($scope.customer);
            $http
                .post("/customerslistapp", $scope.customer)
                .then(function(response) {
                    console.log(response);
                    refresh();
                });
        };

        $scope.remove = function(id) {
            console.log(id);
            $http.delete("/customerslistapp/" + id).then(function(response) {
                refresh();
            });
        };

        $scope.edit = function(id) {
            console.log(id);
            $http.get("/customerslistapp/" + id).then(function(response) {
                $scope.customer = response.data;
            });
        };

        $scope.update = function() {
            console.log($scope.customer._id);
            $http
                .put(
                    "/customerslistapp/" + $scope.customer._id,
                    $scope.customer
                )
                .then(function(response) {
                    refresh();
                });
        };

        $scope.deselect = function() {
            $scope.customer = "";
        };
    }
]);
