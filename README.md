# n8n-nodes-ailabtools

This package provides an n8n community node for the [AILabTools API](https://www.ailabtools.com/docs), covering AI image, portrait, background removal, analysis, and enhancement workflows.

## Features

- Authenticate with an AILabTools API key using the `ailabapi-api-key` header.
- Query AILabTools credit balances.
- Query asynchronous task results by `task_id`.
- Call common preset APIs, including background removal, image upscaling, object removal, face analysis, skin analysis, hairstyle change, virtual try-on, face swap, cartoon portraits, and face enhancement.
- Call any AILabTools API path with custom JSON parameters and binary file fields.
- No runtime dependencies. The node uses n8n's built-in HTTP helpers.

## Installation

Install this package as a community node in n8n:

```sh
npm install n8n-nodes-ailabtools
```

For local n8n development:

```sh
npm install
npm run build
npm run dev
```

## Credentials

Create an AILabTools credential in n8n:

- API Key: your AILabTools API key from the [AILabTools Developer Console](https://www.ailabtools.com/developer)
- Base URL: `https://www.ailabapi.com`

Each operation uses a request timeout of 90 seconds by default. You can change this in the node's `Timeout (Seconds)` field.

The credential test calls:

```text
GET /api/common/query-credits
```

## Usage

### Query credits

Use the `Query Credits` operation to check account balances.

### Query an async task

Use the `Query Async Task` operation with the `task_id` returned by asynchronous APIs.

### Call a preset API

Use `Call Preset API`, select a preset endpoint, enter non-file parameters in `Body Parameters JSON`, and map binary file fields under `File Fields`.

Example for Universal Background Removal:

```json
{
  "return_form": "whiteBK"
}
```

Add a file field:

- AILabTools Field Name: `image`
- Input Binary Property: `data`

### Custom API request

Use `Custom API Request` for any AILabTools API not listed as a preset. Enter the API path, query parameters, body parameters, and file field mappings.

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

## Publishing

This package follows current n8n community node requirements:

- Package name starts with `n8n-nodes-`.
- `n8n-community-node-package` is included in package keywords.
- Node and credential entry points are declared in `package.json` under `n8n`.
- License is MIT.
- No runtime dependencies are declared.
- `.github/workflows/publish.yml` publishes from GitHub Actions with npm provenance.

Before submitting for n8n verification:

```sh
npm run lint
npm run build
npx @n8n/scan-community-package n8n-nodes-ailabtools
```

From May 1, 2026, n8n verification requires npm packages to be published from GitHub Actions with provenance. Configure npm Trusted Publishing for this repository, then run:

```sh
npm run release
```

## References

- [AILabTools API documentation](https://www.ailabtools.com/docs/introduction)
- [AILabTools API key](https://www.ailabtools.com/developer)
- [n8n community node requirements](https://docs.n8n.io/integrations/community-nodes/building-community-nodes/)
- [n8n verification guidelines](https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines/)

## License

MIT
