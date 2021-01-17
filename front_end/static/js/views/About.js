import AbstractView from "./Abstractview.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Examples");
    }

    async getHtml(){
        return  `
        <h1> Examples</h1>
        <p>
            Visit the github repository.
            Make a Pull request if you would like to propose some improvements!
            </br>
            <a href = "https://github.com/lkw303/TouchRugby" > Github Repository</a>
        </p>
        `;
    }
}