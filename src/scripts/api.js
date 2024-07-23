
const config = { 
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-16', 
  headers: { 
    authorization: "7a06ff2d-88c6-4d81-8f24-02c721a03b28", 
    'Content-Type': 'application/json' 
  } 
} 
const checkRes = function (res){
  if(res.ok){

  return res.json()
  
}

return Promise.reject(`Ошибка: ${res.status}`)}

export const getUserInfo = fetch(
  config.baseUrl+"/users/me",
  {
    method: "GET",
    headers: config.headers,
  }
).then((res) => {return checkRes(res)})


export const getInitialCards = fetch(config.baseUrl + "/cards", {
  method: "GET",
  headers: config.headers
})
  .then((res) => {return checkRes(res)})
  

export const updateProfilePhoto = function(avatarLink){
  return fetch(config.baseUrl + "/users/me/avatar", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink.value,
    })
  })
    .then((res) => {
      {return checkRes(res)}})
  };

export const updateProfile = function (name, description) {
  return fetch(config.baseUrl + "/users/me", {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name.value,
      about: description.value,
    }),
  }).then((res) => {return checkRes(res)    
  })
};

export const postNewCard = function (cardList, cardName, url, addCard, deleteCard, likeCard, openCard){
return fetch(config.baseUrl + "/cards", {
  method: "POST",
  headers: config.headers,
  body: JSON.stringify({
    name: cardName.value,
    link: url.value,
  }),
})
  .then((res) => {return checkRes(res)})
};

export const removeCard = function (cardId){
return fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then((res) => {return checkRes(res)})
};

export const removeLikeFromCard = function (cardId, likeCounter){
return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
}).then((res) => {return checkRes(res)})
};

export const addLikeToCard = function (cardId, likeCounter){
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {return checkRes(res)})
}
