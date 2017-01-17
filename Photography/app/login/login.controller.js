
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("LoginController", LoginController);


    function LoginController(httpService, $window, $state) {

        var vm = this;
        vm.login = new Login();
        vm.loginUser = loginUser;

        function loginUser() {
            httpService.loginUser(vm.login)
                       .then(redirect)
                       .catch(onError);
        }

        function redirect(data) {
            if (data.error) {
                $window.alert(data.error);
            }
            else if (data.isAdmin === true)
                $state.go("admin");

            else {
                $state.go("user_gallery", { galleryId: data.galleryId });
            }
        }

        function onError(error) {
            $window.alert("Ви ввели невiрне iм'я або пароль.");
        }
    }

})()