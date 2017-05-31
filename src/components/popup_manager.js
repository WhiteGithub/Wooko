class PopupManager {

  registerPopupContainer(popup_container) {
    this.popup_container = popup_container;
  }

  open(type, slot, params) {
    this.popup_container && this.popup_container.open(type, slot, params);
  }

}

export default new PopupManager();
