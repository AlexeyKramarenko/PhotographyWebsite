<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="page.aspx.cs" Inherits="Photography.WebForm1" %>
<%@ Import Namespace="System.Web.Optimization" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="Scripts/angular.pagelinks.decorator.js"></script>
    <script type="text/javascript" src="Scripts/list.js"></script> 
    <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' />
    <meta name='description' content='' />
    <meta name='keywords' content='' />
    <meta name='revisit-after' content='1 days' />
    <meta http-equiv="Content-Type" content="text/html; charset=cp1251" />

    <%--<title>@ViewBag.Title</title>--%>
</head>

<body class='greyTheme home page page-id-63 page-template page-template-template-front-php'>
    <form id="form1" runat="server">
        <% Scripts.Render("~/bundles/angular_js"); %>
        <% Styles.Render("~/Content/dark_theme_styles"); %>
        <% Scripts.Render("~/bundles/dark_theme_scripts"); %>
    </form>
    <!--Page preloader begin-->
    <link href="Content/page.preloader.css" rel="stylesheet" />
    <div id="page-preloader"><span class="spinner"></span></div>
    <script type="text/javascript" src="Scripts/page.preloader.js"></script>
    <!--Page preloader end-->
    <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
         chromium.org/developers/how-tos/chrome-frame-getting-started -->
    <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href='http://browsehappy.com/'>Upgrade to a different browser</a> or <a href='http://www.google.com/chromeframe/?redirect=true'>install Google Chrome Frame</a> to experience this site.</p><![endif]-->
    <header class="darkTheme">
        <div id="logoPlaceholder">
            <div id="logo">
                <div id="author">Олег Крамаренко</div>
                <div id="name">фотографiя</div>
            </div>
        </div>
        <nav>
            <div class='navleft'>
                <div class='navleft-wrapper'>
                    <div class='menu-top-left-container'>
                        <ul id='menu-top-left' class='menu'>
                            <li id='menu-item-563' class='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-563 bgnav'>
                                <a onclick="link.login()"><h3>Увiйти</h3></a>
                            </li>
                            <li id='menu-item-598' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-598 bgnav'>
                                <a onclick="link.goToContacts()"><h3>Контакти</h3></a>
                            </li>
                            <li id='menu-item-597' class='menu-item menu-item-type-post_type menu-item-object-page menu-item-597 bgnav'>
                                <a onclick="link.goToServices()"><h3>Послуги</h3></a>
                            </li>
                            <li id='menu-item-566' class='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-566 bgnav'>
                                <a onclick="link.goToGallery()"><h3>Галерея</h3></a>
                            </li>
                            <li id='menu-item-564' class='menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-564 bgnav'>
                                <a onclick="link.goToHome()"><h3>Головна</h3></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <div class='navselect'>
            <select id="search" onchange="link.redirect(this.value)">
                <option value='0'>Пошук ...</option>
                <option value='home'>Головна</option>
                <option value='gallery'>Галерея</option>
                <option value='services'>Послуги</option>
                <option value='login'>Увiйти</option>
                <option value='contacts'>Контакти</option>
            </select>
        </div>
    </header>

    <!-- Angular Code -->
    <div ng-app="photography.app">
        <nav>
            <a id='homeLink' ui-sref="home"></a>
            <a id='contactsLink' ui-sref="contacts"></a>
            <a id='galleryLink' ui-sref="gallery"></a>
            <a id='loginLink' ui-sref="login"></a>
            <a id='servicesLink' ui-sref="services"></a>
        </nav>
        <ui-view></ui-view>
    </div>


    <footer class="darkTheme">
        <nav class='foot-left'>
            <ul>

                <li>
                    <a onclick="link.goToHome()">
                        <i class='misc-home'></i>
                        <div class='text-social'>головна</div>
                    </a>
                </li>


                <li>
                    <a onclick="link.goToContacts()">
                        <i class='misc-mail'></i>
                        <div class='text-social'>контакти</div>
                    </a>
                </li>

            </ul>
        </nav>
        <nav class='foot-right'>
            <ul>
                <li>
                    <a href='http://facebook.com' target='_blank'>
                        <i class='social-facebook'></i>
                        <div class='text-social'>facebook</div>
                    </a>
                </li>

                <li>
                    <a href='http://twitter.com' target='_blank'>
                        <i class='social-twitter'></i>
                        <div class='text-social'>twitter</div>
                    </a>
                </li>

            </ul>
        </nav>

        <p class='footercopy'>
        </p>

    </footer>




    <script type="text/javascript" src="//cdn.tinymce.com/4/tinymce.min.js"></script>

    <!-- Head Libs -->
    <script type="text/javascript" src="Scripts/unitegallery/modernizr.js"></script>
    <!--[if IE]>
        <link rel='stylesheet' href='css/ie.css'>
    <![endif]-->
    <!--[if lte IE 8]>
        <script src='Scripts/respond.js'></script>
    <![endif]-->
    <script type="text/javascript" src='Scripts/unitegallery/bootstrap.js'></script>
    <script type="text/javascript" src='Scripts/unitegallery/prism.js'></script>
    <script type="text/javascript" src='Scripts/unitegallery/theme.plugins.js'></script>
    <script type="text/javascript" src='Scripts/unitegallery/theme.js'></script>
    <script type="text/javascript" src='Scripts/unitegallery/custom.js'></script>

    <!-- Include Unite Gallery -->
    <script src="Scripts/unitegallery/unitegallery.min.js"></script>
    <link rel='stylesheet' href='Content/unitegallery/unite-gallery.css' type='text/css' />
    <script src="Scripts/unitegallery/ug-theme-tiles.js"></script>
</body>
</html>
