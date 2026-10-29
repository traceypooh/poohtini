/* *************************************************************
  slide-responsively:
  Inspired by wordpress "sliding-door" theme.
  Rewritten entirely to be responsive!
  (using (mostly) CSS + some vanilla JS, not mootools)
  by @tracey_pooh 2015 and 2025
  https://github.com/traceypooh/slide-responsively
************************************************************* */


/**
 * Returns every element matching a css selector -- in the page *and* inside shadow DOM (eg: future-imperfect).
 * So a page's scripts can find their elements in any theme.
 *
 * @param {string} selector
 * @returns {Element[]}
 */
function query_all(selector, root = document) {
  const ret = [...root.querySelectorAll(selector)]
  for (const e of root.querySelectorAll('*')) {
    if (e.shadowRoot)
      ret.push(...query_all(selector, e.shadowRoot))
  }
  return ret
}


const main = () => {
  // If using blogtini.com, we have to find this through a shadow dom.
  // NOTE: wheh blogtin & shadowDOM is involved, 1st or 2nd run of this might be empty list OR
  // elements that still are "settling" and 1st round of `addEventListeners()` get reset as the
  // elements repaint/re-render.  So we'll run this a few times to ensure listeners get attached.
  const els = query_all('.slide-responsively li')

  els.forEach((li) => {
    // eslint-disable-next-line prefer-arrow-callback
    li.addEventListener('mouseenter', function slide_hover() {
      // user has hovered over a nav img.  (class) mark it "in" and the others "out"
      els.forEach((e) => e.classList.add('out'))
      li.classList.remove('out')
      li.classList.add('in')
    })
    // eslint-disable-next-line prefer-arrow-callback
    li.addEventListener('mouseleave', function slide_leave() {
      // user has stopped hovering.  remove all "out", then "in", class markers.
      els.forEach((e) => e.classList.remove('out'))
      li.classList.remove('in')
    })
  })
}


await new Promise((resolve) => (document.documentElement.hasAttribute('data-blogtini-rendered')
  ? resolve()
  : document.addEventListener('data-blogtini-rendered', resolve, { once: true })))
main()
