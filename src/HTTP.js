"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NativeHTTP = require("https");
const URL = require("url");
class HTTP {
    constructor(baseUrl) {
        const baseUrlParts = URL.parse(baseUrl);
        this.protocol = baseUrlParts.protocol;
        this.hostname = baseUrlParts.hostname;
        this.port = baseUrlParts.port;
    }
    get(path) {
        return new Promise((resolve, reject) => {
            const options = {
                protocol: this.protocol,
                hostname: this.hostname,
                port: this.port,
                path: path,
                method: "GET"
            };
            const req = NativeHTTP.request(options, function (res) {
                let response_data = [];
                res.setEncoding("utf8");
                res.on("data", function (chunk) {
                    response_data.push(chunk);
                });
                res.on("end", function () {
                    let body = undefined;
                    try {
                        body = JSON.parse(response_data.join(""));
                    }
                    catch (e) {
                    }
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                });
            });
            req.on("error", function (err) {
                reject(err);
            });
            req.end();
        });
    }
    post(path, data) {
        const serialized_data = JSON.stringify(data);
        return new Promise((resolve, reject) => {
            const options = {
                protocol: this.protocol,
                hostname: this.hostname,
                port: this.port,
                path: path,
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Content-length": serialized_data.length
                }
            };
            const req = NativeHTTP.request(options, function (res) {
                let response_data = [];
                res.setEncoding("utf8");
                res.on("data", function (chunk) {
                    response_data.push(chunk);
                });
                res.on("end", function () {
                    let body = undefined;
                    try {
                        body = JSON.parse(response_data.join(""));
                    }
                    catch (e) {
                    }
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        body: body
                    });
                });
            });
            req.on("error", function (error) {
                reject(error);
            });
            req.write(serialized_data);
            req.end();
        });
    }
}
exports.default = HTTP;
//# sourceMappingURL=HTTP.js.map