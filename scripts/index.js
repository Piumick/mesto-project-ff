const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

function addCard(link, title, deleteFunc) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = title;
  cardTitle.textContent = title;

  deleteButton.addEventListener("click", function () {
    deleteFunc(cardElement);
  });

  return cardElement;
}
const deleteCard = function (deleteElement) {
  deleteElement.remove();
};

for (let i in initialCards) {
  cardList.append(
    addCard(initialCards[i].link, initialCards[i].name, deleteCard)
  );
}
