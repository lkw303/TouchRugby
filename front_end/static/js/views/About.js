import AbstractView from "./Abstractview.js";

export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("About");
    }

    async getHtml(){
        return  `
        <h1> About Us</h1>
        <p>
           This App was created so we could stop using cones on the ground and criss-crossing our hands to move them around realising that we only have two hands and calling another two people to come move the other four cones and end up with a cluster fuck blocking people from seeing what was displayed.
        </p>
        <p>
            <a href = "/posts" data-link> View recent posts</a>
        </p>
        `;
    }
}