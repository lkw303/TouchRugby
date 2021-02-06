import AbstractView from "./Abstractview.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Examples");
    }

    async getHtml(){
        return  `
        <div id ="top">
        <h1> Examples</h1>
        <h2> Features</h2>
        <img src = "./static/media/gifs/corner_shut_2.gif">
        <p>corner and shut</p>
        <img src = "./static/media/gifs/back_straight.gif">
        <p>backing straight</p>
        <p>
            Visit the github repository.
            Make a Pull request if you would like to propose some improvements!
            </br>
            <a href = "https://github.com/lkw303/TouchRugby" > Github Repository</a>
        </p>
        </div>
        `;
    }
}