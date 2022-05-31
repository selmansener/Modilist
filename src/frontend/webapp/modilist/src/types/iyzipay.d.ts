interface config {
    uri: string;
    apiKey: string;
    secretKey: string;
}

interface Card {
    retrieve(request: any, callback: (err, result) => void): { path: string; method: 'GET' };
    create(request: any, callback: (err, result) => void): { path: string; method: 'POST' };
    update(request: any, callback: (err, result) => void): { path: string; method: 'PUT' };
    delete(request: any, callback: (err, result) => void): { path: string; method: 'DELETE' };
    retrieve(request: any, callback: (err, result) => void): { path: string; method: 'GET' };
    retrieveList(request: any, callback: (err, result) => void): { path: string; method: 'GET' };
}

// * Add new resources to here
interface initResult {
    _config: config;
    apiTest: apiTest;
}

// * Resources Types
interface apiTest extends apiOptions {
    _config: config;
}

declare module 'iyzipay' {
    class Iyzipay {
        constructor(config: config): initResult

        card: Card;
    };
    export = Iyzipay;
}