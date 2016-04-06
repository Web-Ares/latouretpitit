
( function(){
    'use strict';

    $( function () {

        $( '.filter-form' ).each( function () {
            new FilterForm( $( this ) );
        } );

    } );

    var FilterForm = function( obj ){

        //private properties
        var _self = this,
            _obj = obj,
            _window = $(window),
            _ajax = null;

        //private methods
        var _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
                //_ajaxRequest();
            },
            _onEvents = function(){

                _obj.on( {
                    submit: function() {

                        return false

                    }
                } );

                _window.on( {
                    load: function() {

                        //_ajaxRequest();

                    }
                } );

            },

            _ajaxRequest = function(){

                var path = _obj.data('action');

                console.log(path);

                //_ajax.abort();

                _ajax = $.getJSON({
                    url: path,
                    //data: {
                    //    //popupId: _obj.attr('data-popup-id')
                    //},
                    dataType: 'json',
                    type: "GET",
                    success: function (msg) {

                        console.log(msg)

                    },
                    error: function (XMLHttpRequest) {
                        if (XMLHttpRequest.statusText != "abort") {
                            alert("ERROR!!!");
                        }
                    }
                });

            };



        //public properties

        //public methods


        _init();
    };

} )();
