import aggregate from "./aggregate";
import chunk from "./chunk";
import difference from "./difference";
import intersection from "./intersection";
import mapify from "./mapify";
import nth from "./nth";
import orm from "./orm";
import range from "./range";
import remove from "./remove";
import shuffle from "./shuffle";
import sort from "./sort";
import unique from "./unique";

const autil = { aggregate, chunk, difference, intersection, mapify, nth, orm, range, remove, shuffle, sort, unique };

export { aggregate, chunk, difference, intersection, mapify, nth, orm, range, remove, shuffle, sort, unique };

export default autil;
module.exports = autil;
exports.default = autil;
