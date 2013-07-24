	$('#upload-form form input.submit').on('click', function(e) {
		e.preventDefault();
		
		var form = $('#upload-form form');
		
		var inputText = $(form).find('input[type="text"].image-caption');
		var isValid = true;
		
		if ($(inputText).val() == '') {
			showPopup('Podpis pod obrazkami jest wymagany.', null, null, closePopup, 'Popraw', true);
			isValid = false;
		} else if ($(inputText).val().length > 60) {
			showPopup('Podpis pod obrazkami nie moÅ¼e byÄ‡ dÅ‚uÅ¼szy niÅ¼ 60 znakÃ³w.', null, null, closePopup, 'Popraw', true);
			isValid = false;
		} 
		
		$('input[type="file"].fileInput').each(function(i) {
			if ($(this).val() == '') { 
				showPopup('Obrazek w polu nr ' + (i+1) + ' jest wymagany.', null, null, closePopup, 'Popraw', true);
				isValid = false;
				return false;
			}
		});			
		
		if (isValid) {
			$('#upload-form form').submit();
		}
	});   
	
	var allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

	$('.inputWrapper input.fileInput').bind({
		change: function(e) {
			e.preventDefault();
			
			e = e.originalEvent || e;			

			// FileList object
			var files = e.target.files;

			var fileType = files[0].type;

			if ($.inArray(fileType, allowedTypes) == -1) {
				showPopup('WystÄ…piÅ‚ bÅ‚Ä…d! Dozwolone typy plikÃ³w dla tego pola to: JPG, PNG, GIF.', null, null, closePopup, 'Popraw', true);
				return false;
			} 

			var dropPoint = $(this).parent().parent().children('.drop-area');
			var inputIndex = dropPoint.index($(this).parent());
			
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
	    
    
    
// Makes sure the dataTransfer information is sent when we
// Drop the item in the drop box.
jQuery.event.props.push('dataTransfer');

var imageTable = {};

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
	alert('The File APIs are not fully supported in this browser.');
}

$('form#upload').bind({
	submit: function() {
	
		var formData = new FormData();

		var uploadCount = 0
		$.each(imageTable, function(i) {
			formData.append('fileselect[]', $(this).get(0));
			uploadCount++;
		});

		formData.append('between-operator', $('select[name=between-operator] option:selected').val());
		formData.append('result-operator', $('select[name=result-operator] option:selected').val());

		if (uploadCount > 0) {
			// AJAX POST FormData with jQuery 
		
			$.ajax({
			    url: $(this).attr('action'),
			    data: formData,
			    cache: false,
			    contentType: false,
			    processData: false,
			    type: 'POST',
			    success: function(data){
			        console.log(data);
			    },
			    error: function(xhr, status, error) {
				    console.log(status + " " + error);
			    }
			});
		}
		return true;
	}
});

// Attach our drag and drop handlers.
$('.drop-area').bind({
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
	        imageTable[$(this).attr('id')] = files[0];
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
});
