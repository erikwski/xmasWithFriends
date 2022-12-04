document.addEventListener("DOMContentLoaded", function () {
  const NAME_CREATOR = document.getElementById("nameCreator"),
    MAIL_CREATOR = document.getElementById("mailCreator"),
    CONTAINER_PARTECIPANTI = document.getElementById("containerPartecipanti"),
    EVENT_FOR_INPUT = ["keyup", "change"];
  window.scroll(0, 0);

  function bindEvent(
    inputName,
    inputMail,
    deleteElement = null,
    checkOrganizer = false
  ) {
    EVENT_FOR_INPUT.forEach((ev) => {
      inputName.addEventListener(ev, function () {
        checkName(this, checkOrganizer);
      });
      inputMail.addEventListener(ev, function () {
        checkMail(this, checkOrganizer);
      });
    });
    if (deleteElement) {
      deleteElement.addEventListener("click", () =>
        deleteElement.parentNode.parentNode.removeChild(
          deleteElement.parentNode
        )
      );
    }
  }

  function checkName(el, checkOrganizer) {
    el.value.length >= 3
      ? correctField(el.closest(".checkName"))
      : notCorrectField(el.closest(".checkName"));
    checkOrganizer && enablePartecipants();
  }
  function checkMail(el, checkOrganizer) {
    validateEmail(el.value)
      ? correctField(el.closest(".checkMail"))
      : notCorrectField(el.closest(".checkMail"));
    checkOrganizer && enablePartecipants();
  }

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return true;
    return false;
  }

  function enablePartecipants() {
    if (
      NAME_CREATOR.classList.contains("correct") &&
      MAIL_CREATOR.classList.contains("correct")
    ) {
      CONTAINER_PARTECIPANTI.style.display = "flex";
    } else {
      CONTAINER_PARTECIPANTI.style.display = "none";
    }
  }

  function correctField(el) {
    el.querySelector("input").classList.remove("border-red-500");
    el.querySelector("p").classList.add("hidden");
    el.querySelector("input").classList.add("correct");
    let inputContainer = el.closest(".userContainer"),
      twoInput = inputContainer.querySelectorAll("input");
    if (
      twoInput[0].classList.contains("correct") &&
      twoInput[1].classList.contains("correct")
    ) {
      inputContainer.classList.add("correctUser");
      if (
        !inputContainer.classList.contains("triggerAddPartecipant") &&
        inputContainer.getAttribute("id") !== "contOrganizer"
      ) {
        inputContainer.classList.add("triggerAddPartecipant");
        document.querySelector("#buttonAddContainer button").click();
      }
    } else {
      inputContainer.classList.remove("correctUser");
    }
    checkConfirmForm();
  }
  function notCorrectField(el) {
    el.querySelector("input").classList.add("border-red-500");
    el.querySelector("p").classList.remove("hidden");
    el.querySelector("input").classList.remove("correct");
    let inputContainer = el.closest(".userContainer"),
      twoInput = inputContainer.querySelectorAll("input");
    if (
      twoInput[0].classList.contains("correct") &&
      twoInput[1].classList.contains("correct")
    ) {
      inputContainer.classList.add("correctUser");
      document.querySelector("#buttonAddContainer button").click();
    } else {
      inputContainer.classList.remove("correctUser");
    }
    checkConfirmForm();
  }
  function checkConfirmForm() {
    if (
      document.querySelectorAll(".userContainer.correctUser").length &&
      document.querySelector("#contOrganizer.correctUser")
    ) {
      if (document.querySelectorAll(".correctUser").length >= 2) {
        document
          .getElementById("buttonConfirmContainer")
          .classList.add("formReady");
        document.querySelector(
          "#buttonConfirmContainer button span"
        ).innerHTML = "CREATE YOUR PARTY";
      } else {
        document
          .getElementById("buttonConfirmContainer")
          .classList.remove("formReady");
        document
          .getElementById("buttonConfirmContainer")
          .classList.add("fadeIn");
        document.querySelector(
          "#buttonConfirmContainer button span"
        ).innerHTML = "INSERT AT LEAST ONE PARTECIPANT";
      }
    } else {
      document
        .getElementById("buttonConfirmContainer")
        .classList.remove("fadeIn", "formReady");
    }
  }
  document
    .querySelector("#buttonConfirmContainer button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let partecipanti = document.querySelectorAll(".correctUser");
      let categories = [
        "REGALI PER UN NEONATO",
        "OGGETTI DI LEGNO",
        "OGGETTO PER UCCIDERE QUALCUNO SEGRETAMENTE",
        "QUALCOSA CHE MIGLIORI LA GIORNATA",
        "REGALO PER IL PARTNER",
        "REGALO INDESIDERATO",
        "FATTO A MANO",
        "DA USARE IN COMPAGNIA",
        "UN REGALO UTILE",
        "ECOSOSTENIBILITÁ",
        "APPARENTEMENTE COSTOSO MA ECONOMICO",
        "LUDOPATIA",
        "OGGETTO CUTIE",
      ];
      if (document.querySelectorAll(".correctUser").length >= 2) {
        //valido
        let players = [];
        partecipanti.forEach((pp) => {
          players.push({
            name: pp.querySelector("[name='name']").value,
            email: pp.querySelector("[name='email']").value,
          });
        });
        $.post("https://amazonscrape-izsdosftgq-ey.a.run.app/SecretSanta/", {
          players: players,
        })
          .done((res) => {
            if (res.status) {
              alert("GRUPPO CREATO CORRETTAMENTE");
            } else {
              alert("ERRORE NELLA CREAZIONE");
            }
          })
          .catch(() => {
            alert("Contatta la fottuta amministrazione");
          });
      } else {
        alert("COMPILA CORRETTAMENTE I CAMPI");
      }
    });
  document
    .querySelector("#buttonAddContainer button")
    .addEventListener("click", (e) => {
      e.preventDefault();
      let referenceNode =
          document.querySelectorAll(".userContainer")[
            document.querySelectorAll(".userContainer").length - 1
          ],
        newEl = document.createElement("div");
      newEl.classList = "flex flex-wrap mb-6 userContainer";
      newEl.innerHTML = `
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 checkName">
                <label
                    class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    for="grid-first-name"
                >
                    Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded border-red-500 py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Your name"
                    name="name"
                />
                <p class="text-red-500 text-sm italic">Minimum 3 characters</p>
                </div>
                <div class="w-full md:w-1/2 px-3 checkMail">
                <label
                    class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                    for="grid-last-name"
                >
                    Mail
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border mb-1 border-red-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="email"
                    placeholder="sample@gmail.com"
                    name="email"
                />
                <p class="text-red-500 text-sm italic">Insert a correct mail</p>
              </div>
              <a href="#!" class="bg-white-100 rounded-l deleteElement">
                <img src="../img/deleteImg.png" alt="delete image">
              </a>
       `;
      bindEvent(
        newEl.querySelector(".checkName input"),
        newEl.querySelector(".checkMail input"),
        newEl.querySelector(".deleteElement")
      );
      referenceNode.parentNode.insertBefore(newEl, referenceNode.nextSibling);
    });
  bindEvent(NAME_CREATOR, MAIL_CREATOR, null, true);
  bindEvent(
    document.getElementById("nameFirstPartecipant"),
    document.getElementById("mailFirstPartecipant")
  );
  setTimeout(() => {
    document.querySelector("html").classList.add("loadingIn");
    setTimeout(() => {
      document.querySelector("body").classList.add("overflow-auto");
      document.querySelector("body").classList.remove("overflow-hidden");
      document
        .querySelectorAll("#decoration img")[0]
        .classList.add("opacityIn");
      document
        .querySelectorAll("#decoration img")[1]
        .classList.add("opacityIn");
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

  //debug
  /*
  NAME_CREATOR.value = "test";
  MAIL_CREATOR.value = "test@test.com";
  var ev = new KeyboardEvent("keyup", {
    altKey: false,
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    charCode: 0,
    code: "Enter",
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: true,
    detail: 0,
    eventPhase: 0,
    isComposing: false,
    isTrusted: true,
    key: "Enter",
    keyCode: 13,
    location: 0,
    metaKey: false,
    repeat: false,
    returnValue: false,
    shiftKey: false,
    type: "keydown",
    which: 13,
  });

  NAME_CREATOR.dispatchEvent(ev);
  MAIL_CREATOR.dispatchEvent(ev);
  */
});
