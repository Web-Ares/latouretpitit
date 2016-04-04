"use strict";
( function() {

    $( function() {

        $.each( $( '.tabs' ), function() {
            new Tabs ( $( this ) );
        } );

    });

    var Tabs = function( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _btn = _obj.find( 'dt'),
            _tabsContent = _obj.find( 'dd'),
            _flag = true;

        //private methods
        var _onEvents = function() {

                _btn.on( {
                    click: function() {
                        if( _window.width() < 992 ) {

                            _slideContent( $( this) );

                        } else {

                            _setClassActive( $( this) );
                            _setMinHeight( $( this) )

                        }
                    }
                } );

                _window.on( {
                    load: function () {
                        if( _window.width() >= 992 ) {

                            _setTopPos();
                            _setFirstActive();
                            _flag = false;

                        } else {

                            _flag = true

                        }
                    },
                    resize: function() {
                        if( _window.width() >= 992 ) {

                            _setTopPos();
                            _setFirstActive();
                            _flag = false;

                        } else {

                            _resetStyle();
                            _flag = true

                        }
                    }
                } );

            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _setTopPos = function() {
                _tabsContent.css( {
                    top: _btn.eq( -1 ).position().top + _btn.eq( -1 ).innerHeight()
                } );
            },
            _setClassActive = function( elem ) {

                var curItem = elem;

                if( !curItem.hasClass( 'active' ) ) {
                    _btn.removeClass( 'active' );
                    curItem.addClass( 'active' );
                }

            },
            _setFirstActive = function() {
                if( _flag ) {

                    _btn.eq( 0 ).addClass( 'active' );
                    _setMinHeight( _btn.eq( 0 ) );

                }
            },
            _setMinHeight = function( elem ) {

                var nextElem = elem.next();

                _obj.css( {
                    'min-height': nextElem.find( '.closer-objects__text' ).height() + nextElem.position().top
                } );

            },
            _slideContent = function( elem ) {

                var curItem = elem,
                    nextElem = curItem.next();

                if( !curItem.hasClass( 'active' ) ) {
                    _tabsContent.slideUp();
                    _btn.removeClass( 'active' );

                    curItem.addClass( 'active' );
                    nextElem.slideDown();
                } else {
                    curItem.removeClass( 'active' );
                    nextElem.slideUp();
                }

            },
            _resetStyle = function() {
                _tabsContent.removeAttr( 'style' );
                _btn.removeClass( 'active' );
            };

        _init();
    };

} )();
