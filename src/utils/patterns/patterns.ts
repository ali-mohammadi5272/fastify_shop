const userNamePattern: RegExp = /^[aA-zZ]{1}[aA-zZ0-9]{2,}(_[aA-zZ0-9]+)*?$/;
const emailPattern: RegExp = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;
const phoneNumberPattern: RegExp = /^(0|\+98)?9\d{9}$/;
const phoneNumberPrefixPattern: RegExp = /^(0|\+98)/;

export {
  userNamePattern,
  emailPattern,
  phoneNumberPattern,
  phoneNumberPrefixPattern,
};
