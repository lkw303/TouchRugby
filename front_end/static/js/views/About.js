import AbstractView from "./Abstractview.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("About");
    }

    async getHtml(){
        return  `
        <div id = "top">
        <h1> About Us</h1>
        <p>
        STOP USING CONES!!!!!!!!!!!!!!!
        This App was created to assist in showing different types of plays and tactics in Touch Rugby
        </p>
        
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