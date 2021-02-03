function PlayerObject(id, pos_x, pos_y, state) {
  //let player = Object.create(constructorPlayer);
  this.id = state + id;
  this.index = id;
  this.state = state; // attacking or defending or player

  this.pos_x = pos_x;
  this.pos_y = pos_y;

  this.width = null;
  this.height = null;

  this.init_pos_x = pos_x;
  this.init_pos_y = pos_y;
  this.pos_history = [[pos_x, pos_y]];

  this.isClicked = false;
  this.holdBall = false;
  this.isTouched = false;
  this.onSide = true;

  this.pathCount = 0;
  this.traceCount = 0;
  this.points = []
  this.strokes = []
  this.prev = null;
  this.iterator = 0;
  this.startX = 0;
  this.startY = 0;
  this.endX = 0;
  this.endY = 0;
  this.transformList = [];// this should hold the start end end coordionates of every frame[[[Xstart1, Ystart1], [Xend1, Yend1]],[[Xstart2, Ystart2], [Xend2, Yend2] .....]
  this.frameCount = 0;


  this.init_html = function () {
    var width = 35;
    var height = 35;
    this.width = width;
    this.height = height;
    var div = document.createElement("div");
    div.id = this.id;
    div.className = this.state;
    div.classList.add("circle");
    div.style.position = "absolute"
    div.style.left = pos_x + "%";
    div.style.top = pos_y + "%"
    div.style.width = width + "px";
    div.style.height = height + "px";
    document.getElementById("canvas").appendChild(div);
  };

  this.followMouse = function () {
    elem = document.getElementById(this.id);
    elem.style.boxShadow = "5px 5px 5px black";
    var X = (Mouseposition.x - document.getElementById("canvas").getBoundingClientRect().left - this.width);
    var Y = (Mouseposition.y - document.getElementById("canvas").getBoundingClientRect().top - this.height);
    var W = document.getElementById("canvas").getBoundingClientRect().width - this.width;
    var H = document.getElementById("canvas").getBoundingClientRect().height - this.height;

    if (X <= W && X >= 0 && Y <= H && Y >= 0) {
      elem.style.left = (Mouseposition.x - document.getElementById("canvas").getBoundingClientRect().left - 25) + "px";
      elem.style.top = (Mouseposition.y - document.getElementById("canvas").getBoundingClientRect().top - 25) + "px";
      // console.log("follow mouse function")
    } else {
      // console.log("End of Boundary")
    }

    /*
    elem = document.getElementById(this.id);
    elem.style.top = Mouseposition.x;
    elem.style.left = Mouseposition.y;
    */


  };

  this.getId = function () {
    console.log(this.id);
    return this.id
  }


  this.ballFollow = function () {
    ball = document.getElementById("ball0");
    if (ball) {
      console.log("balls is present")
      var ballWidth = parseInt(ball.style.width, 10);
      var ballHeight = parseInt(ball.style.height, 10);
      var ballX = parseInt(ball.style.left, 10) + ballWidth / 2;
      var ballY = parseInt(ball.style.top, 10) + ballHeight / 2;
      console.log(`ballX is ${ballX}`);
      console.log(`ballY is ${ballY}`);
      var collision = false;
      var playerCollideId;

      player = document.getElementById(this.id);
      var playerWidth = parseInt(player.style.width, 10);
      var playerHeight = parseInt(player.style.height, 10);
      var playerX = parseInt(player.style.left, 10) + playerWidth / 2;
      var playerY = parseInt(player.style.top, 10) + playerHeight / 2;
      var limX = ballWidth / 2 + playerWidth / 2;
      var limY = ballHeight / 2 + playerHeight / 2;
      // console.log(`limX is ${limX}`);
      // console.log(`limY is ${limY}`);
      difX = Math.abs(playerX - ballX);
      difY = Math.abs(playerY - ballY);
      // console.log(`difX is ${difX}`);
      // console.log(`difY is ${difY}`);
      if (difX < limX && difY < limY) {
        collision = true;
        // console.log(`collision is ${collision}`)
        ball.style.left = (playerX - playerWidth / 2 - ballWidth / 2) + "px";
        ball.style.top = (playerY - playerHeight / 2 - ballHeight / 2) + "px";
        // console.log(ball)
        this.holdBall = true;
      };
    }

  };
 // this.dump() will only be executed by the attacking ball carrier
  //checks for collision with defender and dumps
  this.dump = function () {
    player = document.getElementById(this.id);
    var playerWidth = parseInt(player.style.width, 10);
    var playerHeight = parseInt(player.style.height, 10);
    var playerX = parseInt(player.style.left, 10) + playerWidth / 2;
    var playerY = parseInt(player.style.top, 10) + playerHeight / 2;
    //this.onSide = false;

    for (i = 0; i < defendCount; i++) {
      defend = document.getElementById(`defend${i}`);
      // future can change width to a constant assuming that all players are the same height
      defendHeight = parseInt(defend.style.height, 10);
      defendWidth = parseInt(defend.style.width, 10);
      defendX = parseInt(defend.style.left, 10) + defendWidth / 2;
      defendY = parseInt(defend.style.top, 10) + defendHeight / 2;
      var limX = playerWidth / 2 + defendWidth / 2;
      var limY = playerHeight / 2 + defendHeight / 2;
      difX = Math.abs(playerX - defendX);
      difY = Math.abs(playerY - defendY);
      console.log(`difX is ${difX}`);
      console.log(`difY is ${difY}`);
      if (difX < limX && difY < limY) {
        cornerId = i;
        this.isTouched = true;
        console.log("attacker is touched");
        ball = document.getElementById("ball0");
        ballWidth = parseInt(ball.style.width, 10);
        ballHeight = parseInt(ball.style.height, 10);
        ball.style.left = (playerX - ballWidth / 2) + "px";
        ball.style.top = (playerY + playerHeight / 2 + ballHeight / 2) + "px";
        console.log("dumping");
        this.holdBall = false;
        this.onSide = false;
        elem = document.getElementById("tactic")
        tactic = elem.options[elem.selectedIndex].value;
        ref = parseInt(defend.style.top, 10);

        if (tactic === "1") {
          var id_array = [];
          var dic_pos = {};
          var x_array = [];
          for (k = 0; k < defendCount; k++) {
            var def = document.getElementById(`defend${k}`)
            var xPos = parseInt(def.style.left, 10);
            dic_pos[xPos] = k;
            x_array.push(xPos);
          };
          x_array.sort(function (a, b) {
            return (a - b)
          });
          console.log(`sorted x_array is ${x_array}`)
          console.log(`x_array is ${x_array}`);
          console.log(`dic_pos is ${dic_pos}`);
          //this.back(100,-100);
          for (j = 0; j < defendCount; j++) {
            id_array.push(dic_pos[x_array[j]]);
          };
          console.log(`id_array is ${id_array}`);
          console.log(`corner id is ${cornerId}`)
          indexCorner = id_array.indexOf(cornerId)
          if (indexCorner <= Math.floor((defendCount - 1) / 2)) {
            console.log(`index corner is ${indexCorner}`);
            console.log("left corner right shut");
            var corner = id_array.slice(0, Math.floor((defendCount - 1) / 2) + 1);
            var shut = id_array.slice(Math.floor((defendCount - 1) / 2) + 1);
            var straight = [];
            console.log(`corner is ${corner}`);
            console.log(`shut is ${shut}`);
            console.log(`straight is ${straight}`);
            this.back(-200, -200, shut, corner, straight, tactic, ref);
          }
          else {
            console.log("left shut right corner");
            var shut = id_array.slice(0, Math.floor((defendCount - 1) / 2) + 1);
            var corner = id_array.slice(Math.floor((defendCount - 1) / 2) + 1);
            var straight = [];
            console.log(`corner is ${corner}`);
            console.log(`shut is ${shut}`);
            console.log(`straight is ${straight}`);
            
            this.back(200, -200, shut, corner, straight, tactic, ref);
          }
        }
        else {
          if (tactic === "2") {
            var id_array = []
            for (i = 0; i < defendCount; i++) {
              id_array.push(i)
            };
            var shut = [];
            var corner = [];
            var straight = id_array;
            this.back(0, -200, shut, corner, straight, tactic, ref)
          }
        }
        
        this.onSide = true;
        break;
      }
      else {
        this.isTouched = false;
        
      };
    }
  };


  this.back = async (x, y, shut, corner, straight, tactic, ref) =>{ //shut and corner are arrays containing the ids of the corner and shuting players
    console.log(`BACKINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG x is ${x} y is ${y}`);
    var ls_move = []
    var ls_def = []
    // var x_move_shut = [];
    // var y_move_shut = [];
    // var x_move_corner = [];
    // var y_move_corner = [];
    // var y_move_straight = [];
    if (tactic === "1") {

      ls_def = corner.concat(shut)
      var W = document.getElementById("canvas").getBoundingClientRect().width - 25;
      corner.forEach(e => {
        var top = parseInt(document.getElementById(`defend${e}`).style.top, 10);
        var left = parseInt(document.getElementById(`defend${e}`).style.left, 10);

        var y_func = () => { // check if the player is heading out of the canvas
          //  if it does return the

          if (ref + y < 0) {
            return -top
          } else {
            return (ref + y) - top;
          }
        };

        var x_func = () => {
          if (left + x < 0) {
            return -left;
          } else {
            if (left + x > W) {
              return W - left;
            } else {
              return x;
            }
          }
        };
        var y_move = y_func();
        var x_move = x_func();
        ls_move.push([x_move, y_move]);
        
        anime({
          targets: `#defend${e}`,
          translateX: x_move,
          translateY: y_move,//y
          duration: 2000,
          loop: false,
        });
      })

      shut.forEach(e => {
        var top = parseInt(document.getElementById(`defend${e}`).style.top, 10);
        var left = parseInt(document.getElementById(`defend${e}`).style.left, 10);
        var y_func = () => {

          if (ref + y < 0) {
            return -top
          } else {
            return (ref + y) - top;
          }
        };

        var x_func = () => {
          if (left + x < 0) {
            return -left;
          } else {
            if (left + x > W) {
              return W - left;
            } else {
              return x
            }
          }
        };
        var y_move = y_func();
        var x_move = x_func();
        ls_move.push([x_move, y_move]);
        
        anime({
          targets: `#defend${e}`,
          translateY: {
            value: y_move,//y
            duration: 1000,
          },
          translateX: {
            value: x_move,
            duration: 1000,
            delay: 1000
          },
        });

      });

    } else {
      if (tactic === "2") {
        ls_def = straight;

        straight.forEach(e => {
          var top = parseInt(document.getElementById(`defend${e}`).style.top, 10);
          var y_func = () => {
            if (ref + y < 0) {
              return -top;
            } else {
              return (ref + y) - top;
            }
          };
          y_move = y_func();
          ls_move.push([0, y_move]);
          
          anime({
            targets: `#defend${e}`,
            translateX: x,
            translateY: y_move,//y
            duration: 2000,
            loop: false,
          });
        });
      }
    };


    setTimeout(() => {
      for (i = 0; i < defendCount; i++) {
        var id = ls_def[i]
        x_back = ls_move[i][0]
        y_back = ls_move[i][1]
        // y_back = (ref + y) - parseInt(document.getElementById(`defend${id}`).style.top,10)
        elem = document.getElementById(`defend${id}`);
        console.log("changing style")
        elem.style.top = (parseInt(elem.style.top, 10) + y_back) + "px";
        elem.style.left = (parseInt(elem.style.left, 10) + x_back) + "px";
        elem.style.transform = "translateX(0px) translateY(0px)";
        this.onSide =true;
      };

    }, 2500)
    console.log("end back");
  };

  this.frameOn = function () {
    console.log("frame on")
    var elem = document.getElementById(this.id);
    elem.addEventListener("mousedown", onPress);
    elem.addEventListener("touchstart", onPress);
  };

  this.frameOff = function () {
    var elem = document.getElementById(this.id);
    elem.removeEventListener("mousedown", onPress);
    elem.removeEventListener("touchstart", onPress);
  };

  let onDrag = () => { this.onDrag(); };
  let onEnd = () => { this.onEnd(); };
  let onPress = () => { this.onPress(); };

  this.onPress = function () {
    console.log('pressing')
    var canvas = document.getElementById("layer1");
    var elem = document.getElementById(this.id);
    var offsetLayerLeft = canvas.getBoundingClientRect().left;
    var offsetLayerTop = canvas.getBoundingClientRect().top;

    elem.addEventListener("mouseup", onEnd);
    elem.addEventListener("mousemove", onDrag);
    elem.addEventListener("touchend", onEnd);
    elem.addEventListener("touchmove", onDrag);
    var newpath = document.createElementNS('http://www.w3.org/2000/svg', "path");
    var newtrace = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');

    newpath.id = `path${this.pathCount}_${this.id}`;
    newpath.classList.add(`path${this.pathCount}`);
    newpath.classList.add(`${this.id}`);
    newpath.classList.add("path");
    // newpath.style.position = "absolute";
    newtrace.id = `trace${this.traceCount}_${this.id}`;
    newtrace.classList.add(`trace${this.traceCount}`);
    newtrace.classList.add(`${this.id}`);
    newtrace.classList.add("trace");
    // newtrace.style.position = "absolute";

    canvas.appendChild(newpath);
    canvas.appendChild(newtrace);
    var x = parseInt(elem.style.left, 10) + this.width;
    var y = parseInt(elem.style.top, 10) + this.height;
    // var x = Mouseposition.x - offsetLayerLeft;
    // var y = Mouseposition.y - offsetLayerTop;
    this.startX = Mouseposition.x;
    this.startY = Mouseposition.y;

    newpath.setAttribute("stroke", "white");
    newpath.setAttribute("stroke-width", "5");
    newpath.setAttribute("fill", "none");
    newpath.setAttribute("d", "");

    newtrace.setAttribute("points", "");
    newtrace.setAttribute("stroke", "white");
    newtrace.setAttribute("stroke-width", "5");
    newtrace.setAttribute("fill", "none");

    var stroke = {
      // // elapsed: 0,
      // // time: start,
      // dist: 0,
      x: x,
      y: y
    };

    this.points = [x, y];
    this.strokes = [stroke];
    this.prev = stroke;
    this.pathCount += 1;
    this.traceCount += 1

  };

  this.onDrag = function () {
    // var newpath = document.getElementById(`path${this.pathCount-1}`);
    console.log("dragging")
    var newtrace = document.getElementById(`trace${this.traceCount - 1}_${this.id}`);
    var canvas = document.getElementById("layer1");
    var offsetLayerLeft = canvas.getBoundingClientRect().left
    var offsetLayerTop = canvas.getBoundingClientRect().top

    var x = Mouseposition.x - offsetLayerLeft; //minus because Mouseposition returns absolute position
    var y = Mouseposition.y - offsetLayerTop; // and the path and trace coordinates are with respect to the canvas

    var stroke = {
      x: x,
      y: y
    };

    this.prev = stroke;
    this.strokes.push(stroke);
    this.points.push(x, y);
    newtrace.setAttribute("points", this.points);
    // newtrace.style.position = "absolute"

  };

  this.onEnd = function () {
    console.log("end");
    var elem = document.getElementById(this.id);
    var canvas = document.getElementById("layer1");
    var newpath = document.getElementById(`path${this.pathCount - 1}_${this.id}`);
    var newtrace = document.getElementById(`trace${this.traceCount - 1}_${this.id}`);
    var offsetLayerLeft = canvas.getBoundingClientRect().left
    var offsetLayerTop = canvas.getBoundingClientRect().top
    var x = Mouseposition.x - offsetLayerLeft;
    var y = Mouseposition.y - offsetLayerTop;
    // var transform = elem.style.transform;
    // var transform_ls = transform.split(" ");
    // var transX =  parseInt(transform_ls[0].split("(")[1],10);
    // var transY = parseInt(transform_ls[1].split("(")[1],10);
    // this.endX = transX;
    // this.endY = transY;
    // this.endX = Mouseposition.x;
    // this.endY = Mouseposition.y;
    this.transformList.push([[this.startX, this.startY], [this.endX, this.endY]])
    newpath.setAttribute("d", this.solve(this.points));
    newtrace.setAttribute("points", "");
    // newpath.style.position = "absolute"
    elem.removeEventListener("mousemove", onDrag);
    elem.removeEventListener("mouseup", onEnd);
    elem.removeEventListener("touchmove", onDrag);
    elem.removeEventListener("touchend", onEnd);
    this.addFrame();

  };

  this.solve = function (data, k) {

    if (k == null) k = 1;

    var size = data.length;
    var last = size - 4;

    var path = `M${data[0]},${data[1]}`;

    for (var i = 0; i < size - 2; i += 2) {//if (window.CP.shouldStopExecution(0)) break;

      var x0 = i ? data[i - 2] : data[0];
      var y0 = i ? data[i - 1] : data[1];

      var x1 = data[i + 0];
      var y1 = data[i + 1];

      var x2 = data[i + 2];
      var y2 = data[i + 3];

      var x3 = i !== last ? data[i + 4] : x2;
      var y3 = i !== last ? data[i + 5] : y2;

      var cp1x = x1 + (x2 - x0) / 6 * k;
      var cp1y = y1 + (y2 - y0) / 6 * k;

      var cp2x = x2 - (x3 - x1) / 6 * k;
      var cp2y = y2 - (y3 - y1) / 6 * k;

      path += ` C${cp1x},${cp1y},${cp2x},${cp2y},${x2},${y2}`;
    }//window.CP.exitedLoop(0);

    return path;
  };

  
  this.animate = function () {
    if (this.pathCount > 0) {
      var animeInit = async () => {
        document.getElementById("animate").disabled = true;
        elem = document.getElementById(`${this.id}`);
        elem.style.left = 0 //this.transformList[this.iterator][0][0]*0 - offsetLayerLeft + "px";
        elem.style.top = 0 //this.transformList[this.iterator][0][1]*0 - offsetLayerTop  + "px";
      };
      animeInit();

      console.log("animating");
      // var path = anime.path(".screen path");//class of div that contains the 
      var path = anime.path(`#path${this.iterator}_${this.id}`);
      console.log(`animating path path${this.iterator}_${this.id}`)
      anime({
        targets: `#${this.id}`,
        translateX: path('x'),
        translateY: path('y'),
        // rotate: path('angle'),
        easing: 'linear',
        duration: 1000,
        loop: false,
      });


      async function transform(id, iterator, transformList) {
        return new Promise(
          resolve => {
            setTimeout(() => {
              elem = document.getElementById(id);
              var canvas = document.getElementById("layer1");
              var offsetLayerLeft = canvas.getBoundingClientRect().left;
              var offsetLayerTop = canvas.getBoundingClientRect().top;
              var transform = elem.style.transform;
              var transform_ls = transform.split(" ");
              var transX = parseInt(transform_ls[0].split("(")[1], 10);
              var transY = parseInt(transform_ls[1].split("(")[1], 10);
              // var left = parseInt(elem.style.left,10) + transX + "px";
              // var top = parseInt(elem.style.top,10) + transY + "px";
              elem.style.left = transX + "px"
              elem.style.top = transY + "px"
              // elem.style.left = transformList[iterator][1][0] - offsetLayerLeft + "px";
              // elem.style.top = transformList[iterator][1][1] - offsetLayerTop + "px";  
              elem.style.transform = "translateX(0px) translateY(0px)";
              console.log("ending timeout function");
              document.getElementById("animate").disabled = false;
            }, 1100)
          }
        )

      };
      transform(this.id, this.iterator, this.transformList)

      if (this.iterator + 1 === this.pathCount) {
        console.log("changing iterator");
        this.iterator = 0;

      }
      else {
        console.log("changing iterator");
        this.iterator += 1
      };
    } else {
      console.log(`${this.id} has non path`)
    }
  };
  //need to change the element's transfrom to 0 and set its style.left and style.top to the new transformed location

  this.createFrameThread = function () { //adds a column to the sidebar and tracks the frames of the player
    var tab = document.getElementById(`${this.state}Tab`);
    var div = document.createElement("DIV");
    var list = document.createElement("UL");
    var templateColumns = "";
    var templateAreas = ""
    for (var i = 0; i < (this.id + 1); i++) {
      templateColumns += "1fr ";
      // templateAreas += `${this.state}${i} `;
    };
    tab.style.gridTemplateColumns = templateColumns;
    // tab.style.gridTemplateAreas = templateAreas;
    // div.style.gridArea = `${this.id}`;
    div.style.gridColumn = `${this.index + 1}/${this.index + 2}`;
    div.id = `thread_${this.id}`;
    list.id = `list_${this.id}`;
    // list.style.gridArea = `${this.id}`;
    list.style.padding = "10px 10px";
    // var sidebar = document.getElementById("sidebar");

    tab.appendChild(div);
    div.appendChild(list);
  };

  this.addFrame = function () {
    // var tab = document.getElementById(`${this.state}Tab`);
    var list = document.getElementById(`list_${this.id}`);
    var frame = document.createElement("LI");
    frame.id = `frame${this.frameCount}_${this.id}`;
    frame.classList.add(`frame`);
    frame.classList.add(`frame${this.frameCount}`);
    frame.setAttribute("onclick", `selectFrame(${this.pathCount},${this.traceCount},${this.index},"${this.state}")`);
    // var thread = document.getElementById(`list_${this.id}`);
    // thread.appendChild(frame);
    list.appendChild(frame);
    this.frameCount += 1;
  }

  this.handleResize = function(width,height,new_width, new_height){
    var elem = document.getElementById(this.id);
    console.log(`old canvas dimension is ${width}, ${height}`);
    console.log(`new canvas dimension is ${new_width}, ${new_height}`);
    var left =    parseInt(elem.style.left,10);
    var top =     parseInt(elem.style.top ,10);
    var ratio_horizontal = left/width;
    var ratio_vertical = top/height;
    var new_left = ratio_horizontal*new_width;
    var new_top = ratio_vertical*new_height;
    elem.style.left = new_left + "px";
    elem.style.top = new_top + "px";
    console.log(`ratios are ${ratio_horizontal}, ${ratio_vertical}`)
    console.log(`new left is ${new_left}`)
    console.log(`new top is ${new_top}`)
    
  }

  this.init = function () {
    this.init_html();
    this.createFrameThread();
    elem = document.getElementById(this.id);
    elem.style.borderRadius = "50%";
    elem.addEventListener("mousedown", () => {
      // console.log(`${this.id} is being clicked`);
      this.isClicked = true;
    });
    elem.addEventListener("touchstart", () => {
      // console.log(`${this.id} is being touched`);
      this.isClicked = true;
    });

    document.addEventListener("mousemove", () => {
      if (this.isClicked) {
        this.followMouse();
        if (this.state === "attack") {
          this.ballFollow();
          if (this.holdBall && this.onSide) {
            var e = document.getElementById("dump");
            opt = e.options[e.selectedIndex].value;
            if (opt === "1") { // check if dumping set to true
              this.dump();  // check for collision with deefender and dump
            }
          }
        };
      }
    })

    document.addEventListener("touchmove", () => {
      if (this.isClicked) {
        this.followMouse();
        if (this.state === "attack") {
          this.ballFollow();
          if (this.holdBall && this.onSide) {
            var e = document.getElementById("dump");
            opt = e.options[e.selectedIndex].value;
            if (opt === "1") { // check if dumping set to true
              this.dump();  // check for collision with deefender and dump
            }
          }
        };
        console.log("follwing touch")
      }
    })

    document.addEventListener("mouseup", () => {
      this.isClicked = false;
      console.log(`${this.id} is no longer being clicked`);
      document.getElementById(this.id).style.boxShadow = "0px 0px 0px";
    })

    document.addEventListener("touchend", () => {
      this.isClicked = false;
      console.log(`${this.id} is no longer being touched`);
      document.getElementById(this.id).style.boxShadow = "0px 0px 0px";
    })
    //setInterval(this.follow_mouse(), 10)
    //setInterval(this.move(), 10);
  };

  this.init()
};





//***************************************************GLOBAL FUNCTIONS ****************************************/

//no longer in use
// function createPlayer() {
//   posx = (100 / 6) * (playerCount % 6);
//   posy = Math.floor(playerCount / 6) * 50;
//   var player = new PlayerObject(playerCount, posx, posy, "player");
//   playerArr.push(player)
//   playerCount++;
// };

function createAttack() {
  if (attackCount < 6) {
    posx = (100 / 6) * (attackCount % 6);
    posy = 50;
    var attacker = new PlayerObject(attackCount, posx, posy, "attack");
    elem = document.getElementById(`attack${attackCount}`);
    elem.style.background = "blue";
    attackArr.push(attacker)
    attackCount++;
  }

};

function createDefend() {
  if (defendCount < 6) {
    posx = (100 / 6) * (defendCount % 6);
    posy = Math.floor(defendCount / 6) * 50;
    var defender = new PlayerObject(defendCount, posx, posy, "defend");
    elem = document.getElementById(`defend${defendCount}`)
    elem.style.background = "red";
    defendArr.push(defender);
    defendCount++;

  }
};

// D.R.Y combine the 3 create functions intto 1

function createBall() {
  if (!hasBall) {
    posx = 0;
    posy = 0;
    ballObject = new PlayerObject(0, posx, posy, "ball");
    elem = document.getElementById("ball0");
    elem.style.background = "white";
    elem.style.width = "25px";
    elem.style.height = "25px";
    console.log("ball created");
    ballArr.push(ballObject);
    hasBall = true;
  }
  else {
    console.log("there is already a ball");
  }

};
//NO LONGER IN USE
// function removePlayer() {
//   if (playerCount >= 1&& playerCount <= 6) {
//     playerCount -= 1;
//     playerArr.pop()
//     document.getElementById(`player${playerCount}`).remove();
//   } else {
//     console.log("already no more players")
//   }

// };

function removeAttack() {
  if (attackCount >= 1) {
    attackCount -= 1;
    attackArr.pop();
    document.getElementById(`attack${attackCount}`).remove();
  } else {
    console.log("already no more attackers")
  };
};

function removeDefend() {
  if (defendCount >= 1) {
    defendCount -= 1;
    defendArr.pop();
    document.getElementById(`defend${defendCount}`).remove();
  } else {
    console.log("already no more defenders");
  }

};


function removeBall() {
  if (hasBall) {
    document.getElementById("ball0").remove();
    hasBall = false;
  }
};

document.addEventListener('mousemove', function (e) {
  Mouseposition.x = e.clientX;
  Mouseposition.y = e.clientY;
  //console.log(Mouseposition)
});
document.addEventListener('touchstart', function (e) {
  Mouseposition.x = e.touches[0].clientX;
  Mouseposition.y = e.touches[0].clientY;
  //console.log(Mouseposition)
});
document.addEventListener('touchend', function (e) {
  Mouseposition.x = e.touches[0].clientX;
  Mouseposition.y = e.touches[0].clientY;
  //console.log(Mouseposition)
});

document.addEventListener('touchmove', function (e) {
  Mouseposition.x = e.touches[0].clientX;
  Mouseposition.y = e.touches[0].clientY;
  //console.log(Mouseposition)
});



function createTeam() {
  e = document.getElementById("teamSide");
  teamSide = e.options[e.selectedIndex].value;
  size = document.getElementById("teamSize").value

  if (teamSide === "1") {
    if (attackCount + size <= 6) {
      for (i = 0; i < size; i++) {
        createAttack();
      };
    }

  }

  else {
    if (teamSide === "2") {
      if (defendCount + size <= 6) {
        for (i = 0; i < size; i++) {
          createDefend();
        };
      }
    }
  }
};

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

function runAnimate() {
  if (attackArr) {
    attackArr.forEach(a => { a.animate() });
  }
  if (defendArr) {
    defendArr.forEach(a => { a.animate() });
  }
  if (playerArr) {
    playerArr.forEach(a => { a.animate() });
  }
  if (ballArr) {
    ballrArr.forEach(a => { a.animate() });
  }

};

function openTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "grid";
  evt.currentTarget.className += " active";
}

// possible issue -- this function assumes the selected frame is the last frame added to the stack
//pathCount is increase in onPress therefore the need to minus 1
function selectFrame(pathCount, traceCount, index, state) {
  frameId = `frame${pathCount - 1}_${state}${index}`;
  pathId = `path${pathCount - 1}_${state}${index}`;
  traceId = `trace${traceCount - 1}_${state}${index}`;
  var frame = document.getElementById(frameId)
  var path = document.getElementById(pathId);
  var trace = document.getElementById(traceId);

  if (!frameSelected) {
    frameSelected = true;
    selectedFrame = frameId;
    selectedPath = pathId;
    selectedTrace = traceId;
    path.setAttribute("stroke", "black");
    frame.style.background = "gray";
  }
  else {
    var prevFrame = document.getElementById(selectedFrame);
    var prevPath = document.getElementById(selectedPath);
    prevFrame.style.background = "white";
    prevPath.setAttribute("stroke", "white");
    selectedFrame = frameId;
    selectedPath = pathId;
    // var frame = document.getElementById(selectedFrame);
    // var path = document.getElementById(selectedPath);
    frame.style.background = "gray";
    path.setAttribute("stroke", "black");
  };


}


//*********************************VARIABLES */******************************************** */
var playerCount = 0;
var attackCount = 0;
var defendCount = 0;
var playerArr = [];
var defendArr = [];
var attackArr = [];
var ballArr = [];

var Mouseposition = {
  x: 0,
  y: 0
};


var hasBall = false;
var frameOn = false;
var frameSelected = false;
var selectedFrame = null;
var selectedPath = null;
var selectedTrace = null;



