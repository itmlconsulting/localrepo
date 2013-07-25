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

        var opts = $.extend({
            drop: 'drop-area',
            onSuccess: function(e) {},
            onFailure: function(e) {}
        }, options);

        var errorObj = {
            erroCode: 0,
            erorrMessage: ''
        }

        // Makes sure the dataTransfer information is sent when we
        // Drop the item in the drop box.
        jQuery.event.props.push('dataTransfer');

        var imageData = {};

        verifyAPI();

        function verifyAPI() {
            // Check for the various File API support.
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                 console.info('HTML5 File API supported.');
                return true;
            } else {
                console.error('The File APIs are not fully supported in this browser.');
                return false;
            }
        }

        var dropPoints = $(this).find('.' + opts.drop);

        if (dropPoints != undefined) {
            // Attach our drag and drop handlers.
            dropPoints.bind({
                dragover: function () {
                    $(this).addClass('hover');
                    return false;
                },
                dragleave: function () {
                    $(this).removeClass('hover');
                    return false;
                },
                drop: function (e) {
                    e = e || window.event;
                    e.preventDefault();

                    // jQuery wraps the originalEvent, so we try to detect that here...
                    e = e.originalEvent || e;
                    targetElement = e.target;

                    var dropPoint = $(this);

                    var files = (e.files || e.dataTransfer.files);

                    if (files.length == 1) {
                        imageData[$(this).attr('id')] = files[0];
                    } else {
                        console.log(dropPoint);
                        errorObj.erroCode = 1;
                        errorObj.errorMessage = 'Cannot send more than 1 file into 1 drop point!';
                        
                        opts.onFailure.call(this, errorObj);

                        return false;
                    }

                    img = $('<img src="" class="uploadPic" title="" alt="" />');

                    var reader = new FileReader();
                    reader.onload = function (event) {

                        var newImg = $(img).clone().attr({
                            src: event.target.result,
                            title: (files[0].name),
                            alt: (files[0].name)
                        });
                        
                        // Resize large images...
                        if (newImg.size() > 480) {
                            newImg.width(480);
                        }
                        
                        $(dropPoint).empty();
                        $(dropPoint).append(newImg);
                        $(dropPoint).removeClass('hover');
                    };
                    reader.readAsDataURL(files[0]);
                 }
                 });
        } else {
            console.error('Drop points with ID=' + opts.drop + ' not found!');
        }


        this.find('.inputWrapper input.fileInput').bind('change', function(e) {
            
            e.preventDefault();
            
            e = e.originalEvent || e;           

            // FileList object
            var files = e.target.files;
            console.log(files);


        });
    };
}(jQuery));