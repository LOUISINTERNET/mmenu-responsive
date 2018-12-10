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
  const switchFromMobilToDesktop = () => {
    document.querySelector(navSelector).remove()
    document.querySelector('.mm-wrapper__blocker').remove()
    document.querySelector('.mm-page').removeAttribute('style')

    const mmenuItemsWithId = document.querySelectorAll('[id*="mm-"]')
    mmenuItemsWithId.forEach(item => item.removeAttribute('id'))

    const mmenuItemsWithClass = document.querySelectorAll('[class*="mm-"]')
    Array.from(mmenuItemsWithClass).forEach(item => {
      item.classList.remove.apply(item.classList, Array.from(item.classList).filter(v=>v.startsWith('mm-')));
    })
    parent.appendChild(nav)
  }

  let nav
  let mmenu = null

  window.addEventListener('resize', () => {
    if (getBrowserWidth() <= breakpoint && !mmenu) {
      cloneNav()
      createMmenu.call()
      mmenu = $(navSelector).data('mmenu')
    } else if (getBrowserWidth() > breakpoint && mmenu !== null) {
      mmenu.bind('close:finish', function () {
        switchFromMobilToDesktop()
      });

      if(mmenu.getInstance().vars.opened) {
        mmenu.close();
      } else {
        switchFromMobilToDesktop()
      }
      mmenu = null
    }
  })
  window.dispatchEvent(new Event('resize'))
}

if (window) window.responsiveMmenu = responsiveMmenu
module.exports = responsiveMmenu
