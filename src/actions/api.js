import { API_CALL_RESULT } from 'utils/api';

export function successResponse(type, request, response, actionId) {
  return {
    type,
    payload: {
      request,
      response,
      id: actionId,
      [API_CALL_RESULT]: true,
    },
  };
}

export function failResponse(type, request, response, actionId, error) {
  return {
    type,
    payload: {
      request,
      response,
      error,
      id: actionId,
      [API_CALL_RESULT]: true,
    },
    error: true,
  };
}
