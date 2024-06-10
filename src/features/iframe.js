function iframe() {

  const iframeVideos = document.querySelectorAll('.video-iframe');

  const observerOptions = {
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.5 // Trigger when at least 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const div = entry.target;
        const dataSrc = div.getAttribute('data-src');
        const videoId = new URLSearchParams(new URL(dataSrc).search).get('v');
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.classList.add('iframe-video-img');

        const button = div.querySelector('.video-play');
        button.addEventListener('click', () => {
          const iframe = document.createElement('iframe');
          iframe.width = '560';
          iframe.height = '315';
          iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
          iframe.frameBorder = '0';
          iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
          iframe.allowFullscreen = true;

          div.innerHTML = '';
          div.appendChild(iframe);
        });

        div.appendChild(img);
        div.appendChild(button);

        observer.unobserve(div);
      }
    });
  }, observerOptions);

  iframeVideos.forEach(video => observer.observe(video));

}

export default iframe;