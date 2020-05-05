document.addEventListener('DOMContentLoaded', function() {
    onLoad.loadingOn();
    onLoad.includeHTML();
    onLoad.checkUrl();
    onLoad.navUrl();
    $(document).ready(function () {
        onLoad.getLabels();
        onLoad.checkTheme();
        onLoad.checkOs();
        onLoad.chrCheck();
        //onLoad.fetchHeaderAndFooter();
        afterLoad.changeLanguage();
        afterLoad.backToTop();
        afterLoad.playAnimations();
        afterLoad.numberCounter();
        afterLoad.featuresSlider();
    });

});

let onLoad = (function () {

    let includeHTML = function(){
        let z, i, element, file, xhttp;
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            element = z[i];
            file = $(element).attr('data-import');
            if (file) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        if (this.status === 200) {element.innerHTML = this.responseText;}
                        if (this.status === 404) {element.innerHTML = "Page not found.";}
                        $(element).removeAttr('data-import');
                        includeHTML();
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                return;
            }
        }
    };

    let loadingOn = function(){
        $(window).on('load', function(){
            setTimeout(removeLoader, 500);
        });
        function removeLoader(){
            $( "#loading" ).fadeOut(200, function() {
                $('html,body').animate({scrollTop: 0}, 0);
                $( "#loading" ).remove();
                $('.container-wrapper,.old').each(function(){
                    $(this).css("display","block");
                });
            });
        }
    };

    let charCheck =  function(){

        setTimeout(function(){
            let isArabic =  /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]/;
            if($('.container-wrapper').hasClass('ar')){
                $('span').each(function(){
                    if(isArabic.test($(this).text())){

                    }else{
                        $(this).addClass('english');
                    }
                });
            }
        }, 200);


        /*$('span').each(function( index ) {


            if(isArabic.test(str)){
                alert('is arabic')
            }else{
                alert($(this).html())
            }

        });*/
    };

    /*let fetchHeaderAndFooter = function(){
        $('[data-import]').each(function() {
            let path = $(this).attr('data-import');
            let id = $(this).attr('id');
            fetch(path)
            .then(response => {
                return response.text()
            })
            .then(data => {
                document.querySelector(id).innerHTML = data;
            });
        });
    };*/

    let checkUrl = function(){
        let url = window.location.toString();
        if( url.includes("-ar")){
            $.cookie('language', 'ar', { expires: 7, path: '/' });
            $('.container-wrapper').removeClass("en").addClass("ar");
            $('html').attr('lang','ar');
        }
        else {
            $.cookie('language', 'en', { expires: 7, path: '/' });
            $('.container-wrapper').removeClass("ar").addClass("en");
            $('html').attr('lang','en');
        }
    };

    let checkTheme = function(){
        let theme = $.cookie('theme');
        if (theme === undefined) {
            $.cookie('theme', '1', { expires: 7, path: '/' });
            $('body').addClass('theme1');
        }
        else{
            $('body').addClass("theme"+theme);
        }
    };

    let navUrl = function () {

        $(window).on('load', function(){
            setTimeout(navigations, 500);
        });

        function navigations() {
            $('.link').each(function () {
                var link = $(this).attr('href');
                if ($('.container-wrapper').hasClass("en")) {
                    $(this).attr('href', link + '-en.html');
                } else {
                    $(this).attr('href', link + '-ar.html');
                }
            });
        }

    };

    var getLabels = function(){

        var labelsEn = {
            home: "Home",
            marketAndContent : "Market & Content Data Feed",
            contactUs : "Contact Us",
            aboutUs : "About Us",
            investorRelations : "IR Solutions",
            investorRelationsSolutions : "IR Solutions",
            marketDataFeed:"Market Data Feed",
            moreAboutUs: "More About Us",
            moreAboutUsAr: "المزيد عنا",
            profile: "Profile",
            eStore: "EStore",
            downloads: "Downloads",
            marketDataProducts:"Market Data Products",
            directFNIR:"DirectFN™ IR",
            pro10:"DirectFN™ Pro 10",
            net:"DirectFN™ NET",
            iPhone:"DirectFN™ iPhone",
            androidPhone:"DirectFN™ Android Phone",
            windowsPhone:"DirectFN™ Windows Phone",
            iPad:"DirectFN™ iPad",
            androidTab:"DirectFN™ Android Tab",
            windowsSurface:"DirectFN™ For Windows Surface",
            brokerageTradingSolutions:"Brokerage & Trading Solutions",
            totalBrokerageSolution:"Total Brokerage Solution",
            dealerTerminal:"Dealer Terminal",
            traderWorkstation:"Trader Workstation (TWS)",
            tradeWeb:"TradeWeb (RIA)",
            mobiles:"Mobiles",
            assetManagement:"Asset Management",
            decypha:"Decypha",
            integrations:"B2B Integrations",
            dataFeedServices:"Data Feed Services",
            marketCoverage:"Market Coverage",
            privacyPolicy:"Privacy Policy",
            endUserAgreement:"End User Agreement",
            findOutMore:"Find Out More",
        };

        var labelsAr = {
            home: "الصفحة الرئيسية",
            marketAndContent : "تغذية بيانات السوق والمحتوى",
            contactUs : "اتصل بنا",
            aboutUs : "معلومات عنا",
            investorRelations : "علاقات المستثمرين",
            investorRelationsSolutions : "حلول علاقات المستثمرين",
            marketDataFeed:"تغذية بيانات السوق",
            moreAboutUs: "More About Us",
            moreAboutUsAr: "المزيد عنا",
            profile: "من نحن",
            eStore: "المتجر الإلكتروني",
            downloads: "تحميل",
            marketDataProducts:"منتجات بيانات الأسواق",
            directFNIR:"علاقات المستثمرين",
            pro10:"DirectFN™ برو 10",
            net:"DirectFN™ نت بلس",
            iPhone:"DirectFN™ آي فون",
            androidPhone:"DirectFN™ هواتف الأندرويد",
            windowsPhone:"DirectFN™ لهواتف ويندوز",
            iPad:"DirectFN™ آي باد",
            androidTab:"DirectFN™ أندرويد اللوحي",
            windowsSurface:"DirectFN™ ويندوز سيرفس",
            brokerageTradingSolutions:"حلول الوساطة & التداول",
            totalBrokerageSolution:"حلول الوساطة",
            dealerTerminal:"بوابة المستثمر",
            traderWorkstation:"منصة الوسيط (TWS)",
            tradeWeb:"التداول عبر الويب (RIA)",
            mobiles:"الهواتف الذكية",
            assetManagement:"إدارة الأصول",
            decypha:"Decypha",
            integrations:"منتجات التغطية والبيانات",
            dataFeedServices:"خدمات البيانات",
            marketCoverage:"تغطية السوق",
            privacyPolicy:"سياسة الخصوصية",
            endUserAgreement:"إتفاقية المستخدم النهائي",
            findOutMore:"اكتشف المزيد",
        };

        let array, a, element, label, language;
        array = document.getElementsByTagName("*");
        setTimeout(function(){
            for (a = 0; a < array.length; a++) {
                element = array[a];
                language = $('html').attr('lang');
                label = $(element).attr('data-label');
                if (label) {
                    if ( language === 'en' ) {
                        $(element).html(labelsEn[label]);
                    } else {
                        $(element).html(labelsAr[label]);
                    }
                    $(element).removeAttr('data-label');
                    getLabels();
                }
            }
        }, 200);

    };

    let checkOs = function () {
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            $('html').addClass("ios");
        } else if (/android|Android/.test(navigator.userAgent)) {
            $('html').addClass("android");
        } else if (/Win/.test(navigator.userAgent)) {
            $('html').addClass("desktop");
        }
    };

    return{

        loadingOn: function() {
            loadingOn();
        },

        navUrl: function() {
            navUrl();
        },

        checkUrl: function() {
            checkUrl();
        },

        checkTheme: function() {
            checkTheme();
        },

        checkOs: function () {
            checkOs();
        },

        chrCheck: function () {
            charCheck();
        },

        // fetchHeaderAndFooter: function () {
        //     fetchHeaderAndFooter();
        // },

        includeHTML: function () {
            includeHTML();
        },

        getLabels: function() {
            getLabels();
        },
    }

})();

let afterLoad = (function () {

    let tabClick = function(event, menuParm) {

        $('#iframe').each(function() {

            $(this).css("display","none");

            let defaultPath = 'directfn-assets/images/ir-screeners', link = '';

            generateUrl (menuParm,this);

            function generateUrl(menuName,$this){

                if($('.container-wrapper').hasClass('ar')){
                    link = defaultPath+'/ar/'+menuName;
                }else {
                    link = defaultPath+'/en/'+menuName;
                }

                setTimeout(function(){
                    $($this).css({"background-image":"url("+link+")", "display":"block"});
                }, 0);

            }

        });
    };

    let changeLanguage = function() {
        $('body').on('click','.language-btn',function() {
            let language = $(this).attr('value');
            $.cookie('language', language, { expires: 7, path: '/' });
            let url = window.location.toString();
            if(language === "ar"){
                let goUrl = url.replace("-en", "-ar");
                window.open(goUrl, "_top");
            }else {
                let goUrl = url.replace("-ar", "-en");
                window.open(goUrl, "_top");
            }
        });
    };

    let backToTop = function() {
        let offset = 0;
        let duration = 1000;
        $(window).scroll(function () {
            if ($(this).scrollTop() > offset) {
                $('.back-to-top').fadeIn(duration);
                $('body').addClass("scroll");
            } else {
                $('.back-to-top').fadeOut(duration);
                $('body').removeClass("scroll");
            }
        });

        $('.back-to-top').click(function (event) {
            event.preventDefault();
            $('html, body').animate({scrollTop: 0}, duration);
            return false;
        })
    };

    /*let onScrollPlay = function(){

        let offset = window.innerHeight;

        for( let i = 0; i< document.querySelectorAll('.animated-block').length; i++ ){

            let el = document.querySelectorAll('.animated-block')[i];

            if( el.getBoundingClientRect().top < offset ){
                if( !el.classList.contains('play') ){
                    el.classList.add('play');
                }
            }else{
                el.classList.remove('play');
            }

        }

    };*/

    let onScrollPlay = function(){

        let offset = window.innerHeight;

        for( let i = 0; i< document.querySelectorAll('.animated-block').length; i++ ){

            let el = document.querySelectorAll('.animated-block')[i];

            if( el.getBoundingClientRect().top < offset ){
                if( !el.classList.contains('play') ){
                    el.classList.add('play');
                }
            }else{
                el.classList.remove('play');
            }

        }

    };

    let playAnimations = function () {

        if( document.querySelectorAll('.animated-block').length > 0 ){

            window.addEventListener('load', function() {
                onScrollPlay();
            });

            window.addEventListener('scroll', function() {
                onScrollPlay();
            });

        }
    };

    let numberCounter = function () {

        $('.counter').each(function() {

            var $this = $(this), countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({countNum: countTo},{
                duration:2000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum)+"+");
                },
                complete: function() {
                    $this.text(this.countNum+"+");
                    // alert('finished');
                }
            });
        });
    };

    let featuresSlider = function () {

        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });

    };

    return{

        tabClick: function(event, menuParm) {
            tabClick(event, menuParm);
        },

        changeLanguage: function () {
            changeLanguage();
        },

        backToTop: function () {
            backToTop();
        },

        playAnimations: function () {
            playAnimations();
        },

        numberCounter: function () {
            numberCounter();
        },

        featuresSlider: function () {
            featuresSlider();
        },
    }

})();

