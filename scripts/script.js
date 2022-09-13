new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          ชื่อเพลง: "สบายดีไหม",
          ศิลปิล: "PARATA",
          cover: "https://i.pinimg.com/originals/2c/38/1a/2c381a5e99c66e147e90fd99e7ed02a8.gif",
          source: "mp3/สบายดีไหม - PARATA.mp3",
          url: "https://www.youtube.com/watch?v=jO2viLEW-1A",
          favorited: false
        },
        {
          ชื่อเพลง: "ปิดตาข้างนึง",
          ศิลปิล: "ทรงไทย",
          cover: "https://i.gifer.com/VIR.gif",
          source: "mp3/ปิดตาข้างนึง - ทรงไทย.mp3",
          url: "https://www.youtube.com/watch?v=1kehqCLudyg",
          favorited: false
        },
        {
          ชื่อเพลง: "ได้แค่ไหน เอาแค่นั้น",
          ศิลปิล: "Mummy Daddy",
          cover: "https://i.gifer.com/4Cb2.gif",
          source: "mp3/ได้แค่ไหน เอาแค่นั้น - Mummy Daddy.mp3",
          url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
          favorited: true
        },
        {
          ชื่อเพลง: "DancingWithYourGhost",
          ศิลปิล: "Sasha Sloan",
          cover: "https://i.gifer.com/B8mk.gif",
          source: "mp3/DancingWithYourGhost.mp3",
          url: "https://www.youtube.com/watch?v=zVT063ootrU",
          favorited: false
        },
        {
          name: "SignoftheTimes",
          artist: "Harry Styles",
          cover: "https://i.gifer.com/2A5.gif",
          source: "mp3/SignoftheTimes.mp3",
          url: "https://www.youtube.com/watch?v=qN4ooNx77u0",
          favorited: false
        },
        {
          name: "LetMeDownSlowly",
          artist: "Alec Benjamin",
          cover: "https://i.gifer.com/7CLk.gif",
          source: "mp3/LetMeDownSlowly.mp3",
          url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
          favorited: true
        },
        {
          name: "Lovely",
          artist: "Billie Eilish",
          cover: "https://cdn5.beatstars.com/eyJidWNrZXQiOiJidHMtY29udGVudCIsImtleSI6InVzZXJzL3Byb2QvMTI3MTQ3L2ltYWdlL2NLSlNaUENYdUdKci8xNDc3MzU3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJmaWxsIiwid2lkdGgiOjI0MCwiaGVpZ2h0IjoyNDB9fX0=?t=1653201151715",
          source: "mp3/Billie Eilish ft.mp3",
          url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
          favorited: false
        },
        {
          name: "Robbers",
          artist: "The1975",
          cover: "https://4.bp.blogspot.com/-AwihXVCRsgc/VvZTvei5Q3I/AAAAAAAAAMA/XwsRO7dOEtU-BZLrfsWXckieioUnHJPpw/s1600/tumblr_o49jt5X9hb1s4z0mfo1_500.gif",
          source: "mp3/The1975-Robbers.mp3",
          url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
          favorited: true
        },
        {
          name: "Overdose",
          artist: "Grandson",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/8.mp3",
          url: "https://www.youtube.com/watch?v=00-Rl3Jlx-o",
          favorited: false
        },
        {
          name: "Rag'n'Bone Man",
          artist: "Human",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/9.mp3",
          url: "https://www.youtube.com/watch?v=L3wKzyIN1yk",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
