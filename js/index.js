const headerNav = document.querySelector("header");
const headerTrigger = document.querySelector("#header-trigger");
const sideBar = document.querySelector("#sidebar");
const sideBarUL = document.querySelector("#sidebar ul");
const root = document.querySelector(":root");
const sideButton = document.querySelector("#sidebar-toggle");

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.75
};

const obsCallback = (entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (!entry.isIntersecting) {
            headerTrigger.classList.add("scrolled");
            headerNav.classList.add("scrolled");
            sideBar.classList.add("scrolled");
            sideButton.classList.add("scrolled")
        }
        else {
            headerTrigger.classList?.remove("scrolled");
            headerNav.classList.remove("scrolled");
            sideBar.classList.remove("scrolled");
            sideButton.classList.remove("scrolled");
        };
    });
}

headerObserver = new IntersectionObserver(obsCallback, options);
headerObserver.observe(document.querySelector('#header-trigger'));

//The target must be a descendant of the root element - for some reason the header doesn't seem to count as the descendant of body (position: fixed doesn't get observed or something)
//You can use a placeholder element at the top of the page to detect when you're at the top or not.

const toc = () => {
    const headings = document.querySelectorAll("h1, h2, h3, h4")
    let x = 0;
    let y = 0;
    headings.forEach(heading => {
        if (heading.nodeName === "H2") {
            x++;
            y = 0;
        } else {
            y++;
        };
        //You can't use . as punctuation in css selectors silly. It makes something a class... Also apparently queryselectors can't start with a digit? It seemed to work before?
        if (x >= 1 && y === 1) {
            let btn = `<button type="button" id='btn-${x}-${y}' class="sidelist-toggle">‣</button>`;
            let parentHeading = document.querySelector(`.o${x}-0`);
            parentHeading.insertAdjacentHTML("beforebegin", `${btn}`);
        };
        heading.insertAdjacentHTML("beforebegin", `<a id='o${x}-${y}'></a>`);
        sideBarUL.insertAdjacentHTML("beforeend", `<div class="btn-wrapper"><a href='#o${x}-${y}' class='o${x}-0'> <li class='${heading.nodeName}'>${heading.textContent}</li></a ></div > `);
    })
}
toc()

sideButton.addEventListener("click", () => {
    sideBar.classList.toggle("active")
    sideButton.classList.toggle("active")
    sideButton.classList.toggle("arrow")
    sideButton.classList.toggle("hamburger")
    console.log("button clicked")
});

const sideListToggles = document.querySelectorAll(".sidelist-toggle");
sideListToggles.forEach((sideListToggle) => {
    sideListToggle.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("toggled");
    })
});