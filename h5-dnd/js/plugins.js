// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function($) {
    $.fn.multiUpload = function(options) {

        debug( this );

        var opts = $.extend({
            drop: 'drop-area',
            callback: function() {}
        }, options);

        opts.callback.call(this); // brings the scope to the callback
        
        var dropPoints = $(this).find('.' + opts.drop);

        // Private function for debugging.
        function debug( $obj ) {
            if ( window.console && window.console.log ) {
                window.console.log( "form size: " + $obj.size() );
            }
        };   

        this.find('.inputWrapper input.fileInput').bind('change', function(e) {
            
            e.preventDefault();
            
            e = e.originalEvent || e;           

            // FileList object
            var files = e.target.files;
            console.log(files);


        });
    };
}(jQuery));