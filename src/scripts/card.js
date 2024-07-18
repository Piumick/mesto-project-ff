import { cardTemplate, popupTypeImage, popupTypeConfirm} from "../index.js";

import { closePopup, openPopup } from "./popup";
import { removeCard, removeLikeFromCard, addLikeToCard } from "./api";

export function addCard(link, title, likeCount, cardOwner, currentUser, cardId, deleteFunc, likeFunc, openFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeCounter = cardElement.querySelector(".card__like-count");
  
  if (cardOwner !== currentUser){
    deleteButton.classList.add('card__delete-button-inactive');
    deleteButton.disabled = true
  }
  likeCounter.textContent = likeCount
  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  deleteButton.addEventListener("click", function () {
    deleteFunc(cardElement, cardId);
  });

  likeButton.addEventListener("click", function () {
    likeFunc(likeButton, likeCounter, cardId);
  });

  cardImage.addEventListener("click", () => {
    openFunc(link, title);
  });

  return cardElement;
}
export const deleteCard = function (deleteElement, cardId) {
  openPopup(popupTypeConfirm)
  const confirmButton = popupTypeConfirm.querySelector('.popup__button')
  confirmButton.addEventListener('click', ()=>{
    deleteElement.remove();
    closePopup(popupTypeConfirm)
    removeCard(cardId)

  })
  
  
};


export const likeCard = function (likeElement, likeCounter, cardId) {
  if (likeElement.classList.contains("card__like-button_is-active")){
    likeElement.classList.remove("card__like-button_is-active");
    removeLikeFromCard(cardId, likeCounter)
    }
  else{
    likeElement.classList.add("card__like-button_is-active")
    addLikeToCard(cardId, likeCounter)
  }
}

