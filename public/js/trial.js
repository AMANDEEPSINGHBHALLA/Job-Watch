// Splash Class const splash = document.querySelector(".splash");
// document.addEventListener("DOMContentLoaded", (e)=>{     setTimeout(()=>{
// splash.classList.add("display-none");     }, 5000); })

const splash = document.querySelector(".splash");

// Hide the splash screen when the entire page, including images and other
// resources, is loaded
window.addEventListener("load", () => {
    setTimeout(() => {
        splash
            .classList
            .add("display-none");
    }, 1500);
});

// Navbar Class window.addEventListener("scroll", function() {     if
// (window.scrollY > 10) {
// document.querySelector(".header-nb").classList.add("header_scrolling");     }
// else {
// document.querySelector(".header-nb").classList.remove("header_scrolling");
// } })

const dropdownbutton = document.querySelector(".dropdownbutton");
dropdownbutton.addEventListener("click", () => {
    document
        .querySelector(".drop_down")
        .classList
        .add("drop_down_active");
})

document
    .getElementsByClassName("cross")[0]
    .addEventListener("click", () => {
        document
            .querySelector(".drop_down")
            .classList
            .remove("drop_down_active");
    })

document
    .getElementsByClassName("dd-home")[0]
    .addEventListener("click", () => {
        document.location.href = "/";
    })

document
    .getElementsByClassName("jaButton1")[0]
    .addEventListener("click", () => {
        document
            .querySelector(".dv-jobLocation")
            .classList
            .add("dataVisualization-active");
    })

document
    .getElementsByClassName("jaButton2")[0]
    .addEventListener("click", () => {
        document
            .querySelector(".dv-industryType")
            .classList
            .add("dataVisualization-active");
    })

document
    .getElementsByClassName("jaButton3")[0]
    .addEventListener("click", () => {
        document
            .querySelector(".dv-hiringComp")
            .classList
            .add("dataVisualization-active");
    })

document
    .getElementsByClassName("jaButton4")[0]
    .addEventListener("click", () => {
        document
            .querySelector(".dv-trendingJob")
            .classList
            .add("dataVisualization-active");
    })

for (let i = 0; i < 4; i++) {
    document
        .getElementsByClassName("dvCross")[i]
        .addEventListener("click", function () {
            document
                .querySelectorAll(".dataVisualization")[i]
                .classList
                .remove("dataVisualization-active");
        });
}

document
    .getElementsByClassName("ask_AI")[0]
    .addEventListener("click", function () {
        new Audio("sounds/mixkit-cool-interface-click-tone-2568.wav").play();
        const newPagePath = "JobWatchAI";
        // const newPagePath = "https://resanalyze.streamlit.app/";
        window.open(newPagePath, "_blank");
    })

document
    .getElementsByClassName("aboutButton")[0]
    .addEventListener("click", function () {
        const newPagePath = "JobWatchAbout";
        window.open(newPagePath, "_blank");
    })
