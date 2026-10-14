// =========================
// VIDEO MODAL
// =========================

const workCards = document.querySelectorAll(".work-card");
const videoModal = document.getElementById("videoModal");
const expandedVideo = document.getElementById("expandedVideo");
const closeVideo = document.getElementById("closeVideo");

function openVideo(card) {
    expandedVideo.src = card.dataset.video;
    videoModal.classList.add("active");
    document.body.style.overflow = "hidden";
    expandedVideo.play().catch(() => {
        // Autoplay can be blocked; the controls still work
    });
}

function closeVideoModal() {
    videoModal.classList.remove("active");
    expandedVideo.pause();
    expandedVideo.removeAttribute("src");
    expandedVideo.load();
    document.body.style.overflow = "";
}

workCards.forEach((card) => {
    card.addEventListener("click", () => openVideo(card));
    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openVideo(card);
        }
    });
});

closeVideo.addEventListener("click", closeVideoModal);

videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideoModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.classList.contains("active")) {
        closeVideoModal();
    }
});


// =========================
// SCROLL REVEAL
// =========================

const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08 }
    );
    revealSections.forEach((s) => observer.observe(s));
} else {
    revealSections.forEach((s) => s.classList.add("visible"));
}
