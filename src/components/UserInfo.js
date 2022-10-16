export default class UserInfo {
  constructor({nameSelector, bioSelector}) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
  }

  getUserInfo () {
    const userInfo = {};
    this._name.textContent = userInfo.name;
    this._bio.textContent = userInfo.bio;
    return userInfo;
  }

  setUserInfo ({name, bio}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
  }
}
