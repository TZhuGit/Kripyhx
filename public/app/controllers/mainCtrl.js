angular.module('mainController', ['authServices'])

.controller('mainCtrl', function (Auth, $timeout, $location){
    var app = this;

    if(Auth.isLoggedIn()){
        console.log('Success: User is logged in.');
    } else {
        console.log('Faliure: User is not logged in');
    }

    this.doLogin = function(loginData){
        app.loading = true;
        app.strErrorMsg = false;
        app.strSuccessMsg = false;
        
        Auth.login(app.loginData).then(function(data){
            if (data.data.success){
                app.loading = false;
                app.strSuccessMsg = data.data.message + '... Redirecting';

                $timeout(function(){
                    $location.path('/about');
                }, 2000);
            } else {
                app.loading = false;
                app.strErrorMsg = data.data.message;
            }
        });
    };

    this.logout = function(){
        Auth.logout();
        $location.path('/logout');
        $timeout(function(){
            $location.path('/');
        }, 2000);
    };
});

