import orm from "./orm";

console.log(
    orm([
        {
            name: "bob",
            age: 42,
        },
    ]).select(["name", "age"])
);

const autil = { orm };

export { orm };

export default autil;
module.exports = autil;
exports.default = autil;
