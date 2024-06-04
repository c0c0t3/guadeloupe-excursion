function headerNav() {
  const headerNav = document.querySelector('.navbar1_component')
  const body = document.querySelector('body')

  let lastScrollTop = 0
  function onScroll() {
    document.addEventListener(
      'scroll',
      function () {
        const st = window.scrollY || document.documentElement.scrollTop

        if (st > lastScrollTop && st > 200) {
          // Scrolling down
          headerNav.classList.add('is-hidden')
          headerNav.classList.remove('is-blue')
          /* if headerNav has a classList of 'is-home', remove it */
        } else if (st < lastScrollTop && st > 200) {
          headerNav.classList.remove('is-hidden')
          headerNav.classList.add('is-blue')
        } else if (st < lastScrollTop && st < 200) {
          headerNav.classList.remove('is-blue')
          headerNav.classList.remove('is-hidden')
        } else {
          // Scrolling up
          headerNav.classList.remove('is-hidden')
        }
        lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
      },
      false
    )
  }

  requestAnimationFrame(onScroll)
}

export default headerNav
