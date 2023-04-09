'use strict';

const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((response) => {
  if(response.success) {
    location.reload();
  }
});

ApiConnector.current((response) => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  }
})

const rates = new RatesBoard();
function getCurrencyList () {
  ApiConnector.getStocks((response) => {
    if(response.success) {
      rates.clearTable();
      rates.fillTable(response.data);
  }
});
}
getCurrencyList();
let timerId = setInterval(() => getCurrencyList(), 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => ApiConnector.addMoney(data, (response) => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  }
  let message = response.success ? 'Пополнение счёта прошло успешно' : new Error('Невалидное значение и/или не выбрана валюта');
  moneyManager.setMessage(response.success, message);
});

moneyManager.conversionMoneyCallback = (data) => ApiConnector.convertMoney(data, (response) => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  }
  let message = response.success ? 'Конвертация прошла успешно' : new Error('Невалидное значение и/или не выбраны валюты');
  moneyManager.setMessage(response.success, message);
});

moneyManager.sendMoneyCallback = (data) => ApiConnector.transferMoney(data, (response) => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  }
  let message = response.success ? 'Перевод средств прошёл успешно' : new Error('Невалидное значение и/или не выбрана валюта и/или не выбран адресат');
  moneyManager.setMessage(response.success, message);
});

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites((response) => {
  if(response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => ApiConnector.addUserToFavorites(data, (response) => {
  if(response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
  let message = response.success ? 'Пользователь добавлен в избранное' : new Error('Неверное имя пользователя и/или id');
  moneyManager.setMessage(response.success, message);
});

favoritesWidget.removeUserCallback = (data) => ApiConnector.removeUserFromFavorites(data, (response) => {
  if(response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
  let message = response.success ? 'Пользователь удалён из избранного' : new Error('Произошла ошибка');
  moneyManager.setMessage(response.success, message);
});