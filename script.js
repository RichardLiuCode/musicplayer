const player = document.getElementById("player");
const playerTimeline = document.getElementById("player-bar");
let isPlaying = false;
let isTimelineBarDraging = false;
let subtitlePosition = 0;
setInterval(function () {
    document.getElementById("subtitleText").style.transform = `translateX(${subtitlePosition}px)`;
    const subtitleTextWidth = Math.round(parseFloat(window.getComputedStyle(document.getElementById("subtitleText")).width)) + 10;
    subtitlePosition = subtitlePosition - 1;
    if (subtitlePosition < subtitleTextWidth * -1) {
        subtitlePosition = 200;
    }
}, 40);
document.getElementById("uploadBtn").addEventListener("click", function () {
    const selectedFile = document.getElementById("file-selector").files[0];
    const audioName = selectedFile.name;
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (file) {
            const audio = file.target.result;
            document.getElementById("player-source").src = audio;
            player.load();
            document.querySelector(".homePage").style.display = "none";
            document.querySelector(".playPage").style.display = "flex";
            document.getElementById("subtitleText").textContent = audioName;
            document.getElementById("play-button").style.backgroundImage = "url(\"playIcon.png\")";
            document.getElementById("play-button").style.backgroundSize = "70%";
            isPlaying = false;
            if (isPlaying) {
                player.pause();
            }

        };
        reader.readAsDataURL(selectedFile);
    }
});

document.getElementById("play-button").addEventListener("click", function () {
    if (!isPlaying) {
        this.style.backgroundImage = "url(\"pauseIcon.png\")";
        this.style.backgroundSize = "50%";
        isPlaying = true;
        player.play();
    } else {
        this.style.backgroundImage = "url(\"playIcon.png\")";
        this.style.backgroundSize = "70%";
        isPlaying = false;
        player.pause();
    }
});
player.addEventListener("pause", function () {
    document.getElementById("play-button").style.backgroundImage = "url(\"playIcon.png\")";
    document.getElementById("play-button").style.backgroundSize = "70%";
    isPlaying = false;
});

player.addEventListener("play", function () {
    document.getElementById("play-button").style.backgroundImage = "url(\"pauseIcon.png\")";
    document.getElementById("play-button").style.backgroundSize = "50%";
    isPlaying = true;
});

function updateTimelineColor() {
    document.getElementById("videoProgressBar").max = document.getElementById("videoProgressBar").max;
    document.getElementById("videoProgressBar").value = playerTimeline.value;
}

function displayTime(currentTime, duration) {
    const currentTimeObject = {
        seconds: currentTime % 60,
        minutes: Math.floor(currentTime / 60),
        displayString: function () {
            return this.minutes.toString().padStart(2, "0") + ":" + Math.round(this.seconds).toString().padStart(2, "0");
        }
    };
    const maxTimeObject = {
        seconds: duration % 60,
        minutes: Math.floor(duration / 60),
        displayString: function () {
            return this.minutes.toString().padStart(2, "0") + ":" + Math.round(this.seconds).toString().padStart(2, "0");
        }
    };
    document.getElementById("timeDisplay").innerHTML = currentTimeObject.displayString() + "&nbsp/&nbsp" + maxTimeObject.displayString();
    document.querySelector(".play-area-wrapper").style.display = "flex";
}
playerTimeline.addEventListener("mousedown", function () {
    isTimelineBarDraging = true;
    updateTimelineColor();
});
playerTimeline.addEventListener("mouseup", function () {
    isTimelineBarDraging = false;
    player.currentTime = playerTimeline.value;
    updateTimelineColor();
});
playerTimeline.addEventListener("click", function () {
    updateTimelineColor();
});
player.addEventListener("loadedmetadata", function () {
    playerTimeline.max = player.duration;
    document.getElementById("videoProgressBar").max = player.duration;
    displayTime(player.currentTime, playerTimeline.max);
});
player.addEventListener("timeupdate", function () {
    if (!isTimelineBarDraging) {
        playerTimeline.value = player.currentTime;
        displayTime(player.currentTime, player.duration);
    }
    updateTimelineColor();

});
player.addEventListener("ended", function () {
    playerTimeline.value = parseFloat(playerTimeline.max);
});

document.getElementById("closePlayerBtn").addEventListener("click", function () {
    if (isPlaying) {
        document.getElementById("play-button").style.backgroundImage = "url(\"playIcon.png\")";
        document.getElementById("play-button").style.backgroundSize = "70%";
        isPlaying = false;
        player.pause();
    }
    document.querySelector(".homePage").style.display = "revert";
    document.querySelector(".playPage").style.display = "none";
});