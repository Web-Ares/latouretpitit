( function(){

    $( function() {

        $.each( $( '.research-panel__items' ), function() {

            new SearchPanel ( $( this ) );

        } );

    } );

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

