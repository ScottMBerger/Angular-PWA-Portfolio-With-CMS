# Intro

This project was designed to create an easy to configure and customize portfolio site for anyone to use. None of the source files need to be changed to configure a unique presentation for the site.

This is the similar idea of using a CMS but all configuration data being stored in the manifest.json file allows you to serve this data from any source you would like as long as the manifest.json is formed in the correct way.

The project is configured to retrieve the manifest.json from their Dropbox folder.

With the project setup this way, two sites can be serving the same project folder and look completely different by changing the nginx to direct to a different manifest.json file. Along with this, the project is already using the manifest.json for the PWA configuration enabling it takes no additional overhead.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Change the proxy.config.json to load the manifest file of your choice.

## Production deployment

Run `npm run build` ideally you would use pm2 or similar to run the server.js file and to keep a live watch of the project.
Configure your server to reverse proxy to the port (3000 by default)
Make sure to configure your server to forward proxy to your manifest file.
-- [Example nginx config file](https://github.com)

## Live sites using this project

[https://scottb.app](https://scottb.app)
[https://tessamberger.com](https://tessamberger.com)
