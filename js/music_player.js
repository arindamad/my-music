





let now_playing = document.querySelector(".now-playing");
    let track_art = document.querySelector(".track-art");
    let track_name = document.querySelector(".track-name");
    let track_artist = document.querySelector(".track-artist");

    let playpause_btn = document.querySelector(".playpause-track");
    let next_btn = document.querySelector(".next-track");
    let prev_btn = document.querySelector(".prev-track");

    let seek_slider = document.querySelector(".seek_slider");
    let volume_slider = document.querySelector(".volume_slider");
    let curr_time = document.querySelector(".current-time");
    let total_duration = document.querySelector(".total-duration");

    let track_index = 0;
    let isPlaying = false;
    let updateTimer;

    // Create new audio element
    let curr_track = document.createElement('audio');

    // Define the tracks that have to be played
   




    function loadTrack(track_index, url) {
      clearInterval(updateTimer);
      resetValues();

      // Load a new track
      curr_track.src = url;
      curr_track.load();

      // Update details of the track
    //   track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    //   track_name.textContent = track_list[track_index].name;
    //   track_artist.textContent = track_list[track_index].artist;
    //   now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

      // Set an interval of 1000 milliseconds for updating the seek slider
      updateTimer = setInterval(seekUpdate, 1000);

      // Move to the next track if the current one finishes playing
      curr_track.addEventListener("ended", nextTrack);

      
    }

   

    // Reset Values
    function resetValues() {
      curr_time.textContent = "00:00";
      total_duration.textContent = "00:00";
      seek_slider.value = 0;
    }

    function playpauseTrack() {
      if (!isPlaying) playTrack();
      else pauseTrack();
    }

    function playTrack() {
      curr_track.play();
      isPlaying = true;

      // Replace icon with the pause icon
      playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';

      $(".crrently_playing").addClass("active");
      $(document).find(".crrently_playing img").attr("src", "images/icon/pause.svg");

    }

    function pauseTrack() {
      curr_track.pause();
      isPlaying = false;

      // Replace icon with the play icon
      playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';

    
      $(".crrently_playing").removeClass("active");
      $(document).find(".crrently_playing img").attr("src", "images/icon/play.svg");


    }

    function nextTrack() {
      var getdbKey2 = $(".crrently_playing.active").attr("data-key");          
      var getcount =  $(".crrently_playing.active p").attr("data-played");          
      
      var getCurrentAuthUid2 = firebase.auth().currentUser.uid;
      var arRefss  = firebase.database().ref("timeline/"+getCurrentAuthUid2+"/"+getdbKey2+"/");
      arRefss.push({
        timeStamp: new Date(),
        totalPlayMinute: "100"
      });
      console.log(arRefss);





      var url = $(".eachPlayerSong.crrently_playing").next().attr("data-url");
      var getIndex = $(".eachPlayerSong.crrently_playing").index();
      getIndex++;
      $(".eachPlayerSong").removeClass("crrently_playing active");
      $(".eachPlayerSong").eq(getIndex).addClass("crrently_playing active");

      // $(this).removeClass("crrently_playing");
      loadTrack(track_index, url);
      playTrack();
    }

    function prevTrack() {
      var url = $(".eachPlayerSong.crrently_playing").next().attr("data-url");
      var getIndex = $(".eachPlayerSong.crrently_playing").index();
      getIndex--;
      $(".eachPlayerSong").removeClass("crrently_playing active");
      $(".eachPlayerSong").eq(getIndex).addClass("crrently_playing active");


      loadTrack(track_index, url);
      playTrack();

     
    }

    function seekTo() {
      seekto = curr_track.duration * (seek_slider.value / 100);
      curr_track.currentTime = seekto;
    }

    function setVolume() {
      curr_track.volume = volume_slider.value / 100;
    }

    function seekUpdate() {
      let seekPosition = 0;

      // Check if the current track duration is a legible number
      if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        if(seekPosition== 2 ){
         
          // arRefss.update({
          //   totalPlayed: getcount,
          // }, function (params) {
          //   console.log("success");
          // });
        }
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Adding a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }

$(document).on("click", ".eachPlayerSong .songIcon", function () {
      $(".player").css('display', 'flex');
    if($(this).closest(".eachPlayerSong").hasClass("active")!=true){    
        $(this).closest(".eachPlayerSong").siblings().removeClass("crrently_playing active");
        $(this).closest(".eachPlayerSong").siblings().find("img").attr("src", "images/icon/play.svg");

        var url =  $(this).closest(".eachPlayerSong").attr("data-url");
        loadTrack(track_index, url);
        playTrack();
        $(this).closest(".eachPlayerSong").addClass("crrently_playing active");
        $(this).closest(".eachPlayerSong").find("img").attr("src", "images/icon/pause.svg");
        $(".track-name").text($(this).closest(".eachPlayerSong").find(".songInfo h6").text());
    }else{        
     
        pauseTrack();
        
    }
})
     



//for upload files section 

$(".closeUploadWindow").on("click", function () {
  $(this).closest(".uploadSongsWrap").fadeOut();
});
$(".uploadSongs").on("click", function () {
  $(".uploadSongsWrap").fadeIn(function () {
    $(this).css("display", "flex");
  });
});