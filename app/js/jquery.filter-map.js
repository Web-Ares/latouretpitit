
( function() {
    'use strict';
    var data = [ 4.407609,50.838806, 4.401194,50.840481, 4.399988,50.843663, 4.398926,50.844696, 4.396082,50.843384, 4.393291,50.838017, 4.380182,50.840092, 4.379568,50.836762, 4.379021,50.834023, 4.382325,50.832897, 4.380077,50.830136, 4.389457,50.822422, 4.396076,50.825665, 4.399307,50.824871, 4.404279,50.826992, 4.412213,50.830429, 4.410352,50.830929, 4.409977,50.833676, 4.405246,50.837563, 4.407609,50.838806];
    var result = [];

    for ( var i=0;i< data.length;i+=2 ){
        result.push( {"lat": data[i+1], "lng": data[i]} );
    }

    console.log( JSON.stringify(result) );

    $( function () {

        $( '.filter-map' ).each( function () {
            new FilterMap( $( this ) );
        } );

    } );
    
    var FilterMap = function( obj ){
    
        //private properties
        var _self = this,
            _obj = obj,
            _form = _obj.parents('form'),
            _mapContainer = _obj.find( '.filter-map__layout' ),
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

                    });


                    _areas.push( area );

                } );

            },
            _init = function(){

                _obj[ 0 ].obj = _self;
                _onEvents();
                google.maps.event.addDomListener(window, 'load', _initMap);

            },
            _initMap = function () {
                _map = new google.maps.Map( _mapContainer[ 0 ], {
                    zoom: _mapData.zoom,
                    center: _mapData.center
                });

                _addAreas();
            },
            _onEvents = function(){

                _form.on( {
                    submit: function() {

                        console.log('submit');

                       return false

                    }
                } );

            };
    
        //public properties
    
        //public methods
    
    
        _init();
    };
    
} )();
