# Example Workflows

## Hairstyle Changer Pro n8n Demo

Import `hairstyle-changer-pro-demo.json` into n8n to test the AILabTools Hairstyle Changer Pro API.

Before running the workflow:

1. Install `n8n-nodes-ailabtools` in n8n.
2. Create an **AILabTools API** credential and select it on both AILabTools nodes.
3. Update the **Read Test Image** node's file path to a portrait image that your n8n instance can read.

The workflow submits a hairstyle task, polls the async task result every 2 seconds until `task_status` is `2`, downloads the generated image, and includes an AI Agent tool connection example.
