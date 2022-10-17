export default class UserInfo {
  constructor({nameSelector, bioSelector}) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
  }

  getUserInfo () {
    const userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent
    };
    return userInfo;
  }

  setUserInfo ({name, bio}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}
