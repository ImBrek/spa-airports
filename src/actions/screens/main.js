import { createAction } from 'redux-actions';

export const SCREEN = {
  SUBMIT_FORM: 'SCREEN_MAIN_SUBMIT_FORM',
};

export const submitForm = createAction(SCREEN.SUBMIT_FORM, (data) => ({ data }));
