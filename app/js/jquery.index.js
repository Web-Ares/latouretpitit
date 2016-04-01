( function(){

    $( function() {

        $.each( $( '.content-menu' ), function() {

            new ContentMenu ( $( this ) );

        } );

        $.each( $( '.research-panel__items' ), function() {

            new SearchPanel ( $( this ) );

        } );

    } );

    var ContentMenu = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btn = _obj.find( '.content-menu__btn' ),
            _window = $( window ),
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
        _self.showBlock = function() {
            _obj.addClass( 'opened' );
        };
        _self.hideBlock = function() {
            _obj.removeClass( 'opened' );
        };

        _init();
    };

    var SearchPanel = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _type = _obj.find( '.research-panel__type' ),
            _typeItem = _type.find( 'span' ),
            _select = _obj.find( '.drop-down-item' ),
            _selectItem = _select.find( '.drop-down-item__menu li' ),
            _input = _obj.find( '.research-panel__search' ),
            _data = {},
            _arr = [];

        //private methods
        var _addEvents = function() {

                _typeItem.on( {
                    click: function() {

                        var curItem = $( this );

                        if( !( curItem.hasClass( 'active' ) ) ) {
                            _typeItem.removeClass( 'active' );
                            curItem.addClass( 'active' );
                            _data.type = curItem.text();
                        }

                        _writeInSearch();

                    }
                } );

                _selectItem.on( {
                    click: function() {

                        var curItem = $( this );

                        if( !( curItem.hasClass( 'active' ) ) ) {

                            if( curItem.parents( '.drop-down-item' ).hasClass( 'drop-down-item_type' ) ) {
                                _data.typeSel = curItem.text();
                            } else if( curItem.parents( '.drop-down-item' ).hasClass( 'drop-down-item_location' ) ) {
                                _data.location = curItem.text();
                            } else if( curItem.parents( '.drop-down-item' ).hasClass( 'drop-down-item_rooms' ) ) {
                                _data.rooms = curItem.text();
                            }
                        }

                        _writeInSearch();

                    }
                } );

            },
            _writeInSearch = function() {

                _arr = [];

                for( var key in _data ) {

                    var item = _data[ key ];
                    _arr.push(  ' ' + item );
                }

                _input.val( _arr );

            },
            _init = function() {

                _obj[ 0 ].obj = _self;
                _addEvents();

            };

        //public properties

        //public methods


        _init();
    };

} )();

