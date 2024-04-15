import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

function createBadge() {

  console.log('lets play !')

  // Event listener to check when the container becomes visible
  // window.addEventListener('scroll', lazyLoadYouTubePlayer);

  function lazyLoadYouTubePlayer() {
    var script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.defer = true;
    script.async = true;
    // script.onload = initYouTubePlayer; // Initialize the player once the script is loaded
    document.body.appendChild(script);
  }



  function addSlide(yt, swipperWrapper) {
    // Create a new slide
    const newSlide = `<div data-video-id="${yt}" class="swiper-slide"><div id="player-${yt}" class="player-placeholder"></div></div>`; // You can customize content here

    // Append the new slide using Swiper API method
    swipperWrapper.insertAdjacentHTML('beforeend', newSlide);

    // Initialize the YouTube player
    const player = new YT.Player(`player-${yt}`, {
      videoId: yt,
      playerVars: {
        'rel': 0 // Set rel parameter to 0 to remove related videos
      },
      events: {
        'onReady': onPlayerReady,
      },
    });

    function onPlayerReady(event) {
      // event.target.playVideo(); // Auto-play the video when the player is ready
    }

  }


  const swiper = new Swiper('.stories_slider', {
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    speed: 400,
    spaceBetween: 0,
    direction: 'vertical',
    mousewheel: true,
    slidesPerView: 1,
    on: {
      init: function () {
        lazyLoadYouTubePlayer()
      },
      slideChange: function (el) {
        console.log('slideChange', el);
        // document.querySelector('.swiper-slide-active iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      },
      transitionEnd: function (el) {
        /* use youtube api to play video */



        document.querySelectorAll('.swiper-slide iframe').forEach(iframe => {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        });
        document.querySelector('.swiper-slide-active iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      },

    },
  })

  const swiperWrapper = document.querySelector('.swiper-wrapper');

  const stories = document.querySelectorAll('.stories_item');
  stories.forEach(story => {
    const videoURL = story.getAttribute('data-video');
    setTimeout(() => {
      addSlide(videoURL, swiperWrapper)
      swiper.update();
    }, 200);

  });
  // swiper.update();

  // Event listener to check when the container becomes visible
  // window.addEventListener('scroll', lazyLoadYouTubePlayer)
  // window.addEventListener('click', lazyLoadYouTubePlayer)
  // window.addEventListener('ontouchstart', lazyLoadYouTubePlayer)


  const stories_items = document.querySelectorAll('.stories_item');
  const stories_slider = document.querySelector('.stories_slider');
  const playPauseBtn = document.querySelector('.btn-pause');
  stories_items.forEach((item, index) => {
    item.addEventListener('click', () => {
      console.log(index);
      swiper.slideTo(index);
      document.querySelector('.swiper-slide-active iframe').contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      stories_slider.classList.toggle('active');

    });
    playPauseBtn.addEventListener('click', () => {
      document.querySelector('.swiper-slide-active iframe').contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');

    });
  });


}



export default createBadge
