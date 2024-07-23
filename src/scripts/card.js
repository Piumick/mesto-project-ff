
import { removeLikeFromCard, addLikeToCard } from "./api";

export function addCard(cardTemplate, popupTypeConfirm, link, title, likeCount, likeState, cardOwner, currentUser, cardId, deleteFunc, likeFunc, openFunc) {
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
    deleteFunc(cardElement, cardId, popupTypeConfirm);
  });

  likeButton.addEventListener("click", function () {
    likeFunc(likeButton, likeCounter, cardId);
  });

  cardImage.addEventListener("click", () => {
    openFunc(link, title);
  });
  if(likeState)
    likeButton.classList.add("card__like-button_is-active")

  return cardElement;
}


export const likeCard = function (likeElement, likeCounter, cardId) {
  if (likeElement.classList.contains("card__like-button_is-active")){
    likeElement.classList.remove("card__like-button_is-active");
    removeLikeFromCard(cardId, likeCounter)
    .then((data) => {
      likeCounter.textContent = data.likes.length
      console.log("Вы отменили оценку поста(")
    })
    .catch((err)=>{
    console.log(err)
    })
    }
  else{
    likeElement.classList.add("card__like-button_is-active")
    addLikeToCard(cardId, likeCounter)
    .then((data) => {
      likeCounter.textContent = data.likes.length
      console.log("Вы оценили пост!")
    })
    .catch((err)=>
    console.log(err)
    )}
  
}

