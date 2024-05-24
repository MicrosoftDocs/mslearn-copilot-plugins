# Learn to build an API plugin for Microsoft Copilot - INCOMPLETE Contoso real estate plugin

This directory contains an incomplete sample API plugin for Microsoft Copilot. The complete sample can be found in the `contoso-real-estate` directory instead.

Use this sample as a starting point to build your own API plugin for Microsoft Copilot.

To learn to build a plugin from scratch, see [Get started building an API plugin for Microsoft Copilot](https://learn.microsoft.com/copilot-plugins/get-started).

To learn to build a plugin by starting from this incomplete sample, follow the steps below.

## Set up the coding environment

1. Fork this repository. To learn how to fork a repository, see [Fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo).

1. In the forked repository page, on github.com, create a new branch to work on the plugin.
  
   Click the branch selector drop-down menu, which is set to **main**, and type a name for the new branch, for example **tutorial**. Then, click **Create branch: tutorial**.

1. Start a codespace to work on the project without having to clone it on your local device.

   Click the **Code** drop-menu menu, and then click **Create codespace on tutorial**. A new browser tab opens with the codespace.

   To learn more about codespace, see [Start coding instantly with Codespaces](https://github.com/features/codespaces).

1. In the **Terminal** panel, type `cd contoso-real-estate-incomplete` and press <kbd>Enter</kbd>.

1. To install the required project dependencies, type `npm install` and press <kbd>Enter</kbd>.

## Test the existing API

You can now test the API code that's already in the project. The API endpoint is implemented in `server.js`, which is a JavaScript file that runs by using Node.js. The Express framework is used to run the web server where the API endpoint is exposed.

To test the API:

1. In the **Terminal** panel, type `node server.js` and press <kbd>Enter</kbd>.

   The server now runs in the codespace, on port 8080, and a notification appears in the lower right corner of the codespace, informing you that your application is running on port 8080.

1. To make the port accessible to the internet, in the notification, click **Make Public**.

1. Open the **Ports** panel at the bottom of the codespace. The URL where your server is running is listed. Copy the URL.

1. Open a new browser tab, enter the URL you copied but add `get-listings?city=paris` at the end of the URL. Press <kbd>Enter</kbd>. The API response is displayed.

Your API endpoint is ready.

## Write the API specification

Building an API plugin for Microsoft Copilot requires three things:

* An API, which you now have.
* An API specification file.
* A plugin manifest file.

Let's create the API specification file.

The goal of the API specification file is to document your API. Microsoft Copilot needs to know where the API is, and what requests your API can handle. It needs to know how to send request parameters, and how to read responses. The API spec is a way for the LLM that powers Microsoft Copilot to know how to use your API.

To document your API, write a specification that follows the OpenAPI<!-- todo: global: check usage of "OpenAPI" --> schema. Most APIs use the OpenAPI schema. It's a standard way to document APIs for people and computers to know how to access APIs.

Use Microsoft Copilot to help you generate the text content for your OpenAPI specification:

1. In a new browser tab, go to [Microsoft Copilot](https://copilot.microsoft.com).

1. Ask Microsoft Copilot to generate the OpenAPI spec by entering the following question in the text box at the bottom:

   Generate an OpenAPI YAML specification for my API. My API is implemented with Express, in NodeJS. Here is the endpoint implementation:

   app.get("/get-listings", (req, res) => {
     const city = req.query.city;
     const bedrooms = parseInt(req.query.bedrooms);
     const bathrooms = parseInt(req.query.bathrooms);
     const amenities = req.query.amenities;

     try {
       const listings = getListings(city, bedrooms, bathrooms, amenities);
       res.send(listings);
     } catch (e) {
       res.status(400).send({ error: e.message });
     }
   });

1. Click **Submit**. Microsoft Copilot generates some OpenAPI YAML content for you.

1. Copy the generated content and, in your codespace, paste it in a new file named `openapi.yaml`.

1. Edit and add the following content in the `openapi.yaml` file:

   * Make sure the `title` and `description` fiels describe your API well. Microsoft Copilot uses these fields to know when and how to use your plugin.
   * Change the `servers.url` field to match the URL you copied from the **Ports** panel.
   * Add an `operationId` field to the `get-listings` operation. The value of the `operationId` field should be a string, for example `getListings`.
   * Make all parameters optional by setting their `required` property to `false`, and check their descriptions are detailed enough for Microsoft Copilot to know how to use them.
   * Change the `responses` field to match what your API returns.

   The `openapi.yaml` file should look like this:
  
   ```yaml
   openapi: "3.0.0"
   info:
     version: "1.0.0"
     title: "Contoso Real Estate API"
     description: "Find up to date and detailed real estate properties for sale on the market"
   servers:
     - url: https://abcde-fghijk-abc123def456-8080.app.github.dev/
   paths:
     /get-listings:
       get:
         operationId: getListings
         summary: "Get a list of properties for sale that match the specified criteria"
         description: "Returns a list of properties, optionally filtered by providing the city, number of bedrooms, number of bathrooms and a list of amenities as query parameters."
         parameters:
           - name: "city"
             in: "query"
             description: "City of the listing"
             required: false
             schema:
               type: "string"
           - name: "bedrooms"
             in: "query"
             description: "Number of bedrooms in the listing"
             required: false
             schema:
               type: "integer"
           - name: "bathrooms"
             in: "query"
             description: "Number of bathrooms in the listing"
             required: false
             schema:
               type: "integer"
         responses:
           '200':
             description: "Successful operation"
             content:
               application/json:
                 schema:
                   type: "array"
                   items:
                     type: object
                     properties:
                       title:
                         type: string
                         description: The title of the property listing
                       city:
                         type: string
                         description: The city of the property
                       bedrooms:
                         type: integer
                         description: The number of bedrooms
                       bathrooms:
                         type: integer
                         description: The number of bathrooms
                       description:
                         type: string
                         description: The description of the property
   ```

## Make the API spec available on your server

Microsoft Copilot needs to have access to the OpenAPI spec file for your API. To make the file available:

1. In your codespace, open the `server.js` file.

1. Import the Node.js built-in `path` module by adding the following `import` statement at the top:

   ```js
   import path from "path";
   ```

1. Add the following Express request handler before the `app.listen(8080);` line:

   ```js
   app.get("/openapi.yaml", (req, res) => {
     res.sendFile(path.resolve() + "/openapi.yaml");
   });
   ```

1. Save the file.

1. Restart your server. To do this, in the **Terminal** panel, press <kbd>Ctrl+C</kbd>, type `node server.js`, and then press <kbd>Enter</kbd>.

1. In a new tab, open the URL where your server is running, and add `openapi.yaml` at the end of the URL. Press <kbd>Enter</kbd>. The OpenAPI spec file is displayed.

## Write the plugin manifest

The third, and final, part of your plugin is the plugin manifest.

The manifest is a natural language description of the plugin. You don't need to write more code for the plugin to work. Instead, write a natural language description of the what the plugin does in the manifest. The LLM that powers Microsoft Copilot will know when and how to use your plugin based on the description in the manifest.

To create a manifest file:

1. Create a new file named `ai-plugin.json` in your codespace.

1. Paste the following content in the file and then save the file:

   ```json
   {
     "schema_version": "v1",
     "name_for_model": "contosorealestate",
     "description_for_model": "Plugin for finding properties for sale. Use it whenever a user asks about real estate properties for sale on the market. It can be used to search for properties in a particular city, and with a given number of bedrooms or bathrooms.",
     "name_for_human": "Contoso Real Estate",
     "description_for_human": "Find up to date and detailed real estate properties for sale on the market",
     "api": {
       "type": "openapi",
       "url": "http://abcde-fghijk-abc123def456-8080.app.github.dev/openapi.yaml",
       "is_user_authenticated": false
     },
     "auth": {
       "type": "none"
     },
     "logo_url": "http://abcde-fghijk-abc123def456-8080.app.github.dev/logo.png",
     "contact_email": "contact@contoso.com",
     "legal_info_url": "https://contoso.com/legal/"
   }
   ```

   Replace `http://abcde-fghijk-abc123def456-8080.app.github.dev/` with the URL you copied from the **Ports** panel.

   The properties used in the code snippet above are documented in [Get started building an API plugin for Microsoft Copilot](https://learn.microsoft.com/copilot-plugins/get-started#create-the-plugin-manifest)

## Make the plugin manifest available on your server

Microsoft Copilot needs to have access to the plugin manifest file for your plugin. To make the file available:

1. In your codespace, open the `server.js` file.

1. Add the following Express request handler before the `app.listen(8080);` line:

   ```js
   app.get("/.well-known/ai-plugin.json", (req, res) => {
     res.sendFile(path.resolve() + "/ai-plugin.json");
   });

   app.get("/logo.png", (req, res) => {
     res.sendFile(path.resolve() + "/logo.png");
   });
   ```

   The `ai-plugin.json` file must be located at the `/.well-known/ai-plugin.json` path on your server. The above code snippet also makes the `logo.png` file available to download, since your manifest file references it.

1. Save the file.

1. Restart your server. To do this, in the **Terminal** panel, press <kbd>Ctrl+C</kbd>, type `node server.js`, and then press <kbd>Enter</kbd>.

1. In a new tab, open the URL where your server is running, and add `.well-known/ai-plugin.json` at the end of the URL. Press <kbd>Enter</kbd>. The plugin manifest file is displayed.

Your plugin is ready and you can now sideload it in Microsoft Copilot.

## Allow Bing to access your API

To test your plugin, you sideload it in Bing. But, for Bing to be able to access your API, you need to allow it to do so. To grand Bing access to your plugin, use CORS:

1. In your codespace, stop the server by pressing <kbd>Ctrl+C</kbd> in the **Terminal** panel.

1. Add the CORS middleware to your server by typing `npm install cors` in the **Terminal** panel and pressing <kbd>Enter</kbd>.

1. Open the `server.js` file and import the CORS middleware by adding the following line at the top of the file:

   ```js
   import cors from "cors";
   ```

1. Add the following line after the `const app = express();` line:

   ```js
   app.use(cors({ origin: "https://www.bing.com" }));
   ```

1. Save the file and restart the server.

## Sideload your plugin in Bing

**Sideloading plugins in Copilot in Bing is in private preview and is not broadly available yet. The user interface and the steps in this guide may change during the preview period.**

To use and test your plugin, see [Sideload your API plugin in Copilot in Bing](https://learn.microsoft.com/copilot/plugins/test-debug/sideload-test-plugins#sideload-your-api-plugin-in-copilot-in-bing) in _Test and debug an API plugin_.
