
( function(){
    'use strict';

    $( function () {

        $( '.search-autocomplite' ).each( function () {
            new FilterAutocomplete( $( this ) );
        } );

    } );

    var FilterAutocomplete = function( obj ){

        //private properties
        var _self = this,
            _obj = obj,
            _input = _obj.find( 'input' ),
            _inputWrap = _obj.find( '.search-autocomplite__inner' ),
            _window = $( window ),
            _body = $( 'body' ),
            _resultList = _obj.find( '.search-autocomplite__result' ),
            _list,
            _listItems;

        //private methods
        var _checkListPosition = function() {
                var offset = _inputWrap.offset();

                _list.css( {
                    top: offset.top - _window.scrollTop() + _inputWrap.height() + 2,
                    left: offset.left,
                    width: _inputWrap.outerWidth()
                } );
            },
            _createList = function(){
                _list = _obj.find( '.search-autocomplite__list' ).clone();

                _list.addClass( 'search-autocomplite__list_hidden' );

                _listItems = _list.find( 'li' );

                _body.append( _list )
            },
            _filterItems = function() {
                var currentListItem;

                _listItems.removeClass( 'filtered' );

                _listItems.each( function() {
                    currentListItem = $( this );

                    if( currentListItem.text().toLowerCase().indexOf( _input.val().toLowerCase() ) == -1 ){
                        currentListItem.addClass( 'filtered' )
                    }

                } );
            },
            _hideList = function () {
                _listItems.removeClass( 'hover' );
                _list.addClass( 'search-autocomplite__list_hidden' );
            },
            _hover = function( item ){
                _listItems.removeClass( 'hover' );
                item.addClass( 'hover' );
            },
            _hoverNext = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not(.hidden)' );
                items = items.filter( ':not(.filtered)' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );

                if( currentItem.length ){

                    if( index + 1 === items.length ){
                        _hover( items.eq( 0 ) );
                    } else {
                        _hover( items.eq( index + 1 ) );
                    }

                } else {
                    _hover( _listItems.eq( 0 ) );
                }

            },
            _hoverPrev = function() {
                var items,
                    currentItem,
                    index;

                items = _listItems.filter( ':not(.hidden)' );
                items = items.filter( ':not(.filtered)' );
                currentItem = items.filter( '.hover' );
                index = items.index( currentItem );

                if( currentItem.length ){
                    _hover( items.eq( index - 1 ) );

                } else {
                    _hover( items.eq( -1 ) );
                }
            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _createList();
                _onEvents();
            },
            _onEvents = function(){

                _input.on( {
                    focus: function() {
                        _showList();
                    },
                    click: function( e ) {
                        e.stopPropagation();
                        _showList();
                    },
                    keyup: function(e) {
                        _showList();

                        if( e.keyCode == 27 ){
                            _hideList();
                        } else if( e.keyCode == 40 ){
                            _hoverNext();
                        } else if( e.keyCode == 38 ){
                            _hoverPrev();
                        } else if ( e.keyCode == 13 ){
                            _selectItem();
                        } else {
                            _filterItems();
                        }
                    }
                } );
                _listItems.on( {
                    mousedown: function() {
                        _selectItem();
                    },
                    mouseenter: function() {

                        _hover( $( this ) );

                    }
                } );

                _resultList.on( 'click','> div',  function() {
                    _unselectItem( [ $( this ).text() ] );
                } );

                _input.on( {
                    blur: function() {
                        _hideList();
                    }
                } );

                _window.on( {
                    scroll: function() {
                        _hideList();
                    },
                    click: function() {
                        _hideList();
                    },
                    resize: function() {
                        _hideList();
                    }
                } );

            },
            _selectItem = function() {
                var _hoveredItem = _listItems.filter( '.hover' );

                _hoveredItem.addClass( 'hidden' );

                _resultList.append( '<div>'+ _hoveredItem.text() +'<span class="search-autocomplite__result-close"></span></div>' );
            },
            _unselectItem = function( texts ) {
                var curItem;

                _resultList.find( '> div' ).each( function() {
                    curItem = $( this );

                    $.each( texts, function() {
                        if( curItem.text() == this ){
                            curItem.remove();
                        }
                    } );

                } );

                _listItems.each( function() {
                    curItem = $( this );

                    $.each( texts, function() {
                        if( curItem.text() == this ){
                            curItem.removeClass( 'hidden' );
                        }
                    } );

                } );

            },
            _showList = function(){
                _checkListPosition();
                _list.removeClass( 'search-autocomplite__list_hidden' );

            };

        //public properties

        //public methods


        _init();
    };

} )();