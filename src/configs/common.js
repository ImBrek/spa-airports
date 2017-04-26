const _ = require('lodash');
const privateConfig = require('./private');

const commonConfig = {
};

module.exports = _.merge({}, commonConfig, privateConfig);
