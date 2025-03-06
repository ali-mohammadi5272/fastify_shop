const userNamePattern: RegExp = /^[aA-zZ]{1}[aA-zZ0-9]{2,}(_[aA-zZ0-9]+)*?$/;
const emailPattern: RegExp = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/;

export { userNamePattern, emailPattern };
