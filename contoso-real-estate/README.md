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
description: "A tutorial to learn how to build an API plugin for Microsoft Copilot"
urlFragment: "contoso-real-estate-plugin-for-microsoft-copilot"
---
# Learn to build an API plugin for Microsoft Copilot - Contoso real estate

A tutorial to learn how to build this sample API plugin can be found at [Get started building an API plugin for Microsoft Copilot](https://learn.microsoft.com/copilot-plugins/get-started).

This API plugin finds properties for sale on the market. When the user asks a question about real estate properties, Microsoft Copilot can use this plugin to find properties that have matching criteria. The plugin uses hard-coded data to return results.

## Local development

1.  Clone this repository.
1.  At a command prompt, change to the `contoso-real-estate` directory: `cd contoso-real-estate`.
1.  Run `npm install` to install dependencies.
1.  Start the server with `node server.js`. The server starts on port `8080`.
1.  Test the API, such as by sending a request to `http://localhost:8080/get-listings?city=Paris&bedrooms=3`.

## Testing the plugin

To use and test this API plugin in Copilot in Bing, see [Test and debug an API plugin](https://learn.microsoft.com/copilot-plugins/test-debug/sideload-test-plugins).
