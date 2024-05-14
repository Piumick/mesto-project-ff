
const cardList = document.querySelector('.places__list');

function addCard(link, title, func) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button')
  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = title;
  
  deleteButton.addEventListener('click', function(){
    deleteCard(deleteButton)
  })
  
  return cardElement
}
const deleteCard = function(deleteButton){
  const deleteItem = deleteButton.closest('.card');
    deleteItem.remove();
}

for(let i in initialCards){
  cardList.append(
  addCard(initialCards[i].link, initialCards[i].name, deleteCard))
}

