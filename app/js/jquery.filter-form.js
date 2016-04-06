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
            },
            _onEvents = function(){

                _obj.on( {
                    submit: function() {

                        return false

                    }
                } );

                _window.on( {
                    load: function() {

                        _ajaxRequest();

                    }
                } );

            },

            _ajaxRequest = function(){

                var path = _obj.data('action').toString();

                console.log(path);

                _ajax = $.getJSON(path, {
                    format: "json"
                })

                .done(function( data ) {

                    console.log(data);

                });

            };

        //public properties

        //public methods


        _init();
    };

} )();
