
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("ContactsController", ContactsController);


    function ContactsController(httpService, $window) {

        var vm = this;
        vm.msg = new Message();
        vm.submitMessage = submitMessage;

        function submitMessage() {
            httpService.postMessage(vm.msg)
                       .then(onSuccess, onError);
        }
        function onSuccess(text) {
            alert(text);
            vm.msg.Name = "";
            vm.msg.Email = "";
            vm.msg.Text = "";
        }
        function onError(error) {
            $window.alert('Виникли деякi помилки. Спробуйте пiзнiше.');
        }
    }

})()