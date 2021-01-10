console.log("this is index.js");

import Home from "./views/Home.js";
import Settings from "./views/Settings.js";
import About from "./views/About.js";


const navigateTo = url =>{
    history.pushState(null, null, url);
    router();
}
const router = async () =>{
    const routes = [
        {path: "/", view :Home},
        {path: "/about", view :About},
        {path: "/settings", view : Settings},
];


    const potentialMatches = routes.map(route =>{
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

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




