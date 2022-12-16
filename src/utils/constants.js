// local API
// export const apiCategory = "http://localhost:3000/db/category.json"; // API категорий
// export const apiPayments = "http://localhost:3000/db/payments.json"; // API расходов
// export const apiIcons = "http://localhost:3000/db/icons.json"; // API картинок

// backend API
export const apiCategory = "http://wallet-backend/api/category"; // API категорий
export const apiPayments = "http://wallet-backend/api/spending"; // API расходов
export const apiIcons = "http://wallet-backend/api/categoryImg"; // API картинок
export const apiToken = "http://wallet-backend/sanctum/csrf-cookie"; // API токен
export const apiLogin = "http://wallet-backend/api/login"; // API вход пользователя
export const apiLogout = "http://wallet-backend/api/logout"; // API выход пользователя
export const apiRegister = "http://wallet-backend/api/register" // API регистрация

export const FETCH_STATUSES = {
  IDLE: 0, // запроса еще не было, дефолтное состояние
  REQUEST: 1, // запрос начался, ошибки нет
  SUCCESS: 2, // запрос прошел успешно
  FAILURE: 3, // запрос завершился с ошибкой
};

export const getDate = (date) => {
  const paymentDate = new Date(date);

  const editDate = {
    year: paymentDate.getFullYear(),
    month: paymentDate.getMonth() < 10 ? "0" + (paymentDate.getMonth() + 1) : paymentDate.getMonth() + 1,
    day: paymentDate.getDate() < 10 ? "0" + paymentDate.getDate() : paymentDate.getDate()
  }

  return `${editDate.year}-${editDate.month}-${editDate.day}`;
};

export const checkInputValues = (inputName, inputValue) => {
  switch (inputName) {
    case "name": {
      const re = /^[a-zа-яё]+$/i;
      if (!inputValue.length) {
        return "Поле обязательно для заполнения!";
      } else if (!re.test(inputValue)) {
        return "Имя содержит только буквы!";
      } else {
        return "";
      }
    }
    case "surname": {
      const re = /^[a-zа-яё]+$/i;
      if (!inputValue.length) {
        return "Поле обязательно для заполнения!";
      } else if (!re.test(inputValue)) {
        return "Имя содержит только буквы!";
      } else {
        return "";
      }
    }
    case "email": {
      const re = /^[\w._-]+@\w+\.[a-z]{2,4}$/i;
      if (!inputValue.length) {
        return "Поле обязательно для заполнения!";
      } else if (!re.test(inputValue)) {
        return "E-mail выглядит как mymail@mail.ru";
      } else {
        return "";
      }
    }
    case "password": {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d@#$%]).{8,}$/;
      if (!inputValue.length) {
        return "Поле обязательно для заполнения!";
      } else if (!re.test(inputValue)) {
        return "Пароль из 8 символов, заглавной буквой и цифрой!";
      } else {
        return "";
      }
    }
    default: {
      break;
    }
  }
}
