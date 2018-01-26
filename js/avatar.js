'use strict';

(function() {

  var inputFile = document.querySelector('#avatar'),
      preview = document.querySelector('.notice__preview img'),
      inputFileHandler = function() {

        var file = inputFile.files[0],
            fileName = file.name.toLowerCase(),
            matches = window.util.FILE_TYPES.some(function(type) {
              return fileName.endsWith(type);
            });

        if (matches) {
          var reader = new FileReader();
          reader.addEventListener('load', function() {
            preview.src = reader.result;            
          });
          reader.readAsDataURL(file);
        }       

      };

  inputFile.addEventListener('change', inputFileHandler);

})();