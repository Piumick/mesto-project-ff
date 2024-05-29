import { initialCards } from "./scripts/cards";
import "./pages/index.css";

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileForm = document.forms[0];
const addCardForm = document.forms[1];

function addCard(link, title, deleteFunc, likeFunc, openFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  deleteButton.addEventListener("click", function () {
    deleteFunc(cardElement);
  });

  likeButton.addEventListener("click", function () {
    likeFunc(likeButton);
  });

  cardImage.addEventListener("click", () => {
    openFunc(cardImage);
  });
  
  return cardElement;
}
const deleteCard = function (deleteElement) {
  deleteElement.remove();
};

const likeCard = function (likeElement) {
  likeElement.classList.add("card__like-button_is-active");
};

const openCard = function (image) {
  openPopup(popupTypeImage, closePopup);
  const popupImage = popupTypeImage.querySelector(".popup__image");
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupTypeImage.querySelector(".popup__caption").textContent = image.alt;
};

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

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function openPopup(popup, closeFunc) {
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
