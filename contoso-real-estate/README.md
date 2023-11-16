---
page_type: sample
languages:
- yaml
- json
- js
products:
- copilot
- ms-copilot
name: "Contoso real estate plugin for Microsoft Copilot"
description: "A tutorial to learn how to build a plugin that uses OpenAI schema for Microsoft Copilot"
urlFragment: "contoso-real-estate-plugin-for-microsoft-copilot"
---

# Learn to build a plugin that uses OpenAI schema for Microsoft Copilot - Contoso real estate

A tutorial to learn how to build this sample plugin can be found at [Get started building plugins for Microsoft Copilot](https://learn.microsoft.com/copilot-plugins/get-started).

This plugin finds properties for sale on the market. When users ask questions about real estate properties, Microsoft Copilot can use this plugin to find properties with matching criteria. The plugin uses hard-coded data to return results.

## Local development

1.  Clone this repository.
1.  Navigate to the `contoso-real-estate` directory: `cd contoso-real-estate`.
1.  Run `npm install` to install dependencies.
1.  Start the server with `node server.js`. The server starts on port `8080`
1.  Test the API, for example by sending a request to `http://localhost:8080/get-listings?city=Paris&bedrooms=3`.

## Testing the plugin

Sideload the plugin in Bing [bing.com/chat](https://bing.com/chat) by following the instructions in [Sideload and test plugins (Private Preview)](https://learn.microsoft.com/copilot-plugins/test-debug/sideload-test-plugins).
