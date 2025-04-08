# Fab Region Bergisches Städtedreieck


This repository contains the source code (not the actual content) for the [website of "Fab Region Bergisches Städtedreieck"](https://www.fab-bergisch.org/). It was paid for by [CSCP gGmbH](https://www.cscp.org) and built by [bitbetter GmbH](https://www.bitbetter.de). This project builds on top of multiple existing projects:

- [Kirby CMS](https://getkirby.com) (This is the CMS behind the website – it is NOT an open-source project but requires proprietary license)
- [FCOS Suite UI](https://gitlab.fabcity.hamburg/fcos-suite/fcos-suite-ui) (This is a UI component library for React. It was built as an Open Source project during the [2023 EU Interfacer project](https://www.interfacerproject.eu/) for [Fab City Hamburg](https://www.fabcity.hamburg))
- [FCOS Suite Map](https://gitlab.fabcity.hamburg/fcos-suite/fcos-suite-map) (This is a interactive React Map component based on Mapbox. Just like the UI components it was built during the [2023 EU Interfacer project](https://www.interfacerproject.eu/) for [Fab City Hamburg](https://www.fabcity.hamburg))
- [Inertia Adapter](https://plugins.getkirby.com/tobimori/inertia) (This plugin allows us to combine the existing React comoponents with Kirby CMS)

## Development Setup
> [!IMPORTANT]
> This project requires PHP (>8.2) and Node.js – both of these need to be installed for the following instructions to work correctly. For the PHP part, we recommend to use [Laravel Herd](https://herd.laravel.com/).
- Clone the repository and switch into the new folder
- Run `composer install` to install all PHP dependencies (i.e. Kirby and the Inertia Adapter)
- Run `npm run build` to build the frontend components once
- Run `npm run dev` to start the development server. It should print a link to your console, where you can open the frontend in your browser (e.g. `localhost:5173`).