(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){"Escape"===e.key&&n(document.querySelector(".popup_is-opened"))}function o(e){e.currentTarget===e.target&&n(document.querySelector(".popup_is-opened"))}function n(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",t),e.removeEventListener("click",o)}function r(e){e.classList.add("popup_is-opened"),e.addEventListener("click",o),document.addEventListener("keydown",t)}e.d({},{my:()=>f,Tp:()=>m,h_:()=>T,UU:()=>L,vm:()=>q});var c=fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me",{method:"GET",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28"}}).then((function(e){return e.json()})).then((function(e){return f.style.backgroundImage="url(".concat(e.avatar,")"),document.querySelector(".profile__title").textContent=e.name,document.querySelector(".profile__description").textContent=e.about,e})).catch((function(e){console.log(e,"Ошибка. Запрос не выполнен")})),i=fetch("https://nomoreparties.co/v1/wff-cohort-16/cards",{method:"GET",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28"}}).then((function(e){return e.json()})).then((function(e){return e})).catch((function(e){console.log(e,"Ошибка. Запрос не выполнен")}));function u(e,t,o,n,r,c,i,u,a){var l=m.querySelector(".card").cloneNode(!0),s=l.querySelector(".card__delete-button"),p=l.querySelector(".card__like-button"),d=l.querySelector(".card__image"),f=l.querySelector(".card__title"),_=l.querySelector(".card__like-count");return n!==r&&(s.classList.add("card__delete-button-inactive"),s.disabled=!0),_.textContent=o,d.src=e,d.alt=t,f.textContent=t,s.addEventListener("click",(function(){i(l,c)})),p.addEventListener("click",(function(){u(p,_,c)})),d.addEventListener("click",(function(){a(e,t)})),l}var a=function(e,t){r(q),q.querySelector(".popup__button").addEventListener("click",(function(){e.remove(),n(q),function(e){fetch("https://nomoreparties.co/v1/wff-cohort-16/cards/".concat(e),{method:"DELETE",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"}}).then((function(e){e.ok&&console.log("Карточка успешно удалена")})).catch((function(e){return console.log(e)}))}(t)}))},l=function(e,t,o){e.classList.contains("card__like-button_is-active")?(e.classList.remove("card__like-button_is-active"),function(e,t){fetch("https://nomoreparties.co/v1/wff-cohort-16/cards/likes/".concat(e),{method:"DELETE",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"}}).then((function(e){if(e.ok)return e.json()})).then((function(e){t.textContent=e.likes.length,console.log("Вы отменили оценку поста(")})).catch((function(e){console.log(e)}))}(o,t)):(e.classList.add("card__like-button_is-active"),function(e,t){fetch("https://nomoreparties.co/v1/wff-cohort-16/cards/likes/".concat(e),{method:"PUT",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"}}).then((function(e){if(e.ok)return e.json()})).then((function(e){t.textContent=e.likes.length,console.log("Вы оценили пост!")})).catch((function(e){return console.log(e)}))}(o,t))};function s(e,t,o){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(o.inputErrorClass),n.classList.remove(o.errorClass),n.textContent=""}function p(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(".popup__button");o.forEach((function(o){s(e,o,t),n.disabled=!0,n.classList.add(t.inactiveButtonClass)}))}var d={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},f=document.querySelector(".profile__image"),_=document.querySelector(".places__list"),m=document.querySelector("#card-template").content,y=document.querySelector(".popup_type_edit"),h=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_edit-photo"),S=document.querySelector(".popup_type_image"),q=document.querySelector(".popup_type_confirm"),b=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__edit-button"),g=document.forms["edit-profile"],C=document.forms["new-place"],E=document.forms["edit-photo"],L=document.querySelector(".popup__input_type_name"),T=document.querySelector(".popup__input_type_description"),x=document.querySelector(".popup__input_type_photo"),w=document.querySelector(".popup__input_type_card-name"),j=document.querySelector(".popup__input_type_url"),A=function(e,t){r(S);var o=S.querySelector(".popup__image");o.src=e,o.alt=t,S.querySelector(".popup__caption").textContent=t};Promise.all([c,i]).then((function(e){for(var t in e[1])_.append(u(e[1][t].link,e[1][t].name,e[1][t].likes.length,e[1][t].owner._id,e[0]._id,e[1][t]._id,a,l,A))})).catch((function(e){console.log(e)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){n(e.closest(".popup"))}))})),k.addEventListener("click",(function(){g.querySelector(".popup__button").innerText="Сохранить",r(y),L.value=document.querySelector(".profile__title").textContent,T.value=document.querySelector(".profile__description").textContent,p(y.querySelector(".popup__form"),d)})),f.addEventListener("click",(function(){g.querySelector(".popup__button").innerText="Сохранить",r(v)})),E.addEventListener("submit",(function(e){e.preventDefault(),E.querySelector(".popup__button").innerText="Сохранeние...",function(e,t){fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me",{method:"PATCH",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"},body:JSON.stringify({avatar:t.value})}).then((function(e){if(e.ok)return e.json()})).then((function(o){return e.style.backgroundImage="url("+t.value+")",o})).catch((function(e){console.log(e,"Ошибка. Запрос не выполнен")}))}(f,x),n(v)})),b.addEventListener("click",(function(){r(h),p(C,d),C.querySelector(".popup__button").innerText="Сохранить"})),g.addEventListener("submit",(function(e){e.preventDefault(),g.querySelector(".popup__button").innerText="Сохранение...",document.querySelector(".profile__title").textContent=L.value,document.querySelector(".profile__description").textContent=T.value,fetch("https://nomoreparties.co/v1/wff-cohort-16/users/me",{method:"PATCH",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"},body:JSON.stringify({name:L.value,about:T.value})}).then((function(e){e.ok&&console.log("Профиль обнавлен!")})),n(y)})),C.addEventListener("submit",(function(e){e.preventDefault(),C.querySelector(".popup__button").innerText="Сохранение...",function(e,t,o,n,r,c,i){fetch("https://nomoreparties.co/v1/wff-cohort-16/cards",{method:"POST",headers:{authorization:"7a06ff2d-88c6-4d81-8f24-02c721a03b28","Content-Type":"application/json"},body:JSON.stringify({name:t.value,link:o.value})}).then((function(e){if(e.ok)return e.json()})).then((function(t){console.log("Карточка создана!"),e.prepend(n(t.link,t.name,t.likes.lenght,t.owner._id,t.owner._id,t._id,r,c,i))})).catch((function(e){console.log(e,"Ошибка. Запрос не выполнен")}))}(_,w,j,u,a,l,A),C.reset(),n(h)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var o=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);o.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,o):function(e,t,o,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.textContent=o,r.classList.add(n.errorClass)}(e,t,t.validationMessage,o)}(e,r,t),function(e,t,o){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(o.inactiveButtonClass)):(t.disabled=!0,t.classList.add(o.inactiveButtonClass))}(o,n,t)}))}))}(t,e)}))}(d)})();