import { cardTemplate, popupTypeImage } from "../index.js";
import { openPopup, closePopup } from "./popup";
export function addCard(link, title, deleteFunc, likeFunc, openFunc) {
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
export const deleteCard = function (deleteElement) {
  deleteElement.remove();
};

export const likeCard = function (likeElement) {
  likeElement.classList.add("card__like-button_is-active");
};

export const openCard = function (image) {
  openPopup(popupTypeImage, closePopup);

  const popupImage = popupTypeImage.querySelector(".popup__image");

  popupImage.src = image.src;
  popupImage.alt = image.alt;
  
  popupTypeImage.querySelector(".popup__caption").textContent = image.alt;
};