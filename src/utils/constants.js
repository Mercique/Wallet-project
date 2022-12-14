// local API
export const apiCategory = "http://localhost:3000/db/category.json"; // API категорий
export const apiPayments = "http://localhost:3000/db/payments.json"; // API расходов
export const apiIcons = "http://localhost:3000/db/icons.json"; // API картинок

// backend API
// export const apiCategory = "http://wallet-backend/api/category"; // API категорий
// export const apiPayments = "http://wallet-backend/api/spending"; // API расходов
// export const apiIcons = "http://wallet-backend/api/categoryImg"; // API картинок

export const getDate = (date) => {
  const paymentDate = new Date(date);

  const editDate = {
    year: paymentDate.getFullYear(),
    month: paymentDate.getMonth() < 10 ? "0" + (paymentDate.getMonth() + 1) : paymentDate.getMonth() + 1,
    day: paymentDate.getDate() < 10 ? "0" + paymentDate.getDate() : paymentDate.getDate()
  }

  return `${editDate.year}-${editDate.month}-${editDate.day}`;
};

export const FETCH_STATUSES = {
  IDLE: 0, // запроса еще не было, дефолтное состояние
  REQUEST: 1, // запрос начался, ошибки нет
  SUCCESS: 2, // запрос прошел успешно
  FAILURE: 3, // запрос завершился с ошибкой
};
