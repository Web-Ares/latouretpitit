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
} )();
