export default class UserInfo {
  constructor({nameSelector, bioSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._bio = document.querySelector(bioSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo () {
    const userInfo = {
      name: this._name.textContent,
      bio: this._bio.textContent,
      avatar: this._avatar.src,
    };
    return userInfo;
  }

  setUserInfo ({name, bio, avatar}) {
    this._name.textContent = name;
    this._bio.textContent = bio;
    this._avatar.src = avatar;
  }
}
