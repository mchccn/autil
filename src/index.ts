import aggregate from "./aggregate";
import orm from "./orm";
import sort from "./sort";

const autil = { aggregate, orm, sort };

export { aggregate, orm, sort };

export default autil;
module.exports = autil;
exports.default = autil;
