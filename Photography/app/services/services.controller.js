
(function () {
    'use strict';
    angular.module("photography.app")
           .controller("ServicesController", ServicesController);


    function ServicesController(httpService, $window) {

        var vm = this;
        vm.article = new Article(null, null, "Послуги");

        activate();

        function activate() {
            httpService.getArticleByPageName(vm.article.PageName)
                       .then(onSuccess);
        }

        function onSuccess(article) {
            vm.article.Text = article.Text;
        }
    }

})()