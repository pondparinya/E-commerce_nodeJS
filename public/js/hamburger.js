function openNav() {
    document.getElementById("navbar--middle").style.display = "block";
}

function closeNav() {
    document.getElementById("navbar--middle").style.display = "none";
}

function myFunction(x) {
    x.classList.toggle("change");
    if (x.classList.contains("change")) {
        openNav();
    } else {
        closeNav();
    }
}