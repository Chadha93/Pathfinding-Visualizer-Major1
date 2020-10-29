function include(file) { 

  var script = document.createElement('script'); 
  script.src = file; 
  script.type = 'text/javascript'; 
  script.defer = true; 
  document.getElementsByTagName('body').item(0).appendChild(script); 
}
include('grid/main.js');
include('base/object.js'); 
include('algorithms/algo.js');
