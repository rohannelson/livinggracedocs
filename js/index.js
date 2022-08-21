const headerNav = document.querySelector("header");
const headerTrigger = document.querySelector("#header-trigger");
const sideBar = document.querySelector("#sidebar");
const sideButtonWrapper = document.querySelector("#sidebar-toggle-wrapper");
const sideButton = document.querySelector("#sidebar-toggle");
const sideBarUL = document.querySelector("#sidebar ul");

/*Makes header contract when scroll down from top and expand when scroll back using intersection observer.
The target must be a descendant of the root element - for some reason the header doesn't seem to count as the descendant of body (position: fixed doesn't get observed or something)
You can use a placeholder element at the top of the page to detect when you're at the top or not.*/

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.75
};

const obsCallback = (entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            headerTrigger.classList.add("scrolled");
            headerNav.classList.add("scrolled");
            sideBar.classList.add("scrolled");
            sideButtonWrapper.classList.add("scrolled")
        }
        else {
            headerTrigger.classList?.remove("scrolled");
            headerNav.classList.remove("scrolled");
            sideBar.classList.remove("scrolled");
            sideButtonWrapper.classList.remove("scrolled");
        };
    });
}

headerObserver = new IntersectionObserver(obsCallback, options);
headerObserver.observe(document.querySelector('#header-trigger'));

//Automatically generates dismissable table of contents based off headings with button for dismissing and buttons for collapsing lists generated off subheadings

const toc = () => {
    const headings = document.querySelectorAll("h1, h2, h3, h4")
    let x = 0;
    let y = 0;
    headings.forEach(heading => {
        if (heading.nodeName === "H1" || heading.nodeName === "H2") {
            x++;
            y = 0;
        } else {
            y++;
        };
        heading.insertAdjacentHTML("beforebegin", `<a id='o${x}-${y}'></a>`);
        sideBarUL.insertAdjacentHTML("beforeend", `<div class="btn-wrapper" data-x='o${x}' data-y='o${y}'><a href='#o${x}-${y}'><li class='${heading.nodeName}'>${heading.textContent}</li></a></div>`);
        if (y === 1) {
            let btn = `<button type="button" class="sidelist-toggle" data-x='o${x}' data-y='o${y}'>‣</button>`;
            let parentHeading = document.querySelector(`div[data-x='o${x}']`);
            console.log(parentHeading);
            parentHeading.insertAdjacentHTML("afterbegin", `${btn}`);
        };
    })
    document.querySelector(`[href='#o1-0']`).setAttribute("href", "#top");
}
toc()

//Event listener and styling for button that toggles sidebar

sideButton.addEventListener("click", () => {
    sideBar.classList.toggle("active");
    sideButtonWrapper.classList.toggle("active");
    sideButton.classList.toggle("arrow");
    sideButton.classList.toggle("hamburger");
});

//Identifies lists from subheadings and event listener for toggle lists.

const sideListToggles = document.querySelectorAll(".sidelist-toggle");
sideListToggles.forEach((sideListToggle) => {
    let toggleTier = sideListToggle.dataset.x;
    let toggleTierSet = document.querySelectorAll(`[data-x = ${toggleTier}]:not([data-y = "o0"]):not(button)`);
    toggleTierSet.forEach(item => item.classList.add("hidden"));
    sideListToggle.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("toggled");
        toggleTierSet.forEach(item => item.classList.toggle("hidden"));
    })
});

//tabindex observer
let tabObsOptions = {
    root: null,
    rootMargin: '100% 100% 100% 0px',
    threshold: 1
};

const sidebaritems = document.querySelectorAll('#sidebar ul div *')
console.log(sidebaritems)

const tabObsCallback = (entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            console.log(entry)
            sidebaritems.forEach((item) => item.setAttribute("tabindex", "-1"));
        }
        else {
            sidebaritems.forEach((item) => item.removeAttribute("tabindex"));
        }
    })
}

tabObserver = new IntersectionObserver(tabObsCallback, tabObsOptions);
tabObserver.observe(sideBar);