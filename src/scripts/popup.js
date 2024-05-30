
function closeByEsc(evt) {
  if (evt.key === "Escape") 
    closePopup(document.querySelector(".popup_is-opened")); 
}
function closeByOverlay(evt){
  if (evt.currentTarget === evt.target)
     closePopup(document.querySelector(".popup_is-opened"));
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEsc);
  popup.removeEventListener("click", closeByOverlay);
}

export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  popup.addEventListener("click", closeByOverlay);
  document.addEventListener("keydown", closeByEsc);
}