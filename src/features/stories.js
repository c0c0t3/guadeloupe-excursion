import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

function stories() {

  const swiperWrapper = document.querySelector('.swiper-wrapper');

  function addSlide(videoName, swipperWrapper) {
    const newSlide2 =
      `<div class="swiper-slide swiper-slide-1"><video>
    <source src2="https://www.w3schools.com/html/mov_bbb.mp4" src="https://cdn.jsdelivr.net/gh/c0c0t3/guadeloupe-excursion@main/src/assets/${videoName}.mp4" type="video/mp4">
    </video>
    <div class="video-controls">
      <button class="play-pause">Play</button>
      <button class="mute">Mute</button>
    </div>
    </div>`;
    swipperWrapper.insertAdjacentHTML('beforeend', newSlide2);
  }

  const swiper = new Swiper('.stories_slider', {
    direction: 'vertical',
    effect: 'coverflow',
    mousewheel: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  });

  const stories = document.querySelectorAll('.stories_item');
  const stories_slider = document.querySelector('.stories_slider');
  stories.forEach((item, index) => {
    const videoURL = item.getAttribute('data-video');
    console.log(videoURL);
    addSlide(videoURL, swiperWrapper)
    swiper.update();
    item.addEventListener('click', () => {
      console.log(index);
      swiper.slideTo(index);
      stories_slider.classList.toggle('active');
      document.body.classList.toggle('lock');
      header.classList.toggle('hidden');
      document.querySelector('.swiper-slide video').play();
    });
  });



  swiper.on('slideChange', function () {
    // Pause all videos
    document.querySelectorAll('.swiper-slide video').forEach(function (video) {
      video.pause();
    });

    // Play video in the active slide
    var activeSlideVideo = swiper.slides[swiper.activeIndex].querySelector('video');
    if (activeSlideVideo) {
      activeSlideVideo.play();
    }
  });

  var videos = document.querySelectorAll('.swiper-slide video');
  videos.forEach(function (video) {
    var playPauseButton = video.nextElementSibling.querySelector('.play-pause');
    var muteButton = video.nextElementSibling.querySelector('.mute');

    playPauseButton.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        this.textContent = 'Pause';
      } else {
        video.pause();
        this.textContent = 'Play';
      }
    });

    muteButton.addEventListener('click', function () {
      video.muted = !video.muted;
      this.textContent = video.muted ? 'Unmute' : 'Mute';
    });
  });

  videos.forEach(function (video) {
    // ... existing code for play/pause and mute buttons ...

    // Event listener for when the video ends
    video.addEventListener('ended', function () {
      // Go to the next slide
      swiper.slideNext();
    });
  });

  const closeBtn = document.querySelector('.btn-pause_icon');
  const header = document.querySelector('.navbar1_component');
  closeBtn.addEventListener('click', () => {
    stories_slider.classList.toggle('active');
    document.body.classList.toggle('lock');
    header.classList.toggle('hidden');
  });

}

export default stories;