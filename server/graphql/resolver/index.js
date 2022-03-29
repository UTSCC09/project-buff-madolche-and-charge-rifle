const userResolver = require("./user");
const projectResolver = require("./project");
const rootResolver = {
    ...userResolver,
    ...projectResolver,
};
module.exports = rootResolver;