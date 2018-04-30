import bg1 from "./assets/images/01.jpg";
import bg2 from "./assets/images/02.jpg";
import bg3 from "./assets/images/03.jpg";
import bg4 from "./assets/images/07.jpg";
import bg5 from "./assets/images/05.jpg";
import avatar from "./assets/images/avatar.PNG";
import art1 from "./assets/images/art01.jpg";
import art2 from "./assets/images/art02.jpg";
import art3 from "./assets/images/art03.jpg";
import art4 from "./assets/images/art04.jpg";
import art5 from "./assets/images/art05.jpg";
import art6 from "./assets/images/art06.jpg";

(function(psdw) {
  /**
   * 设置html标签font-size属性
   */
  let dpr = window.devicePixelRatio;
  let htmlDOM = document.documentElement;
  let resizeEvt =
    "orientationchange" in window ? "orientationchange" : "resize";
  let recalc = function() {
    let htmlWidth = htmlDOM.clientWidth || document.body.clientWidth;
    let scale = htmlWidth / psdw;
    let rem = 10 * scale;
    htmlDOM.style.fontSize = rem + "px";
    htmlDOM.setAttribute("data-dpr", dpr);
  };
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener("DOMContentLoaded", recalc, false);
})(375);

export { bg1, bg2, bg3, bg4, bg5, avatar, art1, art2, art3, art4, art5, art6 };
