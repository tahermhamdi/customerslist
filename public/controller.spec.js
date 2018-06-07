var CustomersList = require("/controllers/controller");

describe("test module", function() {
    it("should return a message", function() {
        expect(CustomersList.refresh()).toEqual("Hello, testing!");
    });
});
