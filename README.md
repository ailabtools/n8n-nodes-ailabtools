# AILabTools n8n Community Node - AI Image APIs for n8n

Official n8n community node for [AILabTools AI Image APIs](https://www.ailabtools.com/docs).

Build AI-powered automation workflows with simple n8n nodes: background removal, image upscaling, object removal, face analysis, skin analysis, hairstyle changer, virtual try-on, face swap, cartoon avatar generation, face enhancement, and more.

- Install the [AILabTools n8n community node from npm](https://www.npmjs.com/package/n8n-nodes-ailabtools): `npm install n8n-nodes-ailabtools`
- Use preset operations for popular AILabTools image and portrait APIs
- Call any AILabTools endpoint with custom JSON parameters and binary file fields
- Supports account credit checks and async task result polling
- Get started with the [AILabTools Developer Console](https://www.ailabtools.com/developer)

## Requirements

- n8n with community nodes enabled
- Node.js version supported by your n8n installation
- An AILabTools API key

## Installation

Install this package as a community node in n8n:

```bash
npm install n8n-nodes-ailabtools
```

For local n8n node development:

```bash
pnpm install
pnpm run build
pnpm run dev
```

## Quick Start

### 1. Get your API key

Create or copy your API key from the [AILabTools Developer Console](https://www.ailabtools.com/developer).

### 2. Create AILabTools credentials in n8n

In n8n, create a new **AILabTools API** credential:

- **API Key**: your AILabTools API key
- **Base URL**: `https://www.ailabapi.com`

The credential sends the API key with the `ailabapi-api-key` header. The credential test calls:

```text
GET /api/common/query-credits
```

### 3. Remove an image background

Create a workflow with a binary image input, then add the **AILabTools** node:

- **Operation**: `Call Preset API`
- **Preset API**: `Universal Background Removal`
- **Body Parameters JSON**:

```json
{
	"return_form": "whiteBK"
}
```

- **File Fields**:
  - **AILabTools Field Name**: `image`
  - **Input Binary Property**: `data`

The node uploads the binary file as multipart form data and returns the AILabTools API response to the workflow item.

Each request uses a 90-second timeout by default. You can change it with the **Timeout (Seconds)** field.

## Popular Use Cases

| Popular API | Typical use case | n8n operation | File fields |
| --- | --- | --- | --- |
| [Universal Background Removal](https://www.ailabtools.com/docs/ai-cutout/general/universal-background-removal/api) | Remove product, portrait, or object backgrounds. | `Call Preset API` -> `Universal Background Removal` | `image` |
| [Image Upscaler](https://www.ailabtools.com/docs/ai-image/enhance/image-lossless-enlargement/api) | Increase image resolution for ecommerce, media, or content workflows. | `Call Preset API` -> `Image Upscaler` | `image` |
| [Remove Objects](https://www.ailabtools.com/docs/ai-image/editing/remove-objects/api) | Remove masked objects or defects from an image. | `Call Preset API` -> `Remove Objects` | `image`, `mask` |
| [Face Analyzer](https://www.ailabtools.com/docs/ai-portrait/analysis/face-analyzer/api) | Detect faces and return facial attributes. | `Call Preset API` -> `Face Analyzer` | `image` |
| [Skin Analyze Pro](https://www.ailabtools.com/docs/ai-portrait/analysis/skin-analysis-pro/api) | Analyze skin condition, pores, wrinkles, acne, tone, and texture. | `Call Preset API` -> `Skin Analyze Pro` | `image`, optional side images |
| [Hairstyle Changer Pro](https://www.ailabtools.com/docs/ai-portrait/effects/hairstyle-editor-pro/api) | Generate hairstyle previews from portrait images. | `Call Preset API` -> `Hairstyle Changer Pro` | `image`, optional `mask` |
| [Try on Clothes](https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes/api) | Create virtual clothing try-on results. | `Call Preset API` -> `Try on Clothes` | `person_image`, `clothes_image` |
| [Try on Clothes Pro](https://www.ailabtools.com/docs/ai-portrait/editing/try-on-clothes-pro/api) | Generate advanced outfit try-on results. | `Call Preset API` -> `Try on Clothes Pro` | `person_image`, `top_garment`, `bottom_garment` |
| [AI Face Swap](https://www.ailabtools.com/docs/ai-portrait/editing/ai-face-swap/api) | Swap a face into a target image while preserving the scene. | `Call Preset API` -> `AI Face Swap` | `image_target`, `image_template` |
| [Cartoon Yourself](https://www.ailabtools.com/docs/ai-portrait/effects/portrait-animation/api) | Create cartoon portraits and avatar images. | `Call Preset API` -> `Cartoon Yourself` | `image` |

Browse more demos in [AILabTools AI Portrait Tools](https://www.ailabtools.com/ai-portrait-tools) and [AILabTools AI Image Tools](https://www.ailabtools.com/ai-image-tools).

## Node Operations

### Call Preset API

Use this operation for common AILabTools endpoints. Select a preset API, enter non-file request fields in **Body Parameters JSON**, and map incoming n8n binary properties under **File Fields**.

Example body for Image Upscaler:

```json
{
	"upscale_factor": 2,
	"mode": "base"
}
```

Example file field:

| AILabTools Field Name | Input Binary Property |
| --- | --- |
| `image` | `data` |

### Custom API Request

Use this operation for any AILabTools endpoint not listed as a preset. Enter the API path, query parameters, body parameters, and file mappings manually.

Example path:

```text
/api/image/enhance/image-lossless-enlargement
```

Example body:

```json
{
	"upscale_factor": 2,
	"mode": "base"
}
```

### Query Async Task

Some AILabTools APIs return a `task_id` for long-running jobs. Use **Query Async Task** to fetch the current result:

```text
/api/common/query-async-task-result
```

Use the `task_id` returned by the original API call. In n8n, you can pass it with an expression such as:

```text
{{$json.task_id || $json.data.task_id}}
```

### Query Credits

Use **Query Credits** to check the account balance for the configured API key:

```text
/api/common/query-credits
```

## File Uploads

AILabTools APIs that accept files use multipart form data. In n8n:

1. Make sure the incoming item has a binary property, for example `data`.
2. Add an entry under **File Fields**.
3. Set **AILabTools Field Name** to the API field name, for example `image`, `mask`, `person_image`, or `clothes_image`.
4. Set **Input Binary Property** to the n8n binary property name.

The node reads the binary data, filename, and MIME type from the incoming n8n item.

## Async Workflow Example

For an API that returns a `task_id`:

1. Add an **AILabTools** node with **Call Preset API** or **Custom API Request**.
2. Send the request with the required image files and body fields.
3. Add a wait or loop step in n8n.
4. Add another **AILabTools** node with **Query Async Task**.
5. Pass the previous `task_id` into the **Task ID** field.

The first request might return:

```json
{
	"task_id": "example_task_id"
}
```

The task query returns the AILabTools async task status and result payload.

## API Reference

- [AILabTools API Documentation](https://www.ailabtools.com/docs)
- [Get your AILabTools API key](https://www.ailabtools.com/developer)
- [AILabTools Node.js SDK on npm](https://www.npmjs.com/package/ailabtools)
- [AILabTools SDK on GitHub](https://github.com/ailabtools/ailabtools-sdk)
- [n8n community node package on npm](https://www.npmjs.com/package/n8n-nodes-ailabtools)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)

## Error Handling

AILabTools API errors are returned by n8n as node execution errors. The API response may include troubleshooting fields such as `request_id` or `log_id`.

If you contact AILabTools support, include:

- The API endpoint or preset operation
- The `request_id` or `log_id` from the API response, if present
- The relevant n8n execution error details

## Development

```bash
pnpm install
pnpm run lint
pnpm run build
npm pack --dry-run
```

This package follows n8n community node requirements:

- Package name starts with `n8n-nodes-`
- `n8n-community-node-package` is included in package keywords
- Node and credential entry points are declared in `package.json` under `n8n`
- License is MIT
- No runtime dependencies are declared
- GitHub Actions publishes the package to npm with provenance

## License

MIT
