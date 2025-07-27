Clone the project from github or download from zip
Step 1 : Go to Project Main Folder
Step 2 : npm install (to install necessary dependency for this project)
Step 3 : shopify app deploy : To build any configurations changes 
    step 3.1: Release a new version of display-products?
	    No, Cancel 
Step 4: npm run dev : To run the project
	it gives you preview URL : copy and hit paste into logged in shopify store and partner store.  

change the app store configuration from 'shopify.app.toml' file  

client_id = "YOUR CLIENT ID"
name = "display-products"
handle = "display-products"
application_url = "https://regional-broadcasting-herbs-weekends.trycloudflare.com"
embedded = true

[build]
include_config_on_deploy = true
automatically_update_urls_on_dev = true

[webhooks]
api_version = "2025-07"

[access_scopes]
scopes = "read_products,write_products,read_orders,read_customers"





