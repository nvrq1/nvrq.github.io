// Fade-in Effect
document.addEventListener("DOMContentLoaded", () => {
    const card = document.querySelector(".card");
    card.style.opacity = "0";
    setTimeout(() => {
        card.style.transition = "0.8s";
        card.style.opacity = "1";
    }, 150);
});
