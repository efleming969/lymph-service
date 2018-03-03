export default class HTTP {
    protocol: string;
    hostname: string;
    port: string;
    constructor(baseUrl: string);
    get(path: string): Promise<any>;
    post(path: string, data: any): Promise<any>;
}
