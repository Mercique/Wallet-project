export const apiCategory = "http://wallet-backend/api/category"; // API категорий
export const apiPayments = "http://wallet-backend/api/spending"; // API расходов
export const apiIcons = "http://wallet-backend/api/categoryImg"; // API названий картинок

export const FETCH_STATUSES = {
  IDLE: 0, // запроса еще не было, дефолтное состояние
  REQUEST: 1, // запрос начался, ошибки нет
  SUCCESS: 2, // запрос прошел успешно
  FAILURE: 3, // запрос завершился с ошибкой
};
