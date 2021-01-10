import AbstractView from "./Abstractview.js";


export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Home");
    }

    async getHtml(){
    
        return `
        
        <h1> Welcome !</h1>
        <p>
        This App was created to assist in showing different types of plays and tactics in Touch Rugby
        </p>
        <p>
            This is the Home Page
        </p>
        <div id = "canvas" class = "canvas">
            
        
        </div>
        </br>
        <div id = "buttons" class = 'buttons'>
            <button type = "buttons" class = "constructor" id = "constructor" onclick = "createPlayer()"> Create Player</button>
            <button type = "buttons" class = "constructor" id = "constructor" onclick = "createAttack()">Create Attackers</button>
            <button type = "buttons" class = "constructor" id = "constructor" onclick = "createDefend()">Create Defenders</button>

            <button type ="buttons" class = "destructor" id = "destructor" onclick = "removePlayer()"> Remove Player</button>
            <button type ="buttons" class = "destructor" id = "destructor" onclick = "removeAttack()"> Remove Attacker</button>
            <button type ="buttons" class = "destructor" id = "destructor" onclick = "removeDefend()"> Remove Defender</button>

            <button type = "buttons" class = "ball" id = "ball" onclick = "createBall()"> Add Ball</button>
            <button type = "buttons" class = "destructor" id = "destructed" onclick = "removeBall()"> remove ball</button>
            <button type = "buttons" class = "constructor" id = "constructor" onclick = "createTeam()"> Create Team </button>
            </br>
            <input type="number" id = "height">height</input>
            </br>
            <input type= "number" id="width">width</input>
            </br>
            <input type = "number" id ="teamSize"> Team Size</input>
            </br>
            <select name = "teamSide" id  = "teamSide" >
                <option value = 1> Attack </option>
                <option value = 2> Defence </option>
            </select>
            </br>
            <select name="canvasType" id="canvasType" onchange = "updateCanvas()">
                <option value= 1>Full Field</option>
                <option value= 2> Seven Line</option>
                <option value= 3>Custom Canvas</option>
            </select>
            </br>
            <select name ="tactic" id = "tactic">
                <option value = 1>Corner & Shut</options>
                <option value = 2>Back Straight</options>
            </select>
            </br>
        </div>
       
` ;
    }
};

/*
<div id = "animation" class = "animation"></div>
            <div id = "animation2" class = "animation"></div>
            <div id = "animation3" class = "animation"></div>

*/