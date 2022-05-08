import { accountLocalStorageKeys } from '@utils/localStorageKeys';
import "firebase/database";
import firebase from "gatsby-plugin-firebase";

export const getOrderCount = () =>
  firebase.database().ref("orderCount").once("value");

export const updateOrderCount = (currentOrderCount: number) =>
  firebase.database().ref("orderCount").set(currentOrderCount);

export const sendPaymentEmailApi = (
  emailData: products.sendPaymentEmailPayload
) =>
  window.fetch("https://send-checkout-email.gohjx8808.workers.dev", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "content-type": "application/json",
      "accept-type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

export const getAvailablePromocodes = () =>
  firebase.database().ref("promoCodes").once("value");

export const updatePromoCodeUsed = (usedPromocode: string[]) => {
  const uid = localStorage.getItem(accountLocalStorageKeys.UID);
  return firebase.database().ref(`users/${uid}/usedPromocode`).set(usedPromocode);
};
