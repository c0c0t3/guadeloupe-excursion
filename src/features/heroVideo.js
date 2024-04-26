function heroVideo() {
  let heroModal = document.querySelector('.hero_modal')
  let heroPlayComponent = document.querySelector('.hero_play_component')

  if (heroModal && heroPlayComponent) {
    let videoURL = heroPlayComponent.getAttribute('data-video-url')

    /* Create Video element with and append to modal */
    const video = document.createElement('video')
    video.setAttribute('controls', '')
    video.setAttribute('playsinline', '')
    video.setAttribute('loop', '')
    video.setAttribute('src', videoURL)
    heroModal.appendChild(video)

    const closeBtn = document.querySelector('.btn-pause')

    heroPlayComponent.addEventListener('click', () => {
      heroModal.classList.add('is-active')
      video.play()
    })

    closeBtn.addEventListener('click', () => {
      console.log('close')
      heroModal.classList.remove('is-active')
      video.pause()
    })
  }
}

export default heroVideo
