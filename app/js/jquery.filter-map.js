
( function() {
    'use strict';
    // var data = [4.396076,50.825665,4.389457,50.822422,4.380077,50.830136,4.382325,50.832897,4.379021,50.834023,4.379568,50.836762,4.3757,50.835861,4.37592,50.839657,4.372835,50.840641,4.372166,50.839298,4.368684,50.840016,4.363002,50.838696,4.356352,50.834809,4.360407,50.831513,4.366397,50.829392,4.365174,50.828987,4.367167,50.82531,4.370347,50.823975,4.379204,50.81393,4.382692,50.815853,4.387366,50.805691,4.393895,50.800644,4.397019,50.801514,4.397324,50.80883,4.392338,50.812104,4.397995,50.813202,4.394229,50.817185,4.397625,50.816513,4.397421,50.81712,4.403643,50.819741,4.396076,50.825665];
    // var result = [];
    //
    // for ( var i=0;i< data.length;i+=2 ){
    //     result.push( {"lat": data[i+1], "lng": data[i]} );
    // }
    //
    // console.log( JSON.stringify(result) );

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
            _autocomplete = $( '.search-autocomplite' ),
            _mapData = _obj.data( 'map' ),
            _inputs = _obj.find( 'input' ),
            _areas = [],
            _map;
    
        //private methods
        var _addAreas = function(){
                var areas = _mapData.areas,
                    area;

                $.each( areas, function(){

                    var fillOpacity = 0;

                    if( _inputs.filter( '[name=' + this.value + ']' )[ 0 ].checked ){
                        fillOpacity = 0.4;
                    }

                    area = new google.maps.Polygon({
                        paths: this.coordinates,
                        strokeColor: this.color,
                        strokeOpacity: 0.8,
                        strokeWeight: 3,
                        fillColor: this.color,
                        fillOpacity: fillOpacity
                    });

                    area.setMap( _map );

                    if( fillOpacity ){
                        area.checked = true;
                    } else {
                        area.checked = false;
                    }
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

                        var currentInput = _inputs.filter( '[name=' + this.itemValue + ']' )[ 0 ];

                        if( this.checked ){
                            currentInput.checked = false;
                            this.checked = false;
                            this.setOptions( { fillOpacity: 0.2 } );
                        } else {
                            currentInput.checked = true;
                            this.checked = true;
                            this.setOptions( { fillOpacity: 0.4 } );
                        }

                        _refreshAutocomplete();

                    });


                    _areas.push( area );

                    _refreshAutocomplete();


                } );

            },
            _init = function(){

                _obj[ 0 ].obj = _self;

                google.maps.event.addDomListener(window, 'load', _initMap);

            },
            _initMap = function () {
                _map = new google.maps.Map( _mapContainer[ 0 ], {
                    zoom: _mapData.zoom,
                    center: _mapData.center
                });

                _addAreas();
            },
            _refreshAutocomplete = function(){
                var items = [];

                _inputs.each( function() {
                    if( this.checked ){
                        items.push( this.getAttribute( 'name' ) );
                    }
                } );

                _autocomplete[0].obj.refresh( items );
            };
    
        //public properties
    
        //public methods
        _self.refresh = function( items ) {


            $.each(_areas, function() {
                this.checked = false;
                this.setOptions( { fillOpacity: 0 } );
            } );

            _inputs.each( function() {
                this.checked = false;
            } );

            if( items.length ){
                $.each(_areas, function() {
                    var currentArea = this,
                        currentInput = _inputs.filter( '[name=' + currentArea.itemValue + ']' )[ 0 ];


                    $.each( items, function() {

                        if( currentArea.itemValue == this ){
                            currentInput.checked = true;
                            currentArea.checked = true;
                            currentArea.setOptions( { fillOpacity: 0.4 } );
                        }

                    } );

                } );


            }
        };
    
    
        _init();
    };
    
} )();