
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("OrderController", OrderController);


    function OrderController(httpService,  $stateParams) {

        var vm = this;
        vm.order = new UserOrder();
        vm.showLargeImage = showLargeImage;

        activate();

        function activate() {
            vm.order.ID = $stateParams.orderId;
            getOrder(vm.order.ID);
        }
        function getOrder(orderId) {
            httpService.getOrderByID(orderId)
                       .then(getOrderSucceded);
        }
        function getOrderSucceded(data) {
            vm.order.Pictures = data.Pictures;
            vm.order.Username = data.Username;
            vm.order.Comment = data.Comment;
        }

        function showLargeImage(path) {
            document.getElementById('viewer').innerHTML =
                "<div class='closeBtn' onclick='link.closeImageViewer()'>Закрити <strong>X</strong>" +
                "</div><img width='70%'  src='" + path + "'/>";
        }
    }

})()