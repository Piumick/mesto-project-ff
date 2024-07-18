import { avatar, avatarLink, name, description} from "../index"

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16',
  headers: {
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
    'Content-Type': 'application/json'
  }
}

export const profilePromise = fetch(
  "https://nomoreparties.co/v1/wff-cohort-16/users/me",
  {
    method: "GET",
    headers: {
      authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
    },
  }
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    avatar.style.backgroundImage = `url(${data.avatar})`;
    document.querySelector(".profile__title").textContent = data.name;
    document.querySelector(".profile__description").textContent = data.about;
    return data;
  })
  .catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
  });

export const cardPromise = fetch("https://nomoreparties.co/v1/wff-cohort-16/cards", {
  method: "GET",
  headers: {
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
  });

export const updateProfilePhoto = function(avatar, avatarLink){
  return fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me", {
    method: "PATCH",
    headers: {
      authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarLink.value,
    })
  })
    .then((res) => {
      if(res.ok)
        return res.json();
    })
    .then((data) => {
      avatar.style.backgroundImage = ("url("+avatarLink.value+")")
      return data;
    })
    .catch((err) => {
      console.log(err, "Ошибка. Запрос не выполнен");
    });
    

  }
export const updateProfile = function () {

return fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me", {
    method: "PATCH",
    headers: {
      authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value,
      about: description.value,
    }),
  }).then((res) => {
    if (res.ok)
      console.log("Профиль обнавлен!")
  })
  ;
}
export const postNewCard = function (cardList, cardName, url, addCard, deleteCard, likeCard, openCard){
return fetch("https://nomoreparties.co/v1/wff-cohort-16/cards", {
  method: "POST",
  headers: {
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: cardName.value,
    link: url.value,
  }),
})
  .then((res) => {
    if (res.ok)
      return res.json();
  })
  .then((data) => {
    console.log("Карточка создана!");
    cardList.prepend(
      addCard(
        data.link,
        data.name,
        data.likes.lenght,
        data.owner._id,
        data.owner._id,
        data._id,
        deleteCard,
        likeCard,
        openCard
      )
    );
  })
  .catch((err) => {
    console.log(err, "Ошибка. Запрос не выполнен");
  });
}
export const removeCard = function (cardId){
fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
    "Content-Type": "application/json",
  },
}).then((res) => {
  if (res.ok)
    console.log("Карточка успешно удалена")
})
.catch((err)=>
console.log(err))
}
export const removeLikeFromCard = function (cardId, likeCounter){
return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: {
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
    "Content-Type": "application/json",
  },
}).then((res) => {
  if(res.ok)
    return res.json();
})
.then((data) => {
  likeCounter.textContent = data.likes.length
  console.log("Вы отменили оценку поста(")
})
.catch((err)=>{
console.log(err)
})
};
export const addLikeToCard = function (cardId, likeCounter){
  return fetch(`https://nomoreparties.co/v1/wff-cohort-16/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28",
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if(res.ok)
      return res.json();
  })
  .then((data) => {
    likeCounter.textContent = data.likes.length
    console.log("Вы оценили пост!")
  })
  .catch((err)=>
  console.log(err)
  )}
