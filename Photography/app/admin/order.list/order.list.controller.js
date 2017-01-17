
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("OrderListController", OrderListController);


    function OrderListController(httpService, $window) {

        var vm = this;
        vm.items = [];
        vm.removeOrder = removeOrder;

        activate();

        function activate() {
            getOrderList();
        }

        function getOrderList() {

            httpService.getOrderList()
                       .then(getOrderListSucceded);            
        }
        function getOrderListSucceded(items) {

            for (var i = 0; i < items.length; i++) {
                var jsonDate = items[i].OrderDate.toString();
                var date = new Date(parseInt(jsonDate.substr(6)));
                items[i].FormatedOrderDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
            }

            vm.items = items;
        }

        function removeOrder(orderId) {
            httpService.deleteOrderByID(orderId)
                       .then(function (msg) { removeOrderSucceded(msg, orderId); });
        }
        function removeOrderSucceded(msg,orderId) {
            $window.alert(msg);
            for (var i = 0; i < vm.items.length; i++) {
                if (vm.items[i].ID == orderId) {
                    vm.items.splice(i, 1);
                    return;
                }
            }
        }
    }

})()