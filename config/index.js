const values = {
  prd: './prod',
  prod: './prod',
  production: './prod',
  hmg: './hmg',
  local: './local',
};

module.exports = require(values[process.env.NODE_ENV] || values.local);
