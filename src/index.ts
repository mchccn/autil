import aggregate from "./aggregate";
import orm from "./orm";
import sort from "./sort";

console.log(
    orm([
        {
            name: "bob",
            age: 42,
        },
    ]).select(["name", "age"])
);

const autil = { aggregate, orm, sort };

export { aggregate, orm, sort };

export default autil;
module.exports = autil;
exports.default = autil;
