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

  let parameter = window.location.search;
  function QueryString(item) {
    var foundString = parameter.match(
      new RegExp("[?&]" + item + "=([^&]*)(&?)", "i")
    );
    return decodeURIComponent(foundString ? foundString[1] : foundString);
  }
  let dati = {
    player: QueryString("name"),
    receiver: QueryString("receiver"),
    category: QueryString("category"),
    budget: QueryString("budget"),
  };
  Object.keys(dati).forEach((kk) => {
    try {
      document.getElementById(kk).innerHTML = dati[kk];
    } catch (error) {
      console.error(error);
    }
  });
}, 1);
