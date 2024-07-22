
import { addCard, likeCard } from "./scripts/card";
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
import { profilePromise, cardPromise, updateProfilePhoto, updateProfile, postNewCard, removeCard } from "./scripts/api"
import "./pages/index.css";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const avatar = document.querySelector(".profile__image");
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeEditPhoto = document.querySelector(".popup_type_edit-photo")
const popupTypeImage = document.querySelector(".popup_type_image");
const popupTypeConfirm = document.querySelector(".popup_type_confirm");

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const editProfilePhotoForm = document.forms["edit-photo"]

const confirmButtonTypeNewPhoto = editProfilePhotoForm.querySelector(".popup__button");

const name = document.querySelector(".popup__input_type_name");
const description = document.querySelector(".popup__input_type_description");
const avatarLink = document.querySelector(".popup__input_type_photo")

const cardName = document.querySelector(".popup__input_type_card-name");
const url = document.querySelector(".popup__input_type_url");

const openCard = function (link, title) {
  openPopup(popupTypeImage);

  const popupImage = popupTypeImage.querySelector(".popup__image");

  popupImage.src = link;
  popupImage.alt = title;

  popupTypeImage.querySelector(".popup__caption").textContent = title;
};

const deleteCard = function (deleteElement, cardId ) {
  openPopup(popupTypeConfirm)
  const confirmButton = popupTypeConfirm.querySelector('.popup__button')
  confirmButton.addEventListener('click', ()=>{
    

    removeCard(cardId)
    .then((data)=>{
      console.log("Карточка удалена")
      deleteElement.remove();
      closePopup(popupTypeConfirm)
      }).catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
  });
      
  })
};

Promise.all([profilePromise, cardPromise])
  .then((res) => {
    let likerId = []

    console.log(res)
    avatar.style.backgroundImage = `url(${res[0].avatar})`;
    document.querySelector(".profile__title").textContent = res[0].name;
    document.querySelector(".profile__description").textContent = res[0].about;
    for (let card in res[1]) {
      
      res[1][card].likes.forEach((el)=>{likerId.push(el._id === res[0]._id)})

      cardList.append(
        addCard(
          cardTemplate,
          popupTypeConfirm,
          res[1][card].link,
          res[1][card].name,
          res[1][card].likes.length, 
          likerId.includes(true),
          res[1][card].owner._id,
          res[0]._id,
          res[1][card]._id,
          deleteCard,
          likeCard,
          openCard
        )
      );
      likerId= []
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
  

  openPopup(popupTypeEdit);
  name.value = document.querySelector(".profile__title").textContent;
  description.value = document.querySelector(".profile__description").textContent;

  clearValidation(
    popupTypeEdit.querySelector(".popup__form"),
    validationConfig
  );
});

avatar.addEventListener("click", () =>{
   
  clearValidation(
    popupTypeEditPhoto.querySelector(".popup__form"),
    validationConfig
  );
  openPopup(popupTypeEditPhoto);
})

editProfilePhotoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  confirmButtonTypeNewPhoto.innerText = "Сохранение..."
  updateProfilePhoto(avatarLink).then((data) => {
    closePopup(popupTypeEditPhoto);
    avatar.style.backgroundImage = ("url("+avatarLink.value+")")
    confirmButtonTypeNewPhoto.innerText = "Сохранить"
    return data;
  })
  .catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
    confirmButtonTypeNewPhoto.innerText = "Сохранить"
  });
  
  
})
  
profileAddButton.addEventListener("click", () => {
  openPopup(popupTypeNewCard);
  clearValidation(addCardForm, validationConfig);

});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  
  editProfileForm.querySelector(".popup__button").innerText = "Сохранение..."

  document.querySelector(".profile__title").textContent = name.value;
  document.querySelector(".profile__description").textContent = description.value;

  updateProfile(name, description).then(()=>{
    editProfileForm.querySelector(".popup__button").innerText = "Сохранить"
    closePopup(popupTypeEdit);
  }).catch((err)=>{
    editProfileForm.querySelector(".popup__button").innerText = "Сохранить"
    console.log(err)
  })


});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  addCardForm.querySelector(".popup__button").innerText = "Сохранение..."
  
  postNewCard(cardList, cardName, url, addCard, deleteCard, likeCard, openCard) 
  .then((data) => {
    addCardForm.reset();
    closePopup(popupTypeNewCard);
    console.log("Карточка создана!");
    cardList.prepend(
      addCard(
        cardTemplate,
        popupTypeConfirm,
        data.link,
        data.name,
        data.likes.lenght,
        false,
        data.owner._id,
        data.owner._id,
        data._id,
        deleteCard,
        likeCard,
        openCard
      )
    );
  addCardForm.querySelector(".popup__button").innerText = "Сохранить"
  })
  .catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
      addCardForm.querySelector(".popup__button").innerText = "Сохранить"
  });


});

enableValidation(validationConfig);
