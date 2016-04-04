"use strict";
( function() {

    $( function() {

        $.each( $( '.budget-slider' ), function() {

            new BudgetSlider ( $( this ) );

        } );

    });

    var BudgetSlider = function ( obj ) {

        //private properties
        var _obj = obj,
            _slider = _obj.find( '#budget-slider__slider' ),
            _min = _slider.data( 'min' ),
            _max = _slider.data( 'max' ),
            _defMax = _slider.data( 'default-max' ),
            _defMin = _slider.data( 'default-min' ),
            _nod = document.createTextNode(String.fromCharCode(8364)),
            _txt = _nod.textContent;

        //private methods
        var _onEvents = function() {

            },
            _initSlider = function() {

                _slider.slider( {
                    range: true,
                    min: _min,
                    max: _max,
                    values: [ _defMin, _defMax ],
                    create: function( ui ) {
                        $( '.ui-slider-handle' ).append( '<span></span>' );
                    },
                    slide: function( event, ui) {

                        var valWrap_1 = $( '.ui-slider-handle > span' ).eq(0),
                            valWrap_2 = $( '.ui-slider-handle > span' ).eq(1);

                        valWrap_1.text( Math.round(ui.values[ 0 ]/100)+ 'K' + _txt);
                        valWrap_2.text( Math.round(ui.values[ 1 ]/100) + 'K' + _txt);
                    }
                } );

                var valWrap_1 = $( '.ui-slider-handle > span' ).eq(0),
                    valWrap_2 = $( '.ui-slider-handle > span' ).eq(1);

                valWrap_1.text( Math.round( _slider.slider( 'values', 0 )/100) + 'K' + _txt );
                valWrap_2.text( Math.round( _slider.slider( 'values', 1 )/100) + 'K' + _txt );
            },

            _init = function() {
                _initSlider();
                _onEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();
