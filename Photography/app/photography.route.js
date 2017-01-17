
(function () {

    angular.module('photography.app')
           .config(config);

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        //#region public pages
        $stateProvider.state('home',
            {
                url: "/",
                templateUrl: "/app/home/home.html",
                controller: 'HomeController',
                controllerAs: 'vm',
                css: ['/app/home/home.css']
            });
        $stateProvider.state('gallery',
            {
                url: "/gallery",
                templateUrl: "/app/gallery/gallery.html",
                controller: 'GalleryController',
                controllerAs: 'vm',
                css: ['/app/gallery/gallery.css']
            });
        $stateProvider.state('services',
          {
              url: "/services",
              templateUrl: "/app/services/services.html",
              controller: 'ServicesController',
              controllerAs: 'vm',
              css: ['/app/services/services.css']
          });
        $stateProvider.state('contacts',
            {
                url: "/contacts",
                templateUrl: "/app/contacts/contacts.html",
                controller: 'ContactsController',
                controllerAs: 'vm',
                css: ['/app/contacts/contacts.css']
            });
        $stateProvider.state('login',
            {
                url: "/login",
                templateUrl: "/app/login/login.html",
                controller: 'LoginController',
                controllerAs: 'vm',
                css: ['/app/login/login.css']
            });
         
        $stateProvider.state('not_found',
            {
                url: '/not_found',
                templateUrl: '/app/not.found/not.found.html',
                controller: 'NotFoundController',
                controllerAs: 'vm',
                css: ['/app/not.found/not.found.css']
            });

        $stateProvider.state('user_gallery',
            {
                url: '/user_gallery/:galleryId',
                templateUrl: '/app/user.gallery/user.gallery.html',
                controller: 'UserGalleryController',
                controllerAs: 'vm',
                css: ['/app/user.gallery/user.gallery.css']
            });
        //#endregion

        //#region admin pages

        $stateProvider.state('admin',
            {
                url: '/admin',
                templateUrl: '/app/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'vm',
                css: ['/app/admin/admin.css']
            });
        $stateProvider.state('add_user',
            {
                parent: 'admin',
                url: '/add_user',
                templateUrl: '/app/admin/add.user/add.user.html',
                controller: 'AddUserController',
                controllerAs: 'vm',
                css: ['/app/admin/add.user/add.user.css',
                      '/app/admin/admin.css']
            });
        $stateProvider.state('add_photo_to_gallery_page',
            {
                parent: 'gallery_page',
                url: "/add_photo_to_gallery_page/:galleryId",
                templateUrl: "/app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.html",
                controller: 'AddPhotoToGalleryPageController',
                controllerAs: 'vm',
                css: ['/app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.css',
                      '/app/admin/admin.css',
                      '/app/admin/gallery.page/gallery.page.css']
            });
        $stateProvider.state('add_photo_to_user_gallery_page',
            {
                parent: 'admin',
                url: "/add_photo_to_gallery_page/:galleryId",
                templateUrl: "/app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.html",
                controller: 'AddPhotoToGalleryPageController',
                controllerAs: 'vm',
                css: ['/app/admin/add.photo.to.gallery.page/add.photo.to.gallery.page.css',
                      '/app/admin/admin.css',
                      '/app/admin/gallery.page/gallery.page.css']
            });
        $stateProvider.state('edit_gallery_page',
            {
                parent: 'gallery_page',
                url: '/edit_gallery_page/:galleryId',
                templateUrl: '/app/admin/edit.gallery.page/edit.gallery.page.html',
                controller: 'EditGalleryPageController',
                controllerAs: 'vm',
                css: ['/app/admin/edit.gallery.page/edit.gallery.page.css',
                      '/app/admin/admin.css',
                      '/app/admin/gallery.page/gallery.page.css']
            });
        $stateProvider.state('edit_user_gallery_page',
            {
                parent: 'admin',
                url: '/edit_gallery_page/:galleryId',
                templateUrl: '/app/admin/edit.gallery.page/edit.gallery.page.html',
                controller: 'EditGalleryPageController',
                controllerAs: 'vm',
                css: ['/app/admin/edit.gallery.page/edit.gallery.page.css',
                      '/app/admin/admin.css',
                      '/app/admin/gallery.page/gallery.page.css']
            });
        $stateProvider.state('edit_service_page',
            {
                parent: 'admin',
                url: '/edit_service_page',
                templateUrl: '/app/admin/edit.service.page/edit.service.page.html',
                controller: 'EditServicePageController',
                controllerAs: 'vm',
                css: ['/app/admin/edit.service.page/edit.service.page.css',
                      '/app/admin/admin.css']
            });
        $stateProvider.state('gallery_page',
           {
               parent: 'admin',
               url: '/gallery_page/:galleryId',
               templateUrl: '/app/admin/gallery.page/gallery.page.html',
               controller: 'GalleryPageController',
               controllerAs: 'vm',
               css: ['/app/admin/gallery.page/gallery.page.css',
                     '/app/admin/admin.css']
           });
       
        $stateProvider.state('order',
            {
                parent: 'admin',
                url: '/order/:orderId',
                templateUrl: '/app/admin/order/order.html',
                controller: 'OrderController',
                controllerAs: 'vm',
                css: ['/app/admin/order/order.css',
                      '/app/admin/admin.css']
            });

        $stateProvider.state('order_list',
            {
                parent: 'admin',
                url: '/order_list',
                templateUrl: '/app/admin/order.list/order.list.html',
                controller: 'OrderListController',
                controllerAs: 'vm',
                css: ['/app/admin/order.list/order.list.css',
                      '/app/admin/admin.css']
            });

        $stateProvider.state('user_list',
            {
                parent: 'admin',
                url: '/user_list',
                templateUrl: '/app/admin/user.list/user.list.html',
                controller: 'UserListController',
                controllerAs: 'vm',
                css: ['/app/admin/user.list/user.list.css',
                      '/app/admin/admin.css']
            });
        //#endregion
         


        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
})()

 