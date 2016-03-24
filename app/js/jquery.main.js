"use strict";
( function(){

    $(function(){

        $.each( $( '.site__menu' ), function() {

            new Menu ( $( this ) );

        } );

        $.each( $( '.language' ), function(){

            new Language ( $(this) )

        } );

        $.each( $( '.search-panel' ), function(){

            new SearchPanel ( $(this) )

        } );

        $.each( $( '.drop-down-item' ), function(){

            new DropDown ( $(this) )

        } );

    });

    var SearchPanel = function (obj) {

        //private properties
        var _obj = obj,
            _openBtn = $( '.site__header-search-btn' ),
            _body = $( 'body' ),
            _site = $( '.site' );

        //private methods
        var _onEvents = function () {

                _openBtn.on({
                    click: function (event) {

                        _site.toggleClass( 'site_search' );

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }

                    }
                });

                _obj.on({
                    'click': function(event){

                        var event = event || window.event;
                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                });

                _body.on({
                    'click': function(){
                        _site.removeClass('site_search')
                    }
                });
            },

            _init = function () {
                _onEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var Menu = function( obj ) {

        //private properties
        var _self = this,
            _menu = obj,
            _body = $( 'body' ),
            _window = $( window ),
            _showBtn = $( '.site__menu-btn' );

        //private methods
        var _onEvents = function() {

                _showBtn.on( {
                    'click': function() {

                        _openMenu( $( this ) );

                    }
                } );

                _window.on( {
                    'resize': function () {

                        _resetStyle();

                    }
                } );

            },
            _openMenu = function( elem )  {

                var curItem = elem;

                if( curItem.hasClass( 'opened' ) ) {

                    curItem.removeClass( 'opened' );
                    _menu.removeClass( 'opened' );

                    _body.css({
                        'overflow': 'visible'
                    })

                } else {

                    curItem.addClass( 'opened' );
                    _menu.addClass( 'opened' );

                    _body.css({
                        'overflow': 'hidden'
                    })
                }

            },
            _resetStyle = function() {

                _showBtn.removeClass( 'opened' );
                _menu.removeAttr( 'style' );
                _body.css({
                    'overflow': 'visible'
                })

            },
            _init = function() {
                _menu[ 0 ].obj = _self;
                _onEvents();
            };

        _init();
    };

    var Language = function (obj) {

        //private properties
        var _obj = obj,
            _languagesDropDown = $(".language__dropdown"),
            _languagesItem = $('.language__item'),
            _languagesDropDownSpeed = 200,
            _mouseenterTimeout,
            _mouseleaveTimeout;

        //private methods
        var _addEvents = function () {

                _languagesItem.on({
                    click: function (e) {

                        if($(this).parent().hasClass("language__active")) {
                            e.preventDefault();
                        }

                        if($(this).parent().hasClass("language__dropdown")) {

                            $(".language__active .language__item").appendTo(_languagesDropDown);

                            $(this).appendTo(".language__active");

                            _languagesDropDown.stop(true, true).slideUp(_languagesDropDownSpeed);

                        }
                    }
                });

                _obj.on( {
                    mouseenter: function() {

                        console.log(101);

                        clearTimeout(_mouseleaveTimeout);

                        _mouseenterTimeout = setTimeout(function(){

                            _languagesDropDown.stop(true, true).slideDown(_languagesDropDownSpeed);

                        }, 200);
                    }
                } );

                _obj.on({
                    mouseleave: function(){

                        clearTimeout(_mouseenterTimeout);

                        _mouseleaveTimeout = setTimeout(function(){

                            if(_languagesDropDown.is(":visible")) {

                                _languagesDropDown.stop(true, true).slideUp(_languagesDropDownSpeed);
                            }

                        }, 200);

                    }
                });

            },

            _init = function () {
                _addEvents();
            };

        //public properties

        //public methods


        _init();
    };

    var DropDown = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _btn = _obj.find( '.drop-down-item__wrap' ),
            _dropMenu = _obj.find( '.drop-down-item__menu'),
            _dropMenuItem = _dropMenu.find( 'li' ),
            _window = $( window ),
            _body = $( 'body' ),
            _padding = 0;

        //private methods
        var _addEvents = function() {

                _btn.on( {
                    click: function() {

                        _changeActive( $( this ), _padding );

                    }
                } );

                _obj.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );

                _body.on( {
                    click: function() {
                        _resetStyle();
                    }
                } );

                _dropMenuItem.on( {
                    click: function() {

                        var curElem = $( this ),
                            curElemText = curElem.text(),
                            mainTextWrap = curElem.parents( '.drop-down-item' ).find( '.drop-down-item__wrap span' );

                        _dropMenuItem.removeClass( 'active' );
                        curElem.addClass( 'active' );
                        mainTextWrap.text( curElemText );

                        _resetStyle();
                    }
                } );

                _window.on( {
                    load: function() {
                        if( _window.width() >= 992 ) {

                            _padding = 0;

                        } else {

                            _padding = _dropMenu.innerHeight();

                        }
                    },
                    resize: function() {
                        if( _window.width() >= 992 ) {

                            _padding = 0;

                        } else {
                            _padding = _dropMenu.innerHeight();
                        }

                        _resetStyle();
                    }
                } );

            },
            _changeActive = function( elem, padding ) {

                var curElem = elem,
                    parent = curElem.parents( '.drop-down-item' );

                if( curElem.parent().hasClass( 'active' ) ) {

                    curElem.parent().removeClass( 'active' );
                    parent.css( {
                        'padding-bottom': 0
                    } );

                } else {

                    _resetStyle();

                    curElem.parent().addClass( 'active' );
                    parent.css( {
                        'padding-bottom': padding
                    } );

                }

            },
            _init = function () {
                _obj[ 0 ].obj = _self;
                _addEvents();
            },
            _resetStyle = function() {
                var block = $( '.drop-down-item' );

                block.removeClass( 'active' );
                block.css( {
                    'padding-bottom': 0
                } );
            };

        //public properties

        //public methods


        _init();
    };

} )();
