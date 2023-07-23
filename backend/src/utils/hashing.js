const bcrypt = require('bcrypt');

const hash = async (password)=>{
  const passwordWithHash = await bcrypt.hash(password,10);
  return passwordWithHash;
}

const validateHash = async (password, hash) =>{
  const isMatch = await bcrypt.compare(password,hash);
  return isMatch;
}

module.exports = {
  hash,
  validateHash
};