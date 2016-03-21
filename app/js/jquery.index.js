( function(){

    $(function(){

        $.each( $( '.content-menu' ), function() {

            new ContentMenu ( $( this ) );

        } );

    });

    var ContentMenu = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btn = _obj.find( '.content-menu__btn'),
            _window = $( window),
            _flag = true,
            _footer = $( '.site__footer' );

        //private methods
        var _addEvents = function() {

                _btn.on( {
                    click: function() {

                        if( _obj.hasClass( 'opened' ) ) {
                            _obj.removeClass( 'opened' );
                        } else {
                            _obj.addClass( 'opened' );
                        }

                    }
                } );

                _window.on( {
                    resize: function() {

                        _resetStyle();

                    },
                    scroll: function() {

                        if( _window.width() >= 992 ) {
                            _positionBlock();
                        }

                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();

                if( _window.width() >= 992 ) {
                    _positionBlock();
                }

            },
            _positionBlock = function() {

                var windowScroll = _window.scrollTop();

                if( windowScroll + _window.height() > _footer.offset().top ) {

                    if( _flag ) {

                        _obj.css( {
                            'opacity': 0
                        } );

                        setTimeout( function() {

                            _obj.css( {
                                'opacity': 1
                            } );

                            _obj.addClass( 'content-menu_absolute' );

                        },300 );
                    }

                    _flag = false;


                } else {

                    if( !_flag ) {

                        _obj.css( {
                            'opacity': 0
                        } );

                        setTimeout( function() {

                            _obj.css( {
                                'opacity': 1
                            } );

                            _obj.removeClass( 'content-menu_absolute' );

                        },300 );

                    }

                    _flag = true;

                }

            },
            _resetStyle = function() {
                _obj.removeClass( 'opened' );
            };

        //public properties

        //public methods


        _init();
    };

} )();

