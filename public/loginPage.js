'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, response => {
    response.success ? location.reload() : userForm.setLoginErrorMessage('Неверные логин или пароль');
  });
}

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, response => {
    response.success ? location.reload() : userForm.setRegisterErrorMessage('Пользователь с данным логином уже существует');
  });
}