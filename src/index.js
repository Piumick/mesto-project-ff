import { initialCards } from "./scripts/cards";
import { addCard, deleteCard, likeCard } from "./scripts/card";
import { openPopup, closePopup } from "./scripts/popup";
import {
  hasInvalidInput,
  toggleButtonState,
  hideInputError,
  showInputError,
  isValid,
  setEventListeners,
  enableValidation,
  clearValidation,
} from "./scripts/validate";
import { profilePromise, cardPromise, updateProfilePhoto, updateProfile, postNewCard } from "./scripts/api"
import "./pages/index.css";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

export const avatar = document.querySelector(".profile__image");
const cardList = document.querySelector(".places__list");
export const cardTemplate = document.querySelector("#card-template").content;

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEditPhoto = document.querySelector(".popup_type_edit-photo")
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupTypeConfirm = document.querySelector(".popup_type_confirm");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const editProfilePhotoForm = document.forms["edit-photo"]

export const name = document.querySelector(".popup__input_type_name");
export const description = document.querySelector(".popup__input_type_description");
export const avatarLink = document.querySelector(".popup__input_type_photo")

const cardName = document.querySelector(".popup__input_type_card-name");
const url = document.querySelector(".popup__input_type_url");

const openCard = function (link, title) {
  openPopup(popupTypeImage);

  const popupImage = popupTypeImage.querySelector(".popup__image");

  popupImage.src = link;
  popupImage.alt = title;

  popupTypeImage.querySelector(".popup__caption").textContent = title;
};
Promise.all([profilePromise, cardPromise])
  .then((res) => {
    for (let card in res[1]) {
      cardList.append(
        addCard(
          res[1][card].link,
          res[1][card].name,
          res[1][card].likes.length,
          res[1][card].owner._id,
          res[0]._id,
          res[1][card]._id,
          deleteCard,
          likeCard,
          openCard
        )
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });

document.querySelectorAll(".popup__close").forEach((element) => {
  element.addEventListener("click", () => {
    closePopup(element.closest(".popup"));
  });
});

profileEditButton.addEventListener("click", () => {
  editProfileForm.querySelector(".popup__button").innerText = "Сохранить"

  openPopup(popupTypeEdit);
  name.value = document.querySelector(".profile__title").textContent;
  description.value = document.querySelector(".profile__description").textContent;

  clearValidation(
    popupTypeEdit.querySelector(".popup__form"),
    validationConfig
  );
});

avatar.addEventListener("click", () =>{
   editProfileForm.querySelector(".popup__button").innerText = "Сохранить"

  openPopup(popupTypeEditPhoto);
})

editProfilePhotoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  editProfilePhotoForm.querySelector(".popup__button").innerText = "Сохранeние..."
  
  updateProfilePhoto(avatar, avatarLink)

  closePopup(popupTypeEditPhoto)
})
  
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
  clearValidation(addCardForm, validationConfig);
  addCardForm.querySelector(".popup__button").innerText = "Сохранить"
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  editProfileForm.querySelector(".popup__button").innerText = "Сохранение..."

  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent = description.value;

  updateProfile()

  closePopup(popupTypeEdit);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  addCardForm.querySelector(".popup__button").innerText = "Сохранение..."
  
  postNewCard(cardList, cardName, url, addCard, deleteCard, likeCard, openCard)

  addCardForm.reset();
  closePopup(popupTypeNewCard);
});

enableValidation(validationConfig);
