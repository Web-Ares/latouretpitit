( function(){

    $( function() {

        $.each( $('.apartment__slider'), function () {

            new ApartmentSlider( $(this) );

        } );

        $.each( $('.apartment__slider .swiper-wrapper'), function () {

            new PopupGallery( $(this) );

        } );

    } );

    var ApartmentSlider = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = _obj.find( '.swiper-container'),
            _swiper;

        //private methods
        var _initSwiper = function () {

                _swiper = new Swiper( _slider, {
                    loop: true,
                    nextButton: _slider.find( '.swiper-button-next' ),
                    prevButton: _slider.find( '.swiper-button-prev' )
                });

            },
            _init = function () {

                _obj[0].obj = _self;
                _initSwiper();

            };

        _init();
    };

    var PopupGallery = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _swiperTop = $( '.gallery-top' ),
            _swiperThumbs = $( '.gallery-thumbs' ),
            _galleryTop,
            _galleryThumbs;

        //private methods
        var _onEvents = function() {

                _obj.on( {
                    click: function() {
                        _initSwiper();
                    }
                } );

            },
            _initSwiper = function () {

                _galleryTop = new Swiper( _swiperTop, {
                    nextButton: _swiperTop.find( '.swiper-button-next' ),
                    prevButton: _swiperTop.find( '.swiper-button-prev' ),
                    spaceBetween: 10
                } );

                _galleryThumbs = new Swiper( _swiperThumbs, {
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    touchRatio: 0.2,
                    slideToClickedSlide: true
                } );
                _galleryTop.params.control = _galleryThumbs;
                _galleryThumbs.params.control = _galleryTop;

            },
            _init = function () {

                _obj[0].obj = _self;
                _onEvents();

            };

        _init();
    };

} )();

