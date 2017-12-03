angular.module('userControllers', ['userServices'])

.controller('regCtrl', function($http, $location, $timeout, User){
    var app = this;

    this.regUser = function (regData){
        app.loading = true;
        app.strErrorMsg = false;
        app.strSuccessMsg = false;

        User.create(app.regData).then(function(data){
            if (data.data.success){
                app.loading = false;
                app.strSuccessMsg = data.data.message + '... Redirecting';
                $timeout(function(){
                    $location.path('/');
                }, 2000);
            } else {
                app.loading = false;
                app.strErrorMsg = data.data.message;
            }
        });
    };
});