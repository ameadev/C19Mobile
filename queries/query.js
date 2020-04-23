import {default as axios} from 'axios';

const API = 'http://3.217.233.250:8080';

export function fetchCountries() {
  return new Promise(callBack => {
    axios
      .get(API + '/position/countries')
      .then(result => callBack(result))
      .catch(error => console.log(error));
  });
}

export const connection = async(data) => {
  let res =  await axios.post(API + '/patient/connect', data);
  return res.data;
};

export function createAccount(data) {
  return new Promise(callBack => {
    axios
      .post(API + '/patient/add', data)
      .then(result => callBack(result))
      .catch(error => console.log(error));
  });
}

export function sendConstants(data) {
  return new Promise(callBack => {
    axios
      .post(API + '/patient/constant/add', data)
      .then(result => callBack(result))
      .catch(error => console.log(error));
  });
}
