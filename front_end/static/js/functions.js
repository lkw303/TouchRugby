function PlayerObject(id, pos_x, pos_y, state){
  //let player = Object.create(constructorPlayer);
  this.id = state + id;
  this.pos_x = pos_x;
  this.pos_y = pos_y;
  this.init_pos_x =pos_x;
  this.init_pos_y = pos_y;
  this.pos_history = [[pos_x, pos_y]];
  this.state = state; // attacking or defending
  this.isClicked = false;
  this.holdBall = false;
  this.isTouched = false;
  

  this.init_msg = function(){
    console.log(`player ${this.id} is initialised at position x = ${this.pos_x}, y = ${this.pos_y}`);
  };

  this.init_html = function(){
    var div = document.createElement("div");
    div.id = this.id;
    div.className = this.state;
    div.style.position = "absolute"
    //div.top = pos_y + "%";
    div.style.left = pos_x + "%";
    div.style.top = pos_y + "%"
    div.style.width ="50px";
    div.style.height = "50px";
    div.style.background = "black";
    /*
    div.background = function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    */
    document.getElementById("canvas").appendChild(div);
  };

  this.followMouse = function(){
    elem = document.getElementById(this.id);
    elem.style.boxShadow = "5px 5px 5px gray";
    var X = (Mouseposition.x - document.getElementById("canvas").getBoundingClientRect().left-25) ;
    var Y = (Mouseposition.y - document.getElementById("canvas").getBoundingClientRect().top - 25) ;
    var W = document.getElementById("canvas").getBoundingClientRect().width -25;
    var H = document.getElementById("canvas").getBoundingClientRect().height -25;

    if (X <= W  && X >= 0 && Y <= H && Y >= 0 ){
      elem.style.left = (Mouseposition.x - document.getElementById("canvas").getBoundingClientRect().left-25)+"px";
      elem.style.top = (Mouseposition.y - document.getElementById("canvas").getBoundingClientRect().top - 25) + "px";
      console.log("follow mouse function")
    }else{
        console.log("End of Boundary")
    }
    
    /*
    elem = document.getElementById(this.id);
    elem.style.top = Mouseposition.x;
    elem.style.left = Mouseposition.y;
    */
    
   
  };

  this.ballFollow = function(){
    ball = document.getElementById("ball0");
    if(ball){
      console.log("balls is present")
      var ballWidth = parseInt(ball.style.width,10);
      var ballHeight = parseInt(ball.style.height,10);
      var ballX = parseInt(ball.style.left,10)+ballWidth/2;
      var ballY = parseInt(ball.style.top,10)+ballHeight/2;
      console.log(`ballX is ${ballX}`);
      console.log(`ballY is ${ballY}`);
      var collision = false;
      var playerCollideId;
      
      player = document.getElementById(this.id);
      var playerWidth = parseInt(player.style.width,10);
      var playerHeight = parseInt(player.style.height,10);
      var playerX = parseInt(player.style.left,10) + playerWidth/2;
      var playerY = parseInt(player.style.top,10) + playerHeight/2;
      var limX = ballWidth/2 + playerWidth/2;
      var limY = ballHeight/2 + playerHeight/2;
      console.log(`limX is ${limX}`);
      console.log(`limY is ${limY}`);
      difX = Math.abs(playerX -ballX) ;
      difY = Math.abs(playerY - ballY );
      console.log(`difX is ${difX}`);
      console.log(`difY is ${difY}`);
      if(difX < limX && difY < limY){
        collision = true;
        console.log(`collision is ${collision}`)
        ball.style.left = (playerX - playerWidth/2 - ballWidth/2) +"px";
        ball.style.top = (playerY - playerHeight/2 - ballHeight/2) +"px";
        console.log(ball)
        this.holdBall = true;
        };
   }

  };

  this.dump = function(){
      player = document.getElementById(this.id);
      var playerWidth = parseInt(player.style.width,10);
      var playerHeight = parseInt(player.style.height,10);
      var playerX = parseInt(player.style.left,10) + playerWidth/2;
      var playerY = parseInt(player.style.top,10) + playerHeight/2;
      
      for (i = 0; i < defendCount ; i++){
        defend = document.getElementById(`defend${i}`);
        defendHeight = parseInt(defend.style.height,10);
        defendWidth = parseInt(defend.style.width,10);
        defendX = parseInt(defend.style.left,10) + defendWidth/2;
        defendY = parseInt(defend.style.top,10) + defendHeight/2;
        var limX = playerWidth/2 + defendWidth/2;
        var limY = playerHeight/2 + defendHeight/2;
        difX = Math.abs(playerX -defendX);
        difY = Math.abs(playerY - defendY);
        console.log(`difX is ${difX}`);
        console.log(`difY is ${difY}`);
        if(difX < limX && difY < limY){
          cornerId = i;
          this.isTouched = true;
          console.log("attacker is touched");
          ball = document.getElementById("ball0");
          ballWidth = parseInt(ball.style.width,10);
          ballHeight = parseInt(ball.style.height,10);
          ball.style.left = (playerX - ballWidth/2) +"px";
          ball.style.top = (playerY + playerHeight/2 + ballHeight/2) +"px";
          console.log("dumping");
          this.holdBall = false;
          elem = document.getElementById("tactic")
          tactic = elem.options[elem.selectedIndex].value;
          ref = parseInt(defend.style.top,10);

          if(tactic === "1"){
            var id_array = [];
            var dic_pos = {};
            var x_array = [];
            for (k = 0; k < defendCount; k++){
              var def = document.getElementById(`defend${k}`)
              var xPos = parseInt(def.style.left,10);
              dic_pos[xPos] = k;
              x_array.push(xPos);
            };
            x_array.sort(function(a,b){
              return (a-b)
            });
            console.log(`sorted x_array is ${x_array}`)
            console.log(`x_array is ${x_array}`);
            console.log(`dic_pos is ${dic_pos}`);
            //this.back(100,-100);
            for (j = 0; j < defendCount; j++){
              id_array.push(dic_pos[x_array[j]]);
            };
            console.log(`id_array is ${id_array}`);
            console.log(`corner id is ${cornerId}`)
            indexCorner = id_array.indexOf(cornerId)
            if (indexCorner <= Math.floor((defendCount-1)/2)){
              console.log(`index corner is ${indexCorner}`);
              console.log("left corner right shut")
              var corner = id_array.slice(0,Math.floor((defendCount-1)/2)+1);
              var shut = id_array.slice(Math.floor((defendCount-1)/2)+1);
              var straight = [];
              console.log(`corner is ${corner}`);
              console.log(`shut is ${shut}`);
              console.log(`straight is ${straight}`);
              this.back(-200,-200,shut,corner,straight, tactic, ref);
            }
            else{
              console.log("left shut right corner");
              var shut = id_array.slice(0,Math.floor((defendCount-1)/2)+1);
              var corner = id_array.slice(Math.floor((defendCount-1)/2)+1);
              var straight = [];
              console.log(`corner is ${corner}`);
              console.log(`shut is ${shut}`);
              console.log(`straight is ${straight}`);
              this.back(200,-200,shut,corner,straight,tactic, ref);
            }
          }
          else{
            if(tactic === "2"){
              var shut = [] ;
              var corner = [] ;
              var straight = id_array;
              this.back(0,-200,shut,corner,straight,tactic, ref)
            }
          }
          break;
          }
          else{
            this.isTouched = false;
          };
      }
      
  };

  this.back = function(x,y, shut, corner, straight, tactic, ref){ //shut and corner are arrays containing the ids of the corner and shuting players
    console.log(`BACKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG x is ${x} y is ${y}`);
    var ls_move = []
    var ls_def = []
    ls_def = corner.concat(shut)
    // var x_move_shut = [];
    // var y_move_shut = [];
    // var x_move_corner = [];
    // var y_move_corner = [];
    // var y_move_straight = [];
    if(tactic === "1"){
      var W = document.getElementById("canvas").getBoundingClientRect().width - 25;
      corner.forEach(e => {
        var top = parseInt(document.getElementById(`defend${e}`).style.top,10) ;
        var left = parseInt(document.getElementById(`defend${e}`).style.left,10);
        var y_func = () =>{
          
          if( ref + y < 0){
            return -top
          }else{
            return (ref + y) - top;
          }
        };
        
        var x_func = () =>{
          if (left + x < 0){
            return -left;
          }else{ if (left + x > W){
            return W - left;
          }else{
            return x;
          }
          }
        };
        var y_move = y_func();
        var x_move = x_func();
        ls_move.push([x_move,y_move]);
        anime({
          targets:`#defend${e}`,
          translateX: x_move ,
          translateY: y_move,//y
          duration: 2000,
          loop: false,
        });
      })
  
      shut.forEach(e => {
        var top = parseInt(document.getElementById(`defend${e}`).style.top,10) ;
        var left = parseInt(document.getElementById(`defend${e}`).style.left,10);
        var y_func = () =>{
          
          if( ref + y < 0){
            return -top
          }else{
            return (ref + y) - top;
          }
        };
        
        var x_func =  () =>{
          if (left + x < 0){
            return -left;
          }else{ if (left + x > W){
            return W - left;
          }else{
            return x
          }
          }
        };
        var y_move = y_func();
        var x_move = x_func();
        ls_move.push([x_move,y_move]);
        anime({
          targets:`#defend${e}`,
          translateY: {
            value: y_move ,//y
            duration: 1000,
          },
          translateX:{
            value: x_move,
            duration: 1000,
            delay: 1000
          },
        });

      });
      
    }else{
      if(tactic ==="2"){
        straight.forEach(e =>{
          var top = parseInt(document.getElementById(`defend${e}`).style.top,10) ;
          var y_func = () =>{
          
            if( ref + y < 0){
              return - top;
            }else{
              return (ref + y) - top;
            }
          };
          y_move = y_func()
          ls_move.push([0,y_move]);
          anime({
            targets:`#defend${e}`,
            translateX: x,
            translateY: y_move ,//y
            duration: 2000,
            loop: false,
          });
        });
      }
    };
    
    
    setTimeout( () =>{
      for (i = 0; i < defendCount; i++){
        var id = ls_def[i]
        x_back = ls_move[i][0]
        y_back = ls_move[i][1]
        // y_back = (ref + y) - parseInt(document.getElementById(`defend${id}`).style.top,10)
        elem = document.getElementById(`defend${id}`);
        console.log("changing style")
        elem.style.top = (parseInt(elem.style.top,10) + y_back) +"px";
        elem.style.left = (parseInt(elem.style.left,10) + x_back) + "px";
        elem.style.transform = "translateX(0px) translateY(0px)";
      };
      
    },2500)
    
  };

  
  
  this.move = function(){
    x = 0;
    y= -100
    var elem = document.getElementById(this.id);
    initX = parseInt(elem.style.top);
    initY = parseInt(elem.style.left);
    //console.log(`initial pos for ${this.id} is ${pos_v}%`)
    //console.log(`initial pos for ${this.id} is ${pos_h}%`) 
    var mov = setInterval(frame, 0);
    function frame() {
      var dX = parseInt(elem.style.left, 10) - initX;
      var dY = parseInt(elem.style.top, 10) - initY;
      var dD = (dX**2 + dY**2)**0.5
      if(dD === 0) {
        clearInterval(mov);
      } else {
        pos_h += x/Math.abs(x);
        pos_v += y/Math.abs(x);
        elem.style.top = pos_h + 'px';
        elem.style.left = pos_v + 'px';
      }
    }
  };

  this.pass =function(){

  };

  this.init = function(){
    this.init_html();
    this.init_msg();
    elem = document.getElementById(this.id);
    elem.style.borderRadius  = "50%"
    elem.addEventListener("mousedown",() =>{
      console.log(`${this.id} is being clicked`);
      this.isClicked = true;
    });
    elem.addEventListener("touchstart",() =>{
      console.log(`${this.id} is being touched`);
      this.isClicked = true;
    });

    document.addEventListener("mousemove", () =>{
      if (this.isClicked){
        this.followMouse();
        if(this.state ==="attack"){
          this.ballFollow();
          if(this.holdBall){
            this.dump(); // check for collision with deefender and dump
          }
        };
        console.log("follwing mouse")
      }
    })

    document.addEventListener("touchmove", () =>{
      if (this.isClicked){
        this.followMouse();
        if(this.state ==="attack"){
          this.ballFollow();
          if(this.holdBall){
            this.dump(); // check for collision with deefender and dump
          }
        };
        
        console.log("follwing touch")
        
      }
      
    })

    document.addEventListener("mouseup", () =>{
      this.isClicked = false;
      console.log(`${this.id} is no longer being clicked`);
      document.getElementById(this.id).style.boxShadow = "0px 0px 0px";
    })
    //setInterval(this.follow_mouse(), 10)
    //setInterval(this.move(), 10);
  };
  
  this.init()
};

  var playerCount = 0;
  var attackCount = 0;
  var defendCount = 0;

  function createPlayer(){
    posx = (100/6)*(playerCount%6);
    posy = Math.floor(playerCount/6)*50;
    new PlayerObject(playerCount, posx, posy, "player");
    playerCount++;
  };

  function createAttack(){
    posx = (100/6)*(attackCount%6);
    posy = 50;
    new PlayerObject(attackCount, posx, posy, "attack");
    elem = document.getElementById(`attack${attackCount}`);
    elem.style.background = "blue";
    attackCount++;
  };

  function createDefend(){
    posx = (100/6)*(defendCount%6);
    posy = Math.floor(defendCount/6)*50;
    new PlayerObject(defendCount, posx, posy, "defend");
    elem = document.getElementById(`defend${defendCount}`)
    elem.style.background = "red"
    defendCount++;
  };


  function createBall(){
    if(!hasBall){
      posx = 0;
      posy = 0;
      new PlayerObject(0,posx,posy,"ball");
      elem = document.getElementById("ball0");
      elem.style.background = "white";
      elem.style.width = "25px";
      elem.style.height = "25px";
      console.log("ball created");
      hasBall = true;
    }
    else{
      console.log("there is already a ball");
    }
    
  };

  function removePlayer(){
    playerCount -= 1;
    document.getElementById(`player${playerCount}`).remove();
  };

  function removeAttack(){
    attackCount -= 1;
    document.getElementById(`attack${attackCount}`).remove();
  };

  function removeDefend(){
    defendCount -= 1;
    document.getElementById(`defend${defendCount}`).remove();
  };
  

  function removeBall(){
    if(hasBall){
      document.getElementById("ball0").remove();
      hasBall = false;
    }
  }

  document.addEventListener('mousemove', function(e) {
    Mouseposition.x = e.clientX;
    Mouseposition.y = e.clientY;
    //console.log(Mouseposition)
  });

  document.addEventListener('touchmove', function(e) {
    Mouseposition.x = e.clientX;
    Mouseposition.y = e.clientY;
    //console.log(Mouseposition)
  });

  function updateCanvas(){
    console.log("updating canvas");
    elem = document.getElementById("canvas");
    e = document.getElementById("canvasType");
    opt = e.options[e.selectedIndex].value;
    var width;
    var height;
    switch(opt){
      case "1": 
        width = 1000;
        height = (width/5)*7;
        break;
      case "2":
        width = 1000;
        height = (width/2);
        break;
      case "3":
        width = document.getElementById("width").value;
        height = document.getElementById("height").value;
        break;
    };
    elem.style.height = height + "px";
    elem.style.width = width + "px";
  };

  function createTeam(){
    e = document.getElementById("teamSide");
    teamSide = e.options[e.selectedIndex].value;
    size = document.getElementById("teamSize").value

    if(teamSide === "1"){
      for (i = 0;i < size; i++){
        createAttack();
      };
    }

    else{
      if(teamSide === "2"){
        for (i = 0; i < size;i++){
          createDefend();
        };
      }
    }
  };

 
  //*********************************VARIABLES */

  var Mouseposition = {
    x:0,
    y:0
  };



  var hasBall = false;

  

  function myMove() {
    var elem = document.getElementById("animation");
    var pos = 0;
    var id = setInterval(frame, 10);
    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
      }
    }
  };

  function myMove2() {
    var elem = document.getElementById("animation2");
    var pos_h = elem.offsetLeft;
    var pos_v = elem.offsetTop;
    console.log(`initial pos for anim2 is ${pos_v}`)
    console.log(`initial pos for anim2 is ${pos_h}`) 
    var id = setInterval(frame, 100);
    function frame() {
      if (pos_h == 350) {
        clearInterval(id);
      } else {
        pos_h++;
        pos_v++;
        elem.style.top = pos_v + 'px';
        elem.style.left = pos_h + 'px';
      }
    }
  };


  function myMove3() {
    var elem = document.getElementById("animation3");
    var pos_h = elem.offsetLeft;
    var pos_v = elem.offsetTop;
    console.log(`initial pos for anim3 is ${pos_v}`)
    console.log(`initial pos for anim3 is ${pos_h}`) 
    var id = setInterval(frame, 10);
    function frame() {
      if (pos_h == 350) {
        clearInterval(id);
      } else {
        pos_h++;
        pos_v++;
        elem.style.top = pos_v + 'px';
        elem.style.left = pos_h + 'px';
      }
    }
  };