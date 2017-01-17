var link = (function () {

    return {
        closeImageViewer: closeImageViewer,
        goToContacts: goToContacts,
        goToGallery: goToGallery,
        goToHome: goToHome,
        goToServices: goToServices,
        login: login,
        redirect: redirect,

    }
    function goToContacts() {
        //hideGallery();
        document.getElementById('contactsLink').click();
    }
    function goToGallery() {
        //showGallery();
        document.getElementById('galleryLink').click();
    }
    function goToHome() {
        //hideGallery();
        document.getElementById('homeLink').click();
    }
    function goToServices() {
        //hideGallery();
        document.getElementById('servicesLink').click();
    }
    function login() {
        //hideGallery();
        document.getElementById('loginLink').click();
    }

    function hideGallery() {
        if (document.getElementById('wrapper').className === '')
            document.getElementById('wrapper').className = 'Invisible';
    }
    function showGallery() {
        if (document.getElementById('wrapper').className === 'Invisible')
            document.getElementById('wrapper').className = '';
    }
    function redirect(value) {
        switch (value) {
            case 'contacts':
                goToContacts();
                break;
            case 'gallery':
                goToGallery();
                break;
            case 'services':
                goToServices();
                break;
            case 'home':
                goToHome();
                break;
            case 'login':
                login();
                break;
            case '0':
                break;
            default:
                alert('Виникла помилка. Спробуйте пiзнiше.');
        }
    }
    function closeImageViewer() {
        document.getElementById('viewer').innerHTML = "";
    }
})();