var model = [
    {
        text:'make presentation',
        done: true        
    },
     {
        text:'finish app',
        done: false
    },
    
];
angular.module('myToDoApp', ['contenteditable'])
    .controller('myToDoAppController', function($scope) {
    // controller code goes here
    
    $scope.model = model;
    
    $scope.markAsDone = function(index) {
        $scope.model[index].done = true;
        console.log('$scope.model:');
        console.log($scope.model);
    }
    
    $scope.removeToDo = function(index) {
        $scope.model.splice(index, 1);
        console.log('$scope.model:');
        console.log($scope.model);
        
    }
    $scope.addToDo = function() {
        var newItem = {
            text: '',
            done: false
        }
        $scope.model.push(newItem);
        console.log('$scope.model:');
        console.log($scope.model);
    }
});