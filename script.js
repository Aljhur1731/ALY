const startButton = document.getElementById("startButton");
const introLoader = document.getElementById("introLoader");
const loadingPercent = document.getElementById("loadingPercent");
const hudPlayIcon = document.getElementById("hudPlayIcon");
const hudPauseIcon = document.getElementById("hudPauseIcon");

const timelineProgress = document.getElementById("timelineProgress");
const currentTimeDisplay = document.getElementById("currentTimeDisplay");
const durationDisplay = document.getElementById("durationDisplay");

const timelineBar = document.getElementById("timelineBar");
const previewThumbnail = document.getElementById("previewThumbnail");
const previewCanvas = document.getElementById("previewCanvas");
const previewTime = document.getElementById("previewTime");

const previewCtx = previewCanvas.getContext("2d");

const previewVideo = document.createElement("video");

previewVideo.muted = true;
previewVideo.preload = "auto";
previewCanvas.width = 320;
previewCanvas.height = 180;
function updateTimelinePosition(clientX){

    const rect = timelineBar.getBoundingClientRect();

    let position = clientX - rect.left;

    position = Math.max(0, Math.min(position, rect.width));

    const percent = position / rect.width;

    const previewTimeValue =
        percent * prePlayTrailer.duration;

    // move preview
    previewThumbnail.style.left = position + "px";

    previewThumbnail.classList.add("show");

    previewTime.innerText =
        formatTime(previewTimeValue);

    previewVideo.currentTime =
        previewTimeValue;

    previewVideo.onseeked = () => {

        previewCtx.drawImage(
            previewVideo,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height
        );

    };

    if(isDraggingTimeline){

        prePlayTrailer.currentTime =
            previewTimeValue;

        timelineProgress.style.width =
            (percent*100)+"%";

        currentTimeDisplay.innerText =
            formatTime(previewTimeValue);

    }

}

const tudumAudio = document.getElementById('tudumAudio');
const prePlayTrailer = document.getElementById('prePlayTrailer');
previewVideo.src = prePlayTrailer.querySelector("source").src;
const logo = document.getElementById('netflixLogo');
const introOverlay = document.getElementById('introOverlay');
const videoControllerHud = document.getElementById('videoControllerHud');
const profileScreen = document.getElementById('profileScreen');
// =============================
// NETFLIX AUTO HUD
// =============================

let hudTimeout;

// =============================
// NETFLIX TIMELINE DRAG
// =============================

let isDraggingTimeline = false;

startButton.addEventListener("click",()=>{


    startButton.style.display="none";

    introLoader.classList.remove("hidden");


    let percent = 0;
    let speed = 80;


    let loading = setInterval(()=>{


        percent++;


        loadingPercent.innerText = percent + "%";


        if(percent < 30){
            speed = 100;
        }


        if(percent >=30 && percent <90){
            speed = 45;
        }


        if(percent >=90){
            speed = 150;
        }



        if(percent >=100){


            clearInterval(loading);


            setTimeout(()=>{


                introLoader.classList.add("hidden");


                startNetflixIntro();


            },700);


        }


    },speed);


});

function startNetflixIntro(){


    logo.style.display="block";


    tudumAudio.currentTime = 0;

    tudumAudio.play()
    .then(()=>{

        console.log("TUDUM PLAYING");

    })
    .catch(err=>{

        console.log("TUDUM ERROR",err);

    });



    setTimeout(()=>{


        logo.style.display="none";


        prePlayTrailer.classList.remove("hidden");


        prePlayTrailer.muted = false;

        prePlayTrailer.volume = 1;


        prePlayTrailer.play()
        .then(()=>{

            console.log("TRAILER PLAYING WITH AUDIO");
            // ============================
// NETFLIX TITLE INTRO
// ============================

const titleIntro = document.getElementById("titleIntro");

// Show after 0.8 sec
setTimeout(() => {

    titleIntro.classList.remove("hidden");

    requestAnimationFrame(() => {

        titleIntro.classList.add("show");

    });

}, 800);

// Hide after 4.2 sec
setTimeout(() => {

    titleIntro.classList.remove("show");

    setTimeout(() => {

        titleIntro.classList.add("hidden");

    }, 700);

}, 4200);

        })
        .catch(err=>{

            console.log("TRAILER ERROR",err);

        });



        videoControllerHud.classList.remove("hidden");
        startHudAutoHide();


    },3500);


}

// ================= TRAILER HUD CONTROLS =================


// VIDEO CLICK PLAY / PAUSE
if(prePlayTrailer){

    prePlayTrailer.addEventListener("click",()=>{

        if(prePlayTrailer.paused){

            prePlayTrailer.play();

            if(hudPlayIcon){
                hudPlayIcon.classList.add("hidden");
            }

            if(hudPauseIcon){
                hudPauseIcon.classList.remove("hidden");
            }

        }else{

            prePlayTrailer.pause();

            if(hudPauseIcon){
                hudPauseIcon.classList.add("hidden");
            }

            if(hudPlayIcon){
                hudPlayIcon.classList.remove("hidden");
            }

        }

    });


    // TIME UPDATE
   prePlayTrailer.addEventListener("timeupdate",()=>{
    


        const progress =
        (prePlayTrailer.currentTime / prePlayTrailer.duration) * 100;


        if(timelineProgress){
            timelineProgress.style.width = progress + "%";
        }


        if(currentTimeDisplay){
            currentTimeDisplay.innerText =
            formatTime(prePlayTrailer.currentTime);
        }


        if(durationDisplay){
            durationDisplay.innerText =
            formatTime(prePlayTrailer.duration);
        }

    });
    prePlayTrailer.addEventListener("ended", () => {

    console.log("VIDEO FINISHED");

    switchToProfileScreen();

});

}



// FORMAT TIME
function formatTime(seconds){

    let mins = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);


    if(secs < 10){
        secs = "0" + secs;
    }


    return mins + ":" + secs;

}



function adjustTrailerTime(seconds){

    if(!prePlayTrailer) return;

    let target = prePlayTrailer.currentTime + seconds;

    if(target < 0) target = 0;

    if(target > prePlayTrailer.duration){

        target = prePlayTrailer.duration;

    }

    prePlayTrailer.currentTime = target;

}
// =============================
// NETFLIX DRAGGABLE TIMELINE
// =============================

if (timelineBar) {

    timelineBar.addEventListener("mousedown", (e) => {

        isDraggingTimeline = true;

        updateTimelinePosition(e.clientX);

    });

    timelineBar.addEventListener("mousemove",(e)=>{

    updateTimelinePosition(e.clientX);

});

    document.addEventListener("mouseup", () => {

    isDraggingTimeline = false;

    previewThumbnail.classList.remove("show");

});
timelineBar.addEventListener("mouseleave",()=>{

    if(!isDraggingTimeline){

        previewThumbnail.classList.remove("show");

    }

});

}



// MUTE BUTTON
function toggleMute(){

    if(!prePlayTrailer) return;


    prePlayTrailer.muted =
    !prePlayTrailer.muted;


    const volumeIcon =
    document.getElementById("volumeIcon");


    const muteIcon =
    document.getElementById("muteIcon");


    if(prePlayTrailer.muted){

        volumeIcon.classList.add("hidden");
        muteIcon.classList.remove("hidden");

    }else{

        volumeIcon.classList.remove("hidden");
        muteIcon.classList.add("hidden");

    }

}



// PLAY BUTTON SA HUD
function toggleHudPlayback(){

    if(prePlayTrailer.paused){

        prePlayTrailer.play();

        if(hudPlayIcon)
            hudPlayIcon.classList.add("hidden");

        if(hudPauseIcon)
            hudPauseIcon.classList.remove("hidden");

    }else{

        prePlayTrailer.pause();

        if(hudPauseIcon)
            hudPauseIcon.classList.add("hidden");

        if(hudPlayIcon)
            hudPlayIcon.classList.remove("hidden");

    }

}





// SKIP BUTTON
const skipButton =
document.getElementById("skipButton");


if(skipButton){

    skipButton.addEventListener("click",()=>{


        switchToProfileScreen();


    });

}

function switchToProfileScreen() {

    if (prePlayTrailer) {
        prePlayTrailer.pause();
        prePlayTrailer.currentTime = 0;
    }

    videoControllerHud.classList.add("hidden");

    introOverlay.style.opacity = "0";

    setTimeout(() => {

        introOverlay.style.display = "none";

        profileScreen.classList.remove("hidden");

        profileScreen.classList.add("fade-in");

    }, 600);

}

// 2. PROFILE LOADER
function triggerNetflixLoading() {
    document.getElementById('profileContentBox').classList.add('profile-fade-out');
    const loader = document.getElementById('netflixLoader');
    setTimeout(() => {
        loader.classList.remove('hidden');
        loader.classList.add('fade-in');
    }, 300);

    setTimeout(() => {
        profileScreen.style.opacity = '0';
        setTimeout(() => {
            profileScreen.style.display = 'none';
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('mainContent').classList.add('fade-in');
        }, 400);
    }, 2200);
}

function replayTrailer() {

    // show intro overlay again
    introOverlay.style.display = "flex";
    // Auto mute hero video habang replay trailer
if (heroVideo) {

    heroVideo.muted = true;

    if (heroMuteBtn) {
        heroMuteBtn.textContent = "🔇";
    }

}

introOverlay.style.opacity = "0";

setTimeout(() => {

    introOverlay.style.opacity = "1";

},20);

    // hide logo
    logo.style.display = "none";

    // show trailer
    prePlayTrailer.classList.remove("hidden");
    videoControllerHud.classList.remove("hidden");
    startHudAutoHide();

    // create Skip button once
    let skipBtn = document.getElementById("skipButton");

    if (!skipBtn) {

        skipBtn = document.createElement("button");

        skipBtn.id = "skipButton";

        skipBtn.className = "netflix-skip-btn";

        skipBtn.innerText = "Skip Intro";

        introOverlay.appendChild(skipBtn);

        skipBtn.addEventListener("click", () => {

            prePlayTrailer.pause();

            introOverlay.style.opacity = "0";

            setTimeout(() => {

                introOverlay.style.display = "none";

                prePlayTrailer.classList.add("hidden");

                videoControllerHud.classList.add("hidden");

            }, 600);

        });

    }

    skipBtn.style.display = "block";

   prePlayTrailer.currentTime = 0;

prePlayTrailer.muted = false;

setTimeout(() => {

    prePlayTrailer.play();

},500);
const titleIntro = document.getElementById("titleIntro");

setTimeout(() => {

    titleIntro.classList.remove("hidden");

    requestAnimationFrame(() => {
        titleIntro.classList.add("show");
    });

},3000);

setTimeout(() => {

    titleIntro.classList.remove("show");

    setTimeout(() => {

        titleIntro.classList.add("hidden");

    },800);

},8000);

    prePlayTrailer.onended = () => {

        skipBtn.style.display = "none";

        introOverlay.style.opacity = "0";

        setTimeout(() => {

            introOverlay.style.display = "none";

            prePlayTrailer.classList.add("hidden");

            videoControllerHud.classList.add("hidden");
            // Ensure hero stays muted after replay
if (heroVideo) {

    heroVideo.muted = true;

    if (heroMuteBtn) {
        heroMuteBtn.textContent = "🔇";
    }

}

        },600);

    };

}

function closeTrailerReplayMode() {
    isTrailerReplaying = false;
    if (prePlayTrailer) prePlayTrailer.pause();
    introOverlay.style.opacity = '0';
    setTimeout(() => {
        introOverlay.style.display = 'none';
        prePlayTrailer.classList.add('hidden');
        videoControllerHud.classList.add('hidden');
    }, 600);
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
    }
}

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) navbar.classList.add('nav-black');
    else navbar.classList.remove('nav-black');
});

// MEMORIES ALBUM DATA OBJECTS
const eventDatabase = {
    mainStory: {
        title: "Our Endless Story",
        episode: "Special Episode - Main Story",
        poster: "images/3.jpg",
        letter: "To the person who holds the key to my heart: This whole system is a living proof of how much I cherish our journey. We have survived so many episodes, and I can't wait to write millions of future seasons with you. I love you endlessly!",
        gallery: ["images/4.jpg", "images/5.jpg", "images/6.jpg", "images/7.jpg"]
    },
    bday16: {
        title: "Her Beautiful 16th Birthday Bash",
        episode: "S1:E4 - The Sweet Sixteen Party 🎂",
        poster: "images/28.jpg",
        letter: "Happy Birthday, my love! Seeing you smile during your special day was the best highlight of my entire year. Here is a compilation of your prettiest candid moments and the hidden memories we saved from that day. You deserve the absolute world!",
        gallery: ["images/8.jpg", "images/9.jpg", "images/10.jpg", "images/11.jpg"]
    },
    lateNight: {
        title: "Late Night Deep Talks",
        episode: "S1:E1 - 2AM Conversations 📞",
        poster: "images/4.jpg",
        letter: "Those hours spent talking about nothing and everything under the night sky built the foundation of us. Here are some quick screenshots and snippets from those comfortable late nights.",
        gallery: ["images/31.jpg", "images/32.jpg"]
    },
    foodTrip: {
        title: "Nonstop Food Escapades",
        episode: "S1:E2 - Street Food & Cafes 🍟",
        poster: "images/5.jpg",
        letter: "Our dates are never complete without stuffing our faces with good food! From simple street foods to heavy diners, sharing a table with you is my favorite routine.",
        gallery: ["images/33.jpg", "images/34.jpg"]
    },
    anniv1: {
        title: "The Golden Anniversary Special",
        episode: "Milestone Episode - Year 1 💍",
        poster: "images/12.jpg",
        letter: "One whole year of loving you, choosing you, and standing by your side. This specific milestone proved that what we have is unbreakable. Happy Anniversary, love!",
        gallery: ["images/14.jpg", "images/16.jpg"]
    }
};

// 3. CORE MODAL CONTROLLER ENGINE WITH OUTSIDE INTERACTION CLICK CLICK
function openEventModal(eventId) {
    const data = eventDatabase[eventId];
    if (!data) return;
    
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalEpisodeTracker').innerText = data.episode;
    document.getElementById('modalLetter').innerText = data.letter;
    document.getElementById('modalBanner').style.backgroundImage = `url('${data.poster}')`;
    document.getElementById('modalDownloadBtn').innerHTML = `<span class="icon">⬇</span> Download ${data.title}`;
    
    const galleryRow = document.getElementById('modalGallery');
    galleryRow.innerHTML = ""; 
    data.gallery.forEach(imgUrl => {
        const imgCard = document.createElement('div');
        imgCard.className = 'gallery-card';
        imgCard.innerHTML = `<img src="${imgUrl}" alt="Memory">`;
        galleryRow.appendChild(imgCard);
    });
    
    document.getElementById('eventModal').classList.remove('hidden');
}

function closeEventModal() { 
    document.getElementById('eventModal').classList.add('hidden'); 
}

// BACKPACK OUTSIDE CLICK REGISTER TRIGGER
const eventModalOverlay = document.getElementById('eventModal');
if(eventModalOverlay) {
    eventModalOverlay.addEventListener('click', (e) => {
        // Kapag ang clinick ay ang black blur overlay mismo at hindi ang tablet card box, magco-close siya
        if (e.target === eventModalOverlay) {
            closeEventModal();
        }
    });
}
// ===========================
// NETFLIX HOVER DELAY
// ===========================

const netflixCards = document.querySelectorAll(".poster-card");

netflixCards.forEach(card=>{

    let hoverTimer;

    card.addEventListener("mouseenter",()=>{

        hoverTimer = setTimeout(()=>{

            card.classList.add("netflix-hover");

        },300);

    });

    card.addEventListener("mouseleave",()=>{

        clearTimeout(hoverTimer);

        card.classList.remove("netflix-hover");

    });

});
// =============================
// HERO VIDEO (NETFLIX STYLE)
// =============================

const heroVideo = document.getElementById("heroVideo");
const heroSection = document.getElementById("home");

if (heroVideo && heroSection) {

    // Always start muted
    heroVideo.muted = true;

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                heroVideo.play().catch(() => {});

            } else {

                heroVideo.pause();

            }

        });

    }, {
        threshold: 0.45
    });

   observer.observe(heroSection);

}

// HERO MUTE BUTTON

const heroMuteBtn = document.getElementById("heroMuteBtn");


if (heroMuteBtn && heroVideo) {

    heroMuteBtn.addEventListener("click", function(){

        heroVideo.muted = !heroVideo.muted;


        if (heroVideo.muted) {

            heroMuteBtn.textContent = "🔇";

        } else {

            heroMuteBtn.textContent = "🔊";

        }

    });

}
// =============================
// AUTO HIDE HUD
// =============================

function showHud(){ if(!videoControllerHud) return; videoControllerHud.style.opacity = "1"; document.body.style.cursor = "default"; clearTimeout(hudTimeout); hudTimeout = setTimeout(hideHud,3000); }
 function hideHud(){ if(!videoControllerHud) return; videoControllerHud.style.opacity = "0"; document.body.style.cursor = "none"; } 
 function startHudAutoHide(){

    showHud();

    document.addEventListener("mousemove",showHud);

}