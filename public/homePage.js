'use strict';

const logout = new LogoutButton();

logout.action = ApiConnector.logout((response) => {
  if(response.success) {
    location.reload();
  }
});

current((response, data) => {
  if(response.success) {
    ProfileWidget.showProfile(data);
  }
})