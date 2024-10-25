export function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keyup", closeByEscKeyUp);
}

export function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keyup", closeByEscKeyUp);
}
  
//закрытие по кнопке ESC
export function closeByEscKeyUp(e) {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
  }
}

//обработчики для закрытия по крестику и по клику вне модалки
export function addEventList(modal) {
  const closeButton = modal.querySelector(".popup__close");
  closeButton.addEventListener("click", function () {
    closeModal(modal);
  });
  modal.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("popup")) {
      closeModal(modal);
    }
  });
}


