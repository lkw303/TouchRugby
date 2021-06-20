// const fs = require("fs");
// const path = require("path");
//for future use when I figure out browserify
import AbstractView from "./Abstractview.js";


export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Home");
    }

    // async getHtml(){
    //     var file = fs.readFileSync(path.join(__dirname, "front_end", "html", "Home.html"));
    //     return file;
       
    // };

    async getHtml(){
        
    
        return `
        <div id = "canvas" class = "canvas" >
        <svg id = "layer1"></svg>
        </div>
        <div id = "settingsbar">
            <label for="settingsbar" class="toggle" onclick= "toggleNav();toggleSettings()" >☰</label>
            <div id = "settingscontent">
                <select name="canvasType" id="canvasType" class = "buttons" onchange = "updateCanvas()">
                    <option value= 2> Seven Line</option>
                    <option value= 1>Full Field</option>
                </select>

                <select name ="tactic" id = "tactic" class = "buttons">
                    <option value = 1>Corner & Shut</options>
                    <option value = 2>Back Straight</options>
                    <option value = 3>None</options>
                </select>
                <p>Toggle Dump<p>
                <select name ="dump" id = "dump" class = "buttons" >
                    <option value = 1>True</options>
                    <option value = 2>False</options>
                </select>
            </div>
        </div>
        <div id ="sidebar" class ="sidebar">
        <div class = "tabs">
        <div>
        <button class="tablinks" onclick="openTab(event, 'attackTab')">Attack</button>
        <button class="tablinks" onclick="openTab(event, 'defendTab')">Defenders</button>
        <button class="tablinks" onclick="openTab(event, 'playerTab')">Players</button>
        <button class="tablinks" onclick="openTab(event, 'ballTab')">Ball</button>
        </div>

        <div id = "attackTab" class= "tabcontent">
        
        </div>
        <div id = "defendTab" class= "tabcontent">
        </div>
        <div id = "playerTab" class= "tabcontent">
        </div>
        <div id = "ballTab" class= "tabcontent">
        </div>


        </div>
        </div>

        <div id = "buttons" class = 'buttons'>
            
            <button type = "buttons" class = "constructor buttons" id = "constructor" onclick = "createAttack(initial_canvas_width, initial_canvas_height)">Create Attackers</button>
            <button type = "buttons" class = "constructor buttons" id = "constructor" onclick = "createDefend(initial_canvas_width, initial_canvas_height)">Create Defenders</button>

            <button type ="buttons" class = "destructor buttons" id = "destructor" onclick = "removeAttack()"> Remove Attacker</button>
            <button type ="buttons" class = "destructor buttons" id = "destructor" onclick = "removeDefend()"> Remove Defender</button>

            <button type = "buttons" class = "ball buttons" id = "ball" onclick = "createBall(initial_canvas_width, initial_canvas_height)"> Add Ball</button>
            <button type = "buttons" class = "destructor buttons" id = "destructed" onclick = "removeBall()"> remove ball</button>
            </br>
            <select name="frameOn" id="frameOn" onchange="toggleFrame()">
                <option value=2>False</options>
                <option value=1>True</options>
            </select>
            </br>
            <button type="buttons" id="toggleFrame" onchange="toggleFrame()">toggleframe</button>
            </br>
            <button type="buttons" id="animate" onclick="runAnimate()">animate</button>           
            
            
        </div>

       
` ;
    }
    
 };


