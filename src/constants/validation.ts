export const ROOM_PASSWORD_VALIDATION_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const ValidationMessage = {
  Required: 'Required Field',
  RoomPasswordRegex: 'Password should contain at least 8 letters and digits',
};
