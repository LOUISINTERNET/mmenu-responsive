const responsiveMmenu = (
  createMmenu,
  navSelector = '#nav',
  breakpoint = 1279
) => {
  const getBrowserWidth = () =>
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const cloneNav = () =>
    (nav = document.querySelector(navSelector).cloneNode(true))
  const parent = document.querySelector(navSelector).parentNode

  let nav
  let mmenu = null

  window.addEventListener('resize', () => {
    if (getBrowserWidth() <= breakpoint && !mmenu) {
      cloneNav()
      createMmenu.call()
      mmenu = $(navSelector).data('mmenu')
    } else if (getBrowserWidth() > breakpoint && mmenu !== null) {
      document.querySelector('.mm-menu').remove()
      parent.appendChild(nav)
      mmenu = null
    }
  })
  window.dispatchEvent(new Event('resize'))
}

if (window) window.responsiveMmenu = responsiveMmenu
module.exports = responsiveMmenu
