var displayNav = false;
function updateCanvas() {
    console.log("updating canvas");
    elem = document.getElementById("canvas");
    e = document.getElementById("canvasType");
    var layer = document.getElementById("layer1");
    opt = e.options[e.selectedIndex].value;
    var width;
    var height;
    switch (opt) {
      case "1":
        document.getElementById("app").style.gridTemplateRows = "0fr 4fr 1fr";
        
        break;
      case "2":
        document.getElementById("app").style.gridTemplateRows = "0fr 2fr 1fr";

        break;
      case "3":
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
        break;
    };
    // elem.style.height = height + "%";
    // elem.style.width = width + "%";
    // layer.style.height = height + "%";
    // layer.style.width = width + "%";
    // elem.style.height = height + "px";
    // elem.style.width = width + "px";
    // layer.style.height = height + "px";
    // layer.style.width = width + "px";
  
  };

  function toggleNav(){
    if(displayNav){
        document.getElementById("nav").style.display = "none";
        displayNav = false;
    }
    else{
        document.getElementById("nav").style.display = "unset";
        displayNav = true;
    }
    
  }