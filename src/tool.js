(function (psdw) {
  let dpr = window.devicePixelRatio;
  let htmlDOM = document.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function () {
    let htmlWidth = htmlDOM.clientWidth || document.body.clientWidth;
    let scale = htmlWidth / psdw;
    let rem = 10 * scale;
    htmlDOM.style.fontSize = rem + 'px';
    htmlDOM.setAttribute('data-dpr', dpr);
  }
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);


  let panel = document.getElementsByClassName('backgroundPanel');
  let clientHeight = document.documentElement.clientHeight
  function position () {
    for (let i of panel) {
      let panel_scroll = document.documentElement.scrollTop
      let panel_dom = i.offsetTop
      let panel_win = panel_dom - panel_scroll

      if (-i.offsetHeight < panel_win && panel_win < clientHeight) {
        i.style.backgroundPositionY = (30 / clientHeight) * panel_win + 'px';
      }
    }
  }
  position()
  window.addEventListener('scroll', position, false);



})(375)