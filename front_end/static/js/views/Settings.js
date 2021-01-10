import AbstractView from "./Abstractview.js";


export default class extends AbstractView{
    constructor(params){
        super(params);
        this.setTitle("Settings");
    }

    async getHtml(){
        return  `
        <h1> Settings</h1>
        <p>
            This is the settings page
        </p>
        <p>
            <a href = "/posts" data-link> View recent posts</a>
        </p>
        `;
    }
}