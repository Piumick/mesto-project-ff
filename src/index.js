import { initialCards } from "./scripts/cards";
import { addCard, deleteCard, likeCard, openCard,  } from "./scripts/card";
import { closePopup, openPopup } from "./scripts/popup";
import "./pages/index.css";

const cardList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
export const popupTypeImage = document.querySelector(".popup_type_image");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileForm = document.forms[0];
const addCardForm = document.forms[1];


for (let i in initialCards) {
  cardList.append(
    addCard(
      initialCards[i].link,
      initialCards[i].name,
      deleteCard,
      likeCard,
      openCard
    )
  );
}


profileEditButton.addEventListener("click", () => {
  openPopup(popupTypeEdit, closePopup);
});

profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard, closePopup);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = document.querySelector(".popup__input_type_name");
  const description = document.querySelector(".popup__input_type_description");
  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent =
    description.value;
  name.value = "";
  description.value = "";
  closePopup(popupTypeEdit);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = document.querySelector(".popup__input_type_card-name");
  const url = document.querySelector(".popup__input_type_url");
  cardList.append(
    addCard(url.value, cardName.value, deleteCard, likeCard, openCard)
  );
  url.value = "";
  cardName.value = "";
  closePopup(popupTypeNewCard);
});
