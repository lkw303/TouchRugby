console.log("this is index.js");

import Home from "./views/Home.js";
import Settings from "./views/Settings.js";
import About from "./views/About.js";
import Examples from "./views/Examples.js";


const navigateTo = url =>{
    history.pushState(null, null, url); // history is an object int he windows object
    router(); 
}

const router = async () =>{
    const routes = [
        //Home, About, Settings are JS scripts imported(see above)
        {path: "/", view :Home},
        {path: "/about", view :About},
        {path: "/settings", view : Settings},
];

    // location.pathname is the pathname attribute of the location object which shows the current path of the url
    // location object is an object which show information of the URL
    // location object is part ofthe window object and is accessed  through the window location property

    const potentialMatches = routes.map(route =>{ // for each route in the "routes" array an object below is returned
        return {
            route: route, // contains {path, viewObject}
            isMatch: location.pathname === route.path //boleaan value
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    //.find returns the first element in the array that satisfies the provided testing function i.e testing function needs to return a boolean
    // in this case our testing function returns the .isMatch attribute of potentialMatches which is a boolean value

    //this sets the object match to equal the match object of "/" route
    //meaning routes any other route than specified will be routed to "/" or to the root
    if(!match){
        match = {
            routes: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();

    document.querySelector("#app").innerHTML = await view.getHtml()

    console.log(potentialMatches);
    //match.route.view();
};

window.addEventListener("popstate", router());
//window.myMove = myMove

document.addEventListener("DOMContentLoaded", () =>{
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")){ // event.target gets the element on which the event originally occured
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
})




