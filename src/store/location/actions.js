export const GET_LOCATION = "LOCATION::GET_LOCATION";

export const getLocation = (location) => ({
  type: GET_LOCATION,
  payload: location,
});
