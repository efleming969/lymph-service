"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_1 = require("./HTTP");
test("getting json data from remote service", function () {
    const http = new HTTP_1.default("https://httpbin.org");
    return http.get("/get?name=foobar").then(function (response) {
        expect(response.body.args).toEqual({
            name: "foobar"
        });
    });
});
test("handling an error when get from invalid uri", function () {
    const http = new HTTP_1.default("https://httpbin.org");
    return http.get("/invalid").then(function (response) {
        expect(response.status).toEqual(404);
    });
});
test("posting json data to remote service", function () {
    const http = new HTTP_1.default("https://httpbin.org");
    return http.post("/post", { name: "foobar" }).then(function (response) {
        expect(response.status).toEqual(200);
        expect(response.body.json).toEqual({
            name: "foobar"
        });
    });
});
test("handling an error when posting to invalid uri", function () {
    const http = new HTTP_1.default("https://httpbin.org");
    return http.post("/invalid", {}).then(function (response) {
        expect(response.status).toEqual(404);
    });
});
//# sourceMappingURL=HTTP.tests.js.map