import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

function stories() {


  /**
   *
   * Programmaticaly add slides to the swiper
   *
   */
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

  /**
   *
   * Swiper configuration
   *
   */

  const swiperOptions = {
    direction: 'vertical',
    effect: 'coverflow',
    mousewheel: true,
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  }
  const swiper = new Swiper('.stories_slider', swiperOptions);


  /***
   *
   * Video controls
   *
   */

  const videos = document.querySelectorAll('.swiper-slide video');
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

  /**
   *
   * Stories component from webflow
   *
   */

  const stories = document.querySelectorAll('.stories_item');
  const stories_slider = document.querySelector('.stories_slider');
  stories.forEach((story, index) => {
    // Get video URL from data attribute
    const videoURL = story.getAttribute('data-video');
    // Add slide to swiper
    addSlide(videoURL, swiperWrapper)
    // Update swiper
    swiper.update();
    story.addEventListener('click', () => {
      // Slide to the clicked slide index
      swiper.slideTo(index);

      // Open the modal
      stories_slider.classList.toggle('active');
      document.body.classList.toggle('lock');
      header.classList.toggle('hidden');

      // Play video in the active slide
      var activeSlideVideo = swiper.slides[swiper.activeIndex].querySelector('video');
      if (activeSlideVideo) {
        activeSlideVideo.play();
      }

      // Swiper to next slide when video ends
      activeSlideVideo.addEventListener('ended', function () {
        swiper.slideNext();
      });

    });
  });



  /**
   *
   * On swiper change
   *
   */
  swiper.on('slideChange', function () {
    console.log('swiper Active Index : ' + swiper.activeIndex);

    // Pause all videos
    document.querySelectorAll('.swiper-slide video').forEach(function (video) {
      console.log(video);
      video.pause();
    });

    // Play video in the active slide
    var activeSlideVideo = swiper.slides[swiper.activeIndex].querySelector('video');
    if (activeSlideVideo) {
      activeSlideVideo.play();
    }
  });

  /**
   *
   * Close button
   *
   */

  const closeBtn = document.querySelector('.btn-pause_icon');
  const header = document.querySelector('.navbar1_component');
  closeBtn.addEventListener('click', () => {
    const videos2 = document.querySelector('.swiper-slide-active video');
    stories_slider.classList.toggle('active');
    document.body.classList.toggle('lock');
    header.classList.toggle('hidden');
    videos2.pause();
  });

}

export default stories;