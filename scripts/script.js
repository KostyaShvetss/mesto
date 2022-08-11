const popup = document.querySelector('.popup');
const openButton = document.querySelector('.edit-button');
const closeButton = document.querySelector('.close-button');
let popupForm = popup.querySelector('.popup__form');

const togglePopup = function () {
  popup.classList.toggle('popup_closed')
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);


const saveButton = document.querySelector('.save-button');

function formSubmitHandler(evt) {
  evt.preventDefault();

  const nameInput = popup.querySelector('.popup__name').value;
  const bioInput = popup.querySelector('.popup__bio').value;

  let profileName = document.querySelector('.profile__name');
  let profileBio = document.querySelector('.profile__bio');

  profileName.textContent = nameInput;
  profileBio.textContent = bioInput;
  togglePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
