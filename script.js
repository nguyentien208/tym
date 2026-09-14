/* ==========================================================================
   LOVE GIFT WEBSITE - JAVASCRIPT LOGIC
   Configurable, Responsive, Canvas/CSS Particles, Audio & Animations
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. USER CONFIGURATION AREA (Khu vực chỉnh sửa thông tin cá nhân)
   -------------------------------------------------------------------------- */
const CONFIG = {
    // Tên bạn & Tên bạn gái
    boyfriendName: "Anh",
    girlfriendName: "Em",
    nickname: "Công chúa",

    // Ngày bắt đầu yêu (Định dạng YYYY-MM-DD THỜI GIAN)
    startDate: "2022-02-14T00:00:00",

    // Câu nói riêng của 2 người & Lời nhắn
    specialQuote: "Yêu em không phải là một lựa chọn, đó là điều tự nhiên nhất trong cuộc đời anh.",
    personalMessage: "Cảm ơn em vì đã đến và làm cho mỗi ngày của anh trở nên ngập tràn ánh sáng.",

    // Màn hình text intro (Các đoạn văn bản xuất hiện ở Section 2)
    introStoryLines: [
        "Anh từng nghĩ...",
        "...có những người chỉ tình cờ bước vào cuộc đời mình.",
        "Nhưng rồi anh gặp em.",
        "Và anh biết...",
        "em không phải là một sự tình cờ."
    ],

    // Timeline các mốc kỷ niệm
    timeline: [
        {
            date: "14/02/2022",
            title: "Ngày Đầu Tiên Bên Nhau",
            description: "Khoảnh khắc anh lấy hết dũng khí để nói lời yêu em. Nụ cười của em hôm ấy làm tim anh đập lệch nhịp."
        },
        {
            date: "20/10/2022",
            title: "Chuyến Đi Xa Đầu Tiên",
            description: "Cùng nhau ngắm hoàng hôn bên bờ biển, tiếng sóng vỗ và bàn tay em nằm trọn trong tay anh."
        },
        {
            date: "14/02/2023",
            title: "Kỷ Niệm 1 Năm",
            description: "365 ngày trôi qua với vô vàn kỷ niệm đẹp, nụ cười và cả những lần giận dỗi thương yêu."
        },
        {
            date: "Hôm Nay & Mãi Về Sau",
            title: "Hành Trình Tiếp Nối",
            description: "Mỗi ngày trôi qua anh lại thấy yêu em nhiều hơn một chút."
        }
    ],

    // Album ảnh kỷ niệm
    // Lưu ý: Đặt ảnh vào folder assets/images/photo-01.jpg ...
    // Nếu ảnh chưa tồn tại, hệ thống tự hiển thị placeholder khung Polaroid đẹp.
    photos: [
        { src: "assets/images/photo-01.jpg", caption: "Nụ cười rạng rỡ của em" },
        { src: "assets/images/photo-02.jpg", caption: "Lần hẹn hò đầu tiên" },
        { src: "assets/images/photo-03.jpg", caption: "Chuyến du lịch đáng nhớ" },
        { src: "assets/images/photo-04.jpg", caption: "Bên nhau bình yên" }
    ],

    // Những điều anh muốn nói (Section 5)
    loveNotes: [
        "Anh yêu nụ cười của em mỗi khi nhìn anh.",
        "Anh thích những lúc em cười vì những chuyện rất nhỏ.",
        "Anh thích những cuộc nói chuyện muộn chẳng cần chủ đề.",
        "Anh thích cả những lúc chúng ta giận nhau rồi lại ôm lấy nhau.",
        "Anh thích việc người bên cạnh anh... chính là em."
    ]
};

/* --------------------------------------------------------------------------
   2. DOM ELEMENTS & INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const secIntro = document.getElementById("sec-intro");
    const mainContent = document.getElementById("main-content");
    const btnStart = document.getElementById("btn-start");
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    
    const easterEggBtn = document.getElementById("easter-egg-btn");
    const easterEggToast = document.getElementById("easter-egg-toast");

    // Replace placeholder texts in HTML with CONFIG
    populateConfigData();

    // Floating Particles background system
    initFloatingParticles();

    // Scroll Observer for animation triggers
    initScrollAnimations();

    // Start Button Event
    btnStart.addEventListener("click", () => {
        // Play music if possible
        playAudio();

        // Fade out intro section
        secIntro.style.opacity = "0";
        secIntro.style.transform = "scale(0.95)";

        setTimeout(() => {
            secIntro.classList.add("hidden");
            mainContent.classList.remove("hidden");
            musicToggle.classList.remove("hidden");
            
            // Start Story Line reveal sequence
            revealStoryLines();

            // Start Realtime Counter
            startCounter();
        }, 800);
    });

    // Music Toggle Control
    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    });

    // Dynamic Photos Gallery Lightbox setup
    renderGallery();
    initLightbox();

    // Proposal / Final question mechanics
    initProposalLogic();

    // Easter Egg Logic
    initEasterEgg();
});

/* --------------------------------------------------------------------------
   3. DATA POPULATION FROM CONFIG (Supporting URL Payload from Admin)
   -------------------------------------------------------------------------- */
function loadUrlPayloadIfPresent() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const dataParam = urlParams.get('data');
        if (dataParam) {
            const decodedJson = decodeURIComponent(atob(dataParam));
            const payload = JSON.parse(decodedJson);
            
            if (payload.bf) CONFIG.boyfriendName = payload.bf;
            if (payload.gf) CONFIG.girlfriendName = payload.gf;
            if (payload.nick) CONFIG.nickname = payload.nick;
            if (payload.startDate) CONFIG.startDate = payload.startDate + "T00:00:00";
            if (payload.quote) CONFIG.specialQuote = payload.quote;
            if (payload.finalMsg) CONFIG.personalMessage = payload.finalMsg;
            if (payload.music) {
                const audioSource = document.querySelector("#bg-music source");
                if (audioSource) {
                    audioSource.src = payload.music;
                    document.getElementById("bg-music").load();
                }
            }
        }
    } catch (e) {
        console.error("Failed to parse URL payload:", e);
    }
}

function populateConfigData() {
    // Check if URL payload exists from Admin QR code
    loadUrlPayloadIfPresent();

    // Update GF Name everywhere
    document.querySelectorAll(".girlfriend-name").forEach(el => {
        el.textContent = CONFIG.girlfriendName || CONFIG.nickname;
    });

    // Update finale quote/personal message if overridden
    const finaleNameEl = document.querySelector(".finale-name");
    if (finaleNameEl && CONFIG.personalMessage) {
        finaleNameEl.innerHTML = `<span class="girlfriend-name">${CONFIG.girlfriendName}</span>, ${CONFIG.personalMessage}`;
    }

    // Story Lines
    const storyLinesWrapper = document.getElementById("story-lines-wrapper");
    if (storyLinesWrapper && CONFIG.introStoryLines) {
        storyLinesWrapper.innerHTML = "";
        CONFIG.introStoryLines.forEach((text, index) => {
            const p = document.createElement("p");
            p.className = "story-line";
            if (index === CONFIG.introStoryLines.length - 1) {
                p.classList.add("highlight");
            }
            p.textContent = text;
            storyLinesWrapper.appendChild(p);
        });
    }

    // Timeline Intro Date
    const timelineIntroDate = document.getElementById("timeline-intro-date");
    if (timelineIntroDate && CONFIG.startDate) {
        const d = new Date(CONFIG.startDate);
        const formattedDate = !isNaN(d) ? `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` : CONFIG.startDate;
        timelineIntroDate.textContent = `Từ ngày ${formattedDate}`;
    }

    // Render Timeline
    const timelineContainer = document.getElementById("timeline-container");
    if (timelineContainer && CONFIG.timeline) {
        timelineContainer.innerHTML = "";
        CONFIG.timeline.forEach(item => {
            const el = document.createElement("div");
            el.className = "timeline-item scroll-animate";
            el.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-card">
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-desc">${item.description}</p>
                </div>
            `;
            timelineContainer.appendChild(el);
        });
    }

    // Render Love Notes
    const loveNotesList = document.getElementById("love-notes-list");
    if (loveNotesList && CONFIG.loveNotes) {
        loveNotesList.innerHTML = "";
        CONFIG.loveNotes.forEach(noteText => {
            const card = document.createElement("div");
            card.className = "love-note-card scroll-animate";
            card.textContent = noteText;
            loveNotesList.appendChild(card);
        });
    }
}

/* --------------------------------------------------------------------------
   4. AUDIO CONTROLLER
   -------------------------------------------------------------------------- */
function playAudio() {
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const statusText = musicToggle.querySelector(".music-status-text");

    if (!bgMusic) return;

    bgMusic.play().then(() => {
        musicToggle.classList.add("playing");
        statusText.textContent = "Playing";
    }).catch(err => {
        console.log("Audio autoplay prevented or file not found:", err);
        musicToggle.classList.remove("playing");
        statusText.textContent = "Muted";
    });
}

function pauseAudio() {
    const bgMusic = document.getElementById("bg-music");
    const musicToggle = document.getElementById("music-toggle");
    const statusText = musicToggle.querySelector(".music-status-text");

    if (!bgMusic) return;

    bgMusic.pause();
    musicToggle.classList.remove("playing");
    statusText.textContent = "Muted";
}

/* --------------------------------------------------------------------------
   5. FLOATING HEARTS & PARTICLES (Performance Optimized)
   -------------------------------------------------------------------------- */
function initFloatingParticles() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    const maxHearts = 15;
    let currentHearts = 0;

    function createHeart() {
        if (currentHearts >= maxHearts) return;

        const heart = document.createElement("div");
        heart.className = "floating-heart";
        
        // Random heart icons or symbols
        const hearts = ["❤️", "💖", "🌸", "✨", "💕"];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Position & size
        const left = Math.random() * 95;
        const duration = Math.random() * 6 + 6; // 6s - 12s
        const fontSize = Math.random() * 0.8 + 0.8; // 0.8rem - 1.6rem
        
        heart.style.left = `${left}%`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${fontSize}rem`;

        container.appendChild(heart);
        currentHearts++;

        // Auto clean after animation
        setTimeout(() => {
            heart.remove();
            currentHearts--;
        }, duration * 1000);
    }

    // Spawn interval
    setInterval(createHeart, 900);
}

/* --------------------------------------------------------------------------
   6. SCROLL ANIMATIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe element types
    document.querySelectorAll(".scroll-animate, .timeline-item, .photo-card, .love-note-card, .q-line").forEach(el => {
        observer.observe(el);
    });

    // Special trigger for final proposal section step text reveal
    const secQuestion = document.getElementById("sec-question");
    if (secQuestion) {
        const questionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealQuestionFlow();
                    questionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        questionObserver.observe(secQuestion);
    }
}

/* Story line fade reveal logic for Sec 2 */
function revealStoryLines() {
    const lines = document.querySelectorAll(".story-line");
    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add("visible");
        }, index * 1200 + 400);
    });
}

/* Question Flow step reveal logic for Sec 7 */
function revealQuestionFlow() {
    const qLines = document.querySelectorAll(".q-line");
    const questionAction = document.getElementById("question-action");

    qLines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add("visible");
        }, index * 1300 + 300);
    });

    setTimeout(() => {
        if (questionAction) questionAction.classList.add("visible");
    }, qLines.length * 1300 + 600);
}

/* --------------------------------------------------------------------------
   7. PHOTO GALLERY & LIGHTBOX
   -------------------------------------------------------------------------- */
function renderGallery() {
    const galleryGrid = document.getElementById("gallery-grid");
    if (!galleryGrid || !CONFIG.photos) return;

    galleryGrid.innerHTML = "";

    CONFIG.photos.forEach((photo, idx) => {
        const card = document.createElement("div");
        card.className = "photo-card scroll-animate";

        const wrapper = document.createElement("div");
        wrapper.className = "photo-card-img-wrapper";

        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.caption || `Kỷ niệm ${idx + 1}`;
        img.loading = "lazy";

        // Fallback for missing images
        img.onerror = () => {
            wrapper.innerHTML = `<div class="photo-placeholder">❤️ ${photo.caption || "Ảnh Kỷ Niệm"}</div>`;
        };

        wrapper.appendChild(img);
        card.appendChild(wrapper);

        if (photo.caption) {
            const caption = document.createElement("p");
            caption.className = "photo-caption";
            caption.textContent = photo.caption;
            card.appendChild(caption);
        }

        // Open Lightbox
        card.addEventListener("click", () => {
            openLightbox(photo.src, photo.caption);
        });

        galleryGrid.appendChild(card);
    });
}

function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxClose = document.getElementById("lightbox-close");

    if (!lightbox || !lightboxClose) return;

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function openLightbox(src, captionText) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    if (!lightbox || !lightboxImg) return;

    lightboxImg.src = src;
    // Fallback in lightbox
    lightboxImg.onerror = () => {
        lightboxImg.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%232a1822'/><text x='50%' y='50%' fill='%23f4a2af' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-size='20'>❤️ Kỷ niệm ngọt ngào</text></svg>";
    };

    lightboxCaption.textContent = captionText || "";
    lightbox.classList.remove("hidden");
    lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.add("hidden");
    lightbox.setAttribute("aria-hidden", "true");
}

/* --------------------------------------------------------------------------
   8. TIME COUNTER REALTIME
   -------------------------------------------------------------------------- */
function startCounter() {
    const startDate = new Date(CONFIG.startDate);

    function update() {
        const now = new Date();
        const diffMs = now - startDate;

        if (isNaN(diffMs) || diffMs < 0) return;

        // Calculations
        const seconds = Math.floor((diffMs / 1000) % 60);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

        // Approximate Year/Month/Day calculation for romantic clarity
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        // Update DOM
        const elemY = document.getElementById("cnt-years");
        const elemM = document.getElementById("cnt-months");
        const elemD = document.getElementById("cnt-days");
        const elemH = document.getElementById("cnt-hours");
        const elemMin = document.getElementById("cnt-minutes");
        const elemS = document.getElementById("cnt-seconds");

        if (elemY) elemY.textContent = years;
        if (elemM) elemM.textContent = months;
        if (elemD) elemD.textContent = days;
        if (elemH) elemH.textContent = String(hours).padStart(2, '0');
        if (elemMin) elemMin.textContent = String(minutes).padStart(2, '0');
        if (elemS) elemS.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   9. PROPOSAL BUTTON MECHANICS ("Đồng ý" vs "Để em suy nghĩ...")
   -------------------------------------------------------------------------- */
function initProposalLogic() {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const secFinale = document.getElementById("sec-finale");

    if (!btnYes || !btnNo) return;

    let noClickCount = 0;

    // "Để em suy nghĩ..." subtle movement logic
    const moveBtnNo = () => {
        noClickCount++;

        if (noClickCount >= 3) {
            btnNo.textContent = "Thôi được rồi, anh biết em đồng ý mà 😌";
            btnNo.style.transform = "none";
            btnNo.style.background = "rgba(230, 57, 86, 0.2)";
            btnNo.style.color = "var(--color-rose)";
            return;
        }

        // Gentle shift on touch / hover
        const offsetX = (Math.random() * 80 - 40); // -40px to 40px
        const offsetY = (Math.random() * 40 - 20); // -20px to 20px
        btnNo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    btnNo.addEventListener("touchstart", (e) => {
        if (noClickCount < 3) {
            e.preventDefault();
            moveBtnNo();
        } else {
            // Clicked after morphing -> trigger yes
            triggerFinale();
        }
    });

    btnNo.addEventListener("mouseenter", moveBtnNo);
    btnNo.addEventListener("click", () => {
        if (noClickCount >= 3) {
            triggerFinale();
        } else {
            moveBtnNo();
        }
    });

    // "❤️ Đồng ý" click -> Finale
    btnYes.addEventListener("click", triggerFinale);
}

function triggerFinale() {
    const secFinale = document.getElementById("sec-finale");
    if (!secFinale) return;

    secFinale.classList.remove("hidden");
    triggerHeartExplosion();
}

/* Finale heart explosion / particle burst */
function triggerHeartExplosion() {
    const container = document.getElementById("particles-container");
    if (!container) return;

    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "floating-heart";
            heart.textContent = ["❤️", "💖", "💕", "✨", "🌸"][Math.floor(Math.random() * 5)];
            
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const size = Math.random() * 1.5 + 1.2;

            heart.style.left = `${left}%`;
            heart.style.animationDuration = `${duration}s`;
            heart.style.fontSize = `${size}rem`;

            container.appendChild(heart);

            setTimeout(() => heart.remove(), duration * 1000);
        }, i * 60);
    }
}

/* --------------------------------------------------------------------------
   10. EASTER EGG (Click 5 times on small heart icon)
   -------------------------------------------------------------------------- */
function initEasterEgg() {
    const btn = document.getElementById("easter-egg-btn");
    const toast = document.getElementById("easter-egg-toast");

    if (!btn || !toast) return;

    let clicks = 0;
    let timer = null;

    btn.addEventListener("click", () => {
        clicks++;
        
        clearTimeout(timer);
        timer = setTimeout(() => { clicks = 0; }, 3000);

        if (clicks >= 5) {
            clicks = 0;
            toast.classList.add("show");
            
            setTimeout(() => {
                toast.classList.remove("show");
            }, 4000);
        }
    });
}
