// utils/hashPw.js
const bcrypt = require('bcryptjs');

module.exports = async function hashPw(pw, saltRounds) {
  return await bcrypt.hash(pw, saltRounds);
};