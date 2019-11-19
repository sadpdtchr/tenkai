export const ALL_USER_BEGIN = 'user.ALL_BEGIN';
export const ALL_USER_SUCCESS = 'user.ALL_SUCCESS';
export const ALL_USER_ERROR = 'user.ALL_ERROR';

export const DELETE_USER_BEGIN = 'user.DELETE_BEGIN';
export const DELETE_USER_SUCCESS = 'user.DELETE_SUCCESS';
export const DELETE_USER_ERROR = 'user.DELETE_ERROR';

export const SAVE_USER_BEGIN = 'user.SAVE_BEGIN';
export const SAVE_USER_SUCCESS = 'user.SAVE_SUCCESS';
export const SAVE_USER_ERROR = 'user.SAVE_ERROR';

export const allUserBegin = () => ({
  type: ALL_USER_BEGIN
});

export const allUserSuccess = users => ({
  type: ALL_USER_SUCCESS,
  payload: { users }
});

export const allUserError = error => ({
  type: ALL_USER_ERROR,
  payload: { error }
});

export const saveUserBegin = () => ({
  type: SAVE_USER_BEGIN
});

export const saveUserSuccess = users => ({
  type: SAVE_USER_SUCCESS,
  payload: { users }
});

export const saveUserError = error => ({
  type: SAVE_USER_ERROR,
  payload: { error }
});

export const deleteUserBegin = () => ({
  type: DELETE_USER_BEGIN
});

export const deleteUserSuccess = users => ({
  type: DELETE_USER_SUCCESS,
  payload: { users }
});

export const deleteUserError = error => ({
  type: DELETE_USER_ERROR,
  payload: { error }
});