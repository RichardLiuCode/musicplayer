const player = document.getElementById("player");
let isPlaying = false;
document.getElementById("uploadBtn").addEventListener("click", function () {
    const selectedFile = document.getElementById("file-selector").files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (file) {
            const audio = file.target.result;
            document.getElementById("player-source").src = audio;
            player.load();
            player.addEventListener("loadedmetadata", function () {
                document.getElementById("player-bar").max = player.duration;
            });
        };
        reader.readAsDataURL(selectedFile);
    }
});

document.getElementById("play-button").addEventListener("click", function () {
    if (!isPlaying) {
        this.textContent = "⏸";
        isPlaying = true;
        player.play();
    } else {
        this.textContent = "▶";
        isPlaying = false;
        player.pause();
    }
});

player.addEventListener("timeupdate", function () {
    document.getElementById("player-bar").value = player.currentTime;
});