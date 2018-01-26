'use strict';

(function() {
  
  var inputFiles = document.querySelector('#images'),
      preview = document.querySelector('.form__photo-container'),
      inputFilesHandler = function() {
        var files = Array.from(inputFiles.files);

        files.forEach(function(file) {

          var fileName = file.name.toLowerCase(),
              matches = window.util.FILE_TYPES.some(function(type) {
                return fileName.endsWith(type);
              });
          if (matches) {
            var reader = new FileReader();

            reader.addEventListener('load', function() {
              var img = document.createElement('img');
              img.src = reader.result;
              preview.appendChild(img);
            });
            reader.readAsDataURL(file);
          }
        });
      };

  inputFiles.addEventListener('change', inputFilesHandler);

})();