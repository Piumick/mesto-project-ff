export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

export function openPopup(popup, closeFunc) {
  popup.classList.add("popup_is-opened");

  function closeByEsc(evt) {
    if (evt.key === "Escape") {
      closeFunc(popup);
      document.removeEventListener("keydown", closeByEsc);
    }
  }
  popup.addEventListener("click", (evt) => {
    if (evt.currentTarget === evt.target) closeFunc(popup);
  });
  document.addEventListener("keydown", closeByEsc);
  document.querySelectorAll(".popup__close").forEach((element) => {
    element.addEventListener("click", () => {
      closeFunc(popup);
    });
  });
}