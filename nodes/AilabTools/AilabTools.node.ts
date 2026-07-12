import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

type PresetEndpoint = {
	name: string;
	value: string;
	method: IHttpRequestMethods;
	path: string;
	description: string;
	fileFields: string[];
	documentationUrl: string;
};

const PRESET_ENDPOINTS: PresetEndpoint[] = [
	{
		name: 'Universal Background Removal',
		value: 'universalBackgroundRemoval',
		method: 'POST',
		path: '/api/cutout/general/universal-background-removal',
		description: 'Remove image backgrounds. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-cutout/general/universal-background-removal/api',
	},
	{
		name: 'Portrait Background Removal',
		value: 'portraitBackgroundRemoval',
		method: 'POST',
		path: '/api/cutout/portrait/portrait-background-removal',
		description: 'Remove portrait backgrounds. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-cutout/portrait/portrait-background-removal/api',
	},
	{
		name: 'Image Upscaler',
		value: 'imageUpscaler',
		method: 'POST',
		path: '/api/image/enhance/image-lossless-enlargement',
		description: 'Upscale images. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-image/enhance/image-lossless-enlargement/api',
	},
	{
		name: 'Remove Objects',
		value: 'removeObjects',
		method: 'POST',
		path: '/api/image/editing/remove-objects',
		description: 'Remove masked objects. File fields: image, mask.',
		fileFields: ['image', 'mask'],
		documentationUrl: 'https://www.ailabtools.com/docs/ai-image/editing/remove-objects/api',
	},
	{
		name: 'AI Image Extender',
		value: 'aiImageExtender',
		method: 'POST',
		path: '/api/image/editing/ai-image-extender',
		description: 'Extend an image with optional prompt and mask. File fields: image, mask.',
		fileFields: ['image', 'mask'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-image/editing/ai-image-extender/api',
	},
	{
		name: 'AI Object Replacer',
		value: 'aiObjectReplacer',
		method: 'POST',
		path: '/api/image/editing/ai-object-replacer',
		description: 'Replace masked objects using a prompt. File fields: image, mask.',
		fileFields: ['image', 'mask'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-image/editing/ai-object-replacer/api',
	},
	{
		name: 'Face Analyzer',
		value: 'faceAnalyzer',
		method: 'POST',
		path: '/api/portrait/analysis/face-analyzer',
		description: 'Detect faces and return face attributes. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/analysis/face-analyzer/api',
	},
	{
		name: 'Skin Analyze Pro',
		value: 'skinAnalyzePro',
		method: 'POST',
		path: '/api/portrait/analysis/skin-analysis-pro',
		description: 'Analyze skin from face images. File fields: image, left_side_image, right_side_image.',
		fileFields: ['image', 'left_side_image', 'right_side_image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/analysis/skin-analysis-pro/api',
	},
	{
		name: 'Hairstyle Changer Pro',
		value: 'hairstyleChangerPro',
		method: 'POST',
		path: '/api/portrait/effects/hairstyle-editor-pro',
		description: 'Generate hairstyle changes. File fields: image, mask.',
		fileFields: ['image', 'mask'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/effects/hairstyle-editor-pro/api',
	},
	{
		name: 'Try on Clothes',
		value: 'tryOnClothes',
		method: 'POST',
		path: '/api/portrait/editing/try-on-clothes',
		description: 'Virtual try-on. File fields: person_image, clothes_image.',
		fileFields: ['person_image', 'clothes_image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes/api',
	},
	{
		name: 'Try on Clothes Pro',
		value: 'tryOnClothesPro',
		method: 'POST',
		path: '/api/portrait/editing/try-on-clothes-pro',
		description: 'Advanced virtual try-on. File fields: person_image, top_garment, bottom_garment.',
		fileFields: ['person_image', 'top_garment', 'bottom_garment'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes-pro/api',
	},
	{
		name: 'AI Face Swap',
		value: 'aiFaceSwap',
		method: 'POST',
		path: '/api/portrait/editing/ai-face-swap',
		description: 'Swap faces between two images. File fields: image_target, image_template.',
		fileFields: ['image_target', 'image_template'],
		documentationUrl: 'https://www.ailabtools.com/docs/ai-portrait/editing/ai-face-swap/api',
	},
	{
		name: 'Cartoon Yourself',
		value: 'cartoonYourself',
		method: 'POST',
		path: '/api/portrait/effects/portrait-animation',
		description: 'Generate a cartoon portrait. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/effects/portrait-animation/api',
	},
	{
		name: 'AI Face Enhancer',
		value: 'aiFaceEnhancer',
		method: 'POST',
		path: '/api/portrait/effects/enhance-face',
		description: 'Enhance face clarity. File field: image.',
		fileFields: ['image'],
		documentationUrl:
			'https://www.ailabtools.com/docs/ai-portrait/effects/ai-face-enhancer/api',
	},
];

const credentialName = 'ailabToolsApi';

const jsonParameter: INodeProperties = {
	displayName: 'Body Parameters JSON',
	name: 'bodyParametersJson',
	type: 'json',
	default: '{}',
	description:
		'Non-file body parameters as JSON. Use AILabTools API field names such as return_form or task_type.',
};

const queryJsonParameter: INodeProperties = {
	displayName: 'Query Parameters JSON',
	name: 'queryParametersJson',
	type: 'json',
	default: '{}',
	description: 'Query string parameters as JSON',
};

const fileFieldsParameter: INodeProperties = {
	displayName: 'File Fields',
	name: 'fileFields',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	default: {},
	description:
		'Map AILabTools file field names to n8n binary properties. Leave empty for JSON-only requests.',
	options: [
		{
			displayName: 'Field',
			name: 'field',
			values: [
				{
					displayName: 'AILabTools Field Name',
					name: 'fieldName',
					type: 'string',
					default: 'image',
					required: true,
					description: 'For example: image, mask, person_image, clothes_image, image_target',
				},
				{
					displayName: 'Input Binary Property',
					name: 'binaryPropertyName',
					type: 'string',
					default: 'data',
					required: true,
					description: 'Name of the binary property on the incoming n8n item',
				},
			],
		},
	],
};

function endpointOptions() {
	return PRESET_ENDPOINTS.map((endpoint) => ({
		name: endpoint.name,
		value: endpoint.value,
		description: endpoint.description,
	}));
}

function getPresetEndpoint(
	executeFunctions: IExecuteFunctions,
	value: string,
	itemIndex: number,
): PresetEndpoint {
	const endpoint = PRESET_ENDPOINTS.find((candidate) => candidate.value === value);
	if (!endpoint) {
		throw new NodeOperationError(
			executeFunctions.getNode(),
			`Unsupported AILabTools preset endpoint: ${value}`,
			{ itemIndex },
		);
	}

	return endpoint;
}

function parseJsonParameter(
	executeFunctions: IExecuteFunctions,
	value: string,
	parameterName: string,
	itemIndex: number,
): IDataObject {
	let parsed: unknown;
	try {
		parsed = value ? JSON.parse(value) : {};
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Invalid JSON.';
		throw new NodeOperationError(
			executeFunctions.getNode(),
			`${parameterName} must contain a valid JSON object. ${message}`,
			{ itemIndex },
		);
	}

	if (!parsed || Array.isArray(parsed) || typeof parsed !== 'object') {
		throw new NodeOperationError(
			executeFunctions.getNode(),
			`${parameterName} must contain a valid JSON object. Value must be a JSON object.`,
			{ itemIndex },
		);
	}

	return parsed as IDataObject;
}

function normalizePath(path: string): string {
	if (!path.startsWith('/')) {
		return `/${path}`;
	}

	return path;
}

async function buildRequestOptions(
	executeFunctions: IExecuteFunctions,
	operation: string,
	itemIndex: number,
	baseUrl: string,
): Promise<IHttpRequestOptions> {
	if (operation === 'queryCredits') {
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: '/api/common/query-credits',
			json: true,
		};
	}

	if (operation === 'queryAsyncTask') {
		const taskId = executeFunctions.getNodeParameter('taskId', itemIndex) as string;
		return {
			method: 'GET',
			baseURL: baseUrl,
			url: '/api/common/query-async-task-result',
			qs: {
				task_id: taskId,
			},
			json: true,
		};
	}

	if (operation === 'callPreset') {
		const presetEndpoint = executeFunctions.getNodeParameter('presetEndpoint', itemIndex) as string;
		const endpoint = getPresetEndpoint(executeFunctions, presetEndpoint, itemIndex);
		const body = parseJsonParameter(
			executeFunctions,
			executeFunctions.getNodeParameter('bodyParametersJson', itemIndex, '{}') as string,
			'Body Parameters JSON',
			itemIndex,
		);

		return await buildApiRequest(
			executeFunctions,
			endpoint.method,
			baseUrl,
			endpoint.path,
			{},
			body,
			itemIndex,
		);
	}

	const method = executeFunctions.getNodeParameter('method', itemIndex) as IHttpRequestMethods;
	const path = executeFunctions.getNodeParameter('path', itemIndex) as string;
	const qs = parseJsonParameter(
		executeFunctions,
		executeFunctions.getNodeParameter('queryParametersJson', itemIndex, '{}') as string,
		'Query Parameters JSON',
		itemIndex,
	);
	const body = parseJsonParameter(
		executeFunctions,
		executeFunctions.getNodeParameter('bodyParametersJson', itemIndex, '{}') as string,
		'Body Parameters JSON',
		itemIndex,
	);

	return await buildApiRequest(
		executeFunctions,
		method,
		baseUrl,
		normalizePath(path),
		qs,
		body,
		itemIndex,
	);
}

async function buildApiRequest(
	executeFunctions: IExecuteFunctions,
	method: IHttpRequestMethods,
	baseUrl: string,
	path: string,
	qs: IDataObject,
	body: IDataObject,
	itemIndex: number,
): Promise<IHttpRequestOptions> {
	const fileFields = executeFunctions.getNodeParameter(
		'fileFields.field',
		itemIndex,
		[],
	) as IDataObject[];
	const requestOptions: IHttpRequestOptions = {
		method,
		baseURL: baseUrl,
		url: path,
		qs,
		json: true,
	};

	if (fileFields.length > 0) {
		const formData = new FormData();
		for (const [key, value] of Object.entries(body)) {
			if (value === undefined || value === null) {
				continue;
			}

			const formValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
			formData.append(key, formValue);
		}

		for (const field of fileFields) {
			const fieldName = String(field.fieldName ?? '');
			const binaryPropertyName = String(field.binaryPropertyName ?? '');
			if (!fieldName || !binaryPropertyName) {
				throw new NodeOperationError(
					executeFunctions.getNode(),
					'Each file field requires an AILabTools field name and input binary property.',
					{ itemIndex },
				);
			}

			const binaryData = executeFunctions.helpers.assertBinaryData(itemIndex, binaryPropertyName);
			const buffer = await executeFunctions.helpers.getBinaryDataBuffer(
				itemIndex,
				binaryPropertyName,
			);
			const blob = new Blob([buffer as unknown as BlobPart], {
				type: binaryData.mimeType,
			});
			formData.append(fieldName, blob, binaryData.fileName ?? `${fieldName}.bin`);
		}

		requestOptions.body = formData;
		return requestOptions;
	}

	if (method !== 'GET') {
		requestOptions.body = body;
	}

	return requestOptions;
}

export class AilabTools implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'AILabTools',
		name: 'ailabTools',
		icon: {
			light: 'file:ailabtools.svg',
			dark: 'file:ailabtools.dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Use AILabTools AI image and portrait APIs',
		defaults: {
			name: 'AILabTools',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: credentialName,
				required: true,
			},
		],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Call Preset API',
						value: 'callPreset',
						description: 'Call a common AILabTools endpoint',
						action: 'Call a preset API',
					},
					{
						name: 'Custom API Request',
						value: 'customRequest',
						description: 'Call any AILabTools API path',
						action: 'Make a custom API request',
					},
					{
						name: 'Query Async Task',
						value: 'queryAsyncTask',
						description: 'Query an asynchronous task by task ID',
						action: 'Query an async task',
					},
					{
						name: 'Query Credits',
						value: 'queryCredits',
						description: 'Check AILabTools credit balances',
						action: 'Query credits',
					},
				],
				default: 'callPreset',
			},
			{
				displayName: 'Timeout (Seconds)',
				name: 'timeoutSeconds',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 90,
				description: 'Request timeout in seconds',
			},
			{
				displayName: 'Preset API',
				name: 'presetEndpoint',
				type: 'options',
				noDataExpression: true,
				options: endpointOptions(),
				default: 'universalBackgroundRemoval',
				displayOptions: {
					show: {
						operation: ['callPreset'],
					},
				},
			},
			{
				displayName: 'Preset Documentation',
				name: 'presetNotice',
				type: 'notice',
				default:
					'Open the selected AILabTools API documentation for allowed parameters and expected file fields. Enter non-file parameters in Body Parameters JSON.',
				displayOptions: {
					show: {
						operation: ['callPreset'],
					},
				},
			},
			{
				...jsonParameter,
				displayOptions: {
					show: {
						operation: ['callPreset'],
					},
				},
			},
			{
				...fileFieldsParameter,
				displayOptions: {
					show: {
						operation: ['callPreset'],
					},
				},
			},
			{
				displayName: 'Method',
				name: 'method',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'GET',
						value: 'GET',
					},
					{
						name: 'POST',
						value: 'POST',
					},
				],
				default: 'POST',
				displayOptions: {
					show: {
						operation: ['customRequest'],
					},
				},
			},
			{
				displayName: 'Path',
				name: 'path',
				type: 'string',
				default: '/api/common/query-credits',
				required: true,
				description: 'AILabTools API path, for example /api/image/enhance/image-lossless-enlargement',
				displayOptions: {
					show: {
						operation: ['customRequest'],
					},
				},
			},
			{
				...queryJsonParameter,
				displayOptions: {
					show: {
						operation: ['customRequest'],
					},
				},
			},
			{
				...jsonParameter,
				displayOptions: {
					show: {
						operation: ['customRequest'],
					},
				},
			},
			{
				...fileFieldsParameter,
				displayOptions: {
					show: {
						operation: ['customRequest'],
					},
				},
			},
			{
				displayName: 'Task ID',
				name: 'taskId',
				type: 'string',
					default: '',
					required: true,
					description: 'The task_id returned by an asynchronous AILabTools API',
				displayOptions: {
					show: {
						operation: ['queryAsyncTask'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials(credentialName);
		const baseUrl = String(credentials.baseUrl ?? 'https://www.ailabapi.com').replace(/\/$/, '');

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const operation = this.getNodeParameter('operation', itemIndex) as string;
				const requestOptions = await buildRequestOptions(this, operation, itemIndex, baseUrl);
				const timeoutSeconds = this.getNodeParameter('timeoutSeconds', itemIndex, 90) as number;
				requestOptions.timeout = Math.max(1, Math.round(timeoutSeconds)) * 1000;
				const response = await this.helpers.httpRequestWithAuthentication.call(
					this,
					credentialName,
					requestOptions,
				);

				returnData.push({
					json: response as IDataObject,
					pairedItem: {
						item: itemIndex,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : String(error),
						},
						pairedItem: {
							item: itemIndex,
						},
					});
					continue;
				}

				throw new NodeOperationError(this.getNode(), error as Error, { itemIndex });
			}
		}

		return [returnData];
	}
}
