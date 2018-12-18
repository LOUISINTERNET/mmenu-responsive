const responsiveMmenu = (
  createMmenu,
  navSelector = '#nav',
  breakpoint = 1279
) => {

  const parent = document.querySelector(navSelector).parentNode
  let nav
  let mmenu

  /**
   * Return current browser width
   * @ return float
   */
  const getBrowserWidth = () =>
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

  /**
   * Return if the desktop nav could be init
   * @return boolean
   */
  const isDesktop = () => getBrowserWidth() > breakpoint && mmenu !== undefined

  /**
   * Add the desktop nav and trigger remove mmenu
   */
  const addDesktop = () => {
    if (!isMmenuOpen()) {
      removeMmenu()
      parent.appendChild(nav)
    }
  }

  /**
   * Return if the mmenu nav could be init
   * @return boolean
   */
  const isMmenu = () => getBrowserWidth() <= breakpoint && !mmenu

  /**
   * Return is mmenu is open
   * @return boolean
   */
  const isMmenuOpen = () => mmenu ? mmenu.getInstance().vars.opened : false

  /**
   * Remove mmenu and changes from mmenu
   */
  const removeMmenu = () => {
    mmenu = undefined

    document.querySelector(navSelector).remove()

    const wrapper = document.querySelector('.mm-wrapper__blocker')
    if(wrapper) wrapper.remove()

    const blocker = document.querySelector('#mm-blocker')
    if(blocker) blocker.remove()

    const page = document.querySelector('.mm-page')
    if(page) page.removeAttribute('style')

    const mmenuItemsWithId = document.querySelectorAll('[id*="mm-"]')
    mmenuItemsWithId.forEach(item => item.removeAttribute('id'))

    const mmenuItemsWithClass = document.querySelectorAll('[class*="mm-"]')
    Array.from(mmenuItemsWithClass).forEach(item => {
      item.classList.remove.apply(item.classList, Array.from(item.classList).filter(v=>v.startsWith('mm-')));
    })
  }

  /**
   * Add mmenu
   */
  const addMmenu = () => {
    createMmenu.call()
    mmenu = $(navSelector).data('mmenu')
    mmenu.bind('close', addDesktop)
    mmenu.bind('close:finish', addDesktop)
  }

  window.addEventListener('resize', () => {
    if (isMmenu()) {
      nav = document.querySelector(navSelector).cloneNode(true)
      addMmenu()
    } else if (isDesktop() && isMmenuOpen()) {
      mmenu.close()
    } else if (isDesktop()) {
      addDesktop()
    }
  })
  window.dispatchEvent(new Event('resize'))
}

if (window) window.responsiveMmenu = responsiveMmenu
module.exports = responsiveMmenu
