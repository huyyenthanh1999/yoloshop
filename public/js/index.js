const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        {
            path: "/contacts",
            view: "<%- include ('../components/contacts'); -%>"
        },
        {
            path: "/products",
            view: "<%- include ('../components/products'); -%>"
        },
        {
            path: "/accessory",
            view: "<%- include ('../components/accessory'); -%>"
        }
    ];

    //test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname == route.path
        };
    })

    let match = potentialMatches.find(potentialMatche => potentialMatche.isMatch )

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = match.route.view;

    document.querySelector("#app").innerText = view;
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        console.log(e.target)
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            console.log(e.target.href)
            navigateTo(e.target.href);
        }
    });
    router();
});