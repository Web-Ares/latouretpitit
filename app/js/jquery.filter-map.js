'use strict';
( function() {
    
    $( function () {

        $( '.filter-map' ).each( function () {
            new FilterMap( $( this ) );
        } );

    } );
    
    var FilterMap = function( obj ){
    
        //private properties
        var _self = this,
            _obj = obj,
            _mapContainer = _obj.find( '.filter-map__layout' ),
            _mapData = _obj.data( 'map' ),
            _input = _obj.find( 'input' ),
            _areas = [],
            _map;
    
        //private methods
        var _addAreas = function(){
                var areas = _mapData.areas,
                    area;

                $.each( areas, function(){
                    area = new google.maps.Polygon({
                        paths: this.coordinates,
                        strokeColor: this.color,
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillColor: this.color,
                        fillOpacity: 0
                    });

                    area.setMap( _map );

                    area.checked = false;
                    area.itemValue = this.value;

                    google.maps.event.addListener(area, "mouseover",function(){
                        if( !this.checked ) {
                            this.setOptions( { fillOpacity: 0.2 } );
                        }
                    });

                    google.maps.event.addListener(area, "mouseout",function(){
                        if( !this.checked ) {
                            this.setOptions( { fillOpacity: 0 } );
                        }
                    });

                    google.maps.event.addListener(area, "click",function(){

                        var value = '';

                        if( this.checked ){
                            this.checked = false;
                            this.setOptions( { fillOpacity: 0.2 } );
                        } else {
                            this.checked = true;
                            this.setOptions( { fillOpacity: 0.4 } );
                        }

                        $.each( _areas, function() {
                            if( this.checked ){
                                value += ( ':' + this.itemValue );
                            }
                        } );

                        if( value !='' ){
                            value = value.substr( 1 );
                        }

                        _input.val( value );

                    });


                    _areas.push( area );

                } );

            },
            _init = function(){

                _obj[ 0 ].obj = _self;

                google.maps.event.addDomListener(window, 'load', _initMap);

            },
            _initMap = function () {
                console.log( 1 );
                _map = new google.maps.Map( _mapContainer[ 0 ], {
                    zoom: _mapData.zoom,
                    center: _mapData.center
                });

                _addAreas();
            },
            _onEvents = function(){

            };
    
        //public properties
    
        //public methods
    
    
        _init();
    };
    
} )();