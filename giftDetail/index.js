setTimeout(() => {
  document.querySelector("html").classList.add("loadingIn");
  setTimeout(() => {
    document.querySelector("body").classList.add("overflow-auto");
    document.querySelector("body").classList.remove("overflow-hidden");
    document.querySelectorAll("#decoration img")[0].classList.add("opacityIn");
    document.querySelectorAll("#decoration img")[1].classList.add("opacityIn");
    setTimeout(() => {
      //attivo animazione illustrazioni laterali
      document
        .querySelectorAll("#decoration img")[0]
        .classList.add("animationBackground");
      document
        .querySelectorAll("#decoration img")[1]
        .classList.add("animationBackground");
    }, 500);
  }, 1000);
}, 1);
