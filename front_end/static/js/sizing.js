

var displayNav = false;
var displaySettings = false;
var initial_canvas_height;
var initial_canvas_width;
// var new_canvas_width;
// var new_canvas_height;

function init_canvas(){
  var canvas_style = window.getComputedStyle(document.getElementById("canvas"))
  initial_canvas_width =  parseInt(canvas_style.width ,10);
  initial_canvas_height = parseInt(canvas_style.height,10);
  console.log("init_canvas");
  var ro = new ResizeObserver(entries =>{
    entry = entries[0];
    new_canvas_width  = entry.contentRect.width;
    new_canvas_height = entry.contentRect.height;
  })
}


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
        document.getElementById("app").style.gridTemplateRows = "4fr 0.1fr";
        
        break;
      case "2":
        document.getElementById("app").style.gridTemplateRows = "2fr 0.1fr";

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
    resize()
    
  }

  function toggleSettings(){
    if(displaySettings){
        document.getElementById("settingscontent").style.display = "none";
        displaySettings = false;
    }
    else{
        document.getElementById("settingscontent").style.display = "unset";
        displaySettings = true;
    }
    
  }
 
  function resize(){//function to ensure that all entities are within the canvas even after rotation
    setTimeout(function(){
      var canvas = document.getElementById("canvas");
      var canvas_style = window.getComputedStyle(canvas);
      var new_width =   parseInt(canvas_style.width  , 10);
      var new_height =  parseInt(canvas_style.height , 10); 
      attackArr.forEach(e =>{e.handleResize(initial_canvas_width,initial_canvas_height, new_width, new_height)});
      defendArr.forEach(e =>{e.handleResize(initial_canvas_width,initial_canvas_height, new_width, new_height)});
      ballArr.forEach(e =>{e.handleResize(initial_canvas_width,initial_canvas_height, new_width, new_height)});
      console.log("resizing");
      initial_canvas_width = new_width;
      initial_canvas_height = new_height;

    }, 100);
      
  }

  function changeGridArea(){

  }

  window.addEventListener("orientationchange", function(event) {
    resize();
  });

  function toggleFrame() {
    console.log("toggling frame")
    var e = document.getElementById("frameOn");
    opt = e.options[e.selectedIndex].value;
    if (opt === "1") {
      frameOn = true;
      console.log("frame toggled on");
      playerArr.forEach(p => {
        p.frameOn();
      });
      attackArr.forEach(a => {
        a.frameOn();
      });
      defendArr.forEach(d => {
        d.frameOn();
      });
      ballArr.forEach(b => {
        b.frameOn();
      });
  
    } else {
      if (opt === "2") {
        console.log("frame toggled off");
        frameOn = false;
        playerArr.forEach(p => {
          p.frameOff();
        });
        attackArr.forEach(a => {
          a.frameOff();
        });
        defendArr.forEach(d => {
          d.frameOff();
        });
        ballArr.forEach(b => {
          b.frameOff();
        });
  
      }
    }
  
  };
 