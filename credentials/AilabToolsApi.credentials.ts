import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AilabToolsApi implements ICredentialType {
	name = 'ailabToolsApi';

	displayName = 'AILabTools API';

	icon: Icon = {
		light: 'file:../icons/ailabtools.svg',
		dark: 'file:../icons/ailabtools.dark.svg',
	};

	documentationUrl = 'https://www.ailabtools.com/docs/introduction';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'ailabapi-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/common/query-credits',
			method: 'GET',
		},
	};
}
