"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AilabToolsApi = void 0;
class AilabToolsApi {
    constructor() {
        this.name = 'ailabToolsApi';
        this.displayName = 'AILabTools API';
        this.icon = {
            light: 'file:../icons/ailabtools.svg',
            dark: 'file:../icons/ailabtools.dark.svg',
        };
        this.documentationUrl = 'https://www.ailabtools.com/docs/introduction';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                required: true,
            },
            {
                displayName: 'Base URL',
                name: 'baseUrl',
                type: 'string',
                default: 'https://www.ailabapi.com',
                required: true,
                description: 'Default AILabTools API base URL',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    'ailabapi-api-key': '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.baseUrl}}',
                url: '/api/common/query-credits',
                method: 'GET',
            },
        };
    }
}
exports.AilabToolsApi = AilabToolsApi;
//# sourceMappingURL=AilabToolsApi.credentials.js.map