// local API
// export const apiCategory = "http://localhost:3000/db/category.json"; // API категорий
// export const apiPayments = "http://localhost:3000/db/payments.json"; // API расходов
// export const apiIcons = "http://localhost:3000/db/icons.json"; // API картинок
// export const apiUser = "http://localhost:3000/db/user.json"; // API пользователя

// backend API
export const apiCategory = "http://localhost/api/category"; // API категорий
export const apiPayments = "http://localhost/api/spending"; // API расходов
export const apiIcons = "http://localhost/api/categoryImg"; // API картинок
export const apiToken = "http://localhost/sanctum/csrf-cookie"; // API токен
export const apiLogin = "http://localhost/api/login"; // API вход пользователя
export const apiLogout = "http://localhost/api/logout"; // API выход пользователя
export const apiRegister = "http://localhost/api/register" // API регистрация
export const apiUser = "http://localhost/api/user" // API информация о пользователе

export const FETCH_STATUSES = {
  IDLE: 0, // запроса еще не было, дефолтное состояние
  REQUEST: 1, // запрос начался, ошибки нет
  SUCCESS: 2, // запрос прошел успешно
  FAILURE: 3, // запрос завершился с ошибкой
};

export const navListPublic = [
  {
    route: "/",
    name: "Главная",
  },
  {
    route: "/registration",
    name: "Регистрация",
  },
];

export const navListPrivate = [
  {
    route: "/category",
    name: "Категории",
  },
  {
    route: "/operations",
    name: "Операции",
  },
  {
    route: "/profile",
    name: "Профиль",
  },
];

export const getDate = (date) => {
  const paymentDate = new Date(date);

  const editDate = {
    year: paymentDate.getFullYear(),
    month: paymentDate.getMonth() < 10 ? "0" + (paymentDate.getMonth() + 1) : paymentDate.getMonth() + 1,
    day: paymentDate.getDate() < 10 ? "0" + paymentDate.getDate() : paymentDate.getDate()
  }

  return `${editDate.year}-${editDate.month}-${editDate.day}`;
};

export const getMonthName = (date) => {
  const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

  const inputDate = {
    day: date.slice(8, 10),
    month: months[date.slice(5, 7) - 1],
    year: date.slice(0, 4)
  }

  return `${inputDate.day} ${inputDate.month} ${inputDate.year}`;
};

export const sortPaymentDate = (paymentList) => {
  const uniquePaymentDate = new Set(Array.from(paymentList, ({created_at}) => created_at.slice(0, 10)));

  const payments = paymentList.reduce(acc => {

    for (let date of uniquePaymentDate) {
      acc[getMonthName(date)] = [...paymentList.filter((payment) => payment.created_at.slice(0, 10) === date)];
    }

    return acc;
  }, {});

  return payments;
};

export const checkInputValues = (inputName, inputValue) => {
  switch (inputName) {
    case "payment": {
      if (!inputValue.length) {
        return true;
      } else {
        return false;
      }
    }
    case "text": {
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
      const re = /^(?=.*[\da-zA-Z]).{3,}$/;
      if (!inputValue.length) {
        return "Поле обязательно для заполнения!";
      } else if (!re.test(inputValue)) {
        return "Пароль минимум 3 символа!";
      } else {
        return "";
      }
    }
    default: {
      break;
    }
  }
}
