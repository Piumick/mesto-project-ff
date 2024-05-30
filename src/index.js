import { initialCards } from "./scripts/cards";
import { addCard, deleteCard, likeCard,  } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/popup";
import "./pages/index.css";

const cardList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];

const name = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");

const openCard = function (link, title) {
  openPopup(popupTypeImage);

  const popupImage = popupTypeImage.querySelector(".popup__image");

  popupImage.src = link;
  popupImage.alt = title;
  
  popupTypeImage.querySelector(".popup__caption").textContent = title;
};

for (let card in initialCards) {
  cardList.append(
    addCard(
      initialCards[card].link,
      initialCards[card].name,
      deleteCard,
      likeCard,
      openCard
    )
  );
}



document.querySelectorAll(".popup__close").forEach((element) => {
  element.addEventListener("click", () => {
    closePopup(element.closest(".popup"));
  })
});

profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit);
  name.value = document.querySelector(".profile__title").textContent
  description.value = document.querySelector(".profile__description").textContent

});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent = description.value;
  closePopup(popupTypeEdit);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = document.querySelector(".popup__input_type_card-name");
  const url = document.querySelector(".popup__input_type_url");
  cardList.prepend(
    addCard(url.value, cardName.value, deleteCard, likeCard, openCard)
  );
  addCardForm.reset()
  closePopup(popupTypeNewCard);
});
