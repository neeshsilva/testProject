import { SUBMIT_ALERT } from "../../actionTypes";
import { alertTypes } from "../alert.conf";

/*** Submitting general alert to dom***/
export const submitAlert = (
  message,
  description,
  type = alertTypes.success
) => ({
  type: SUBMIT_ALERT,
  payload: {
    message: message,
    description: description,
    type: type
  }
});
