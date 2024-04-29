export const ROOM_PASSWORD_VALIDATION_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const ValidationMessage = {
  Required: 'Required field',
  RoomPasswordRegex: 'Password should contain at least 8 letters and digits',
  OutOfRange: 'Out of range field',
};
