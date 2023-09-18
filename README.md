# Aplicación de Gestión de Clientes

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Linkedin](https://img.shields.io/badge/linkedin-Harold%20Pacha-blue)](https://discord.gg/TFEZ7j4MZd)

Prueba Técnica - CRUD de Clientes App con React Native

## Pre Requisitos
> Tener instalado Android Studio y SDK.

> Tener instalado al menos un emulador android.

## Cómo utilizar
Esta guía describe los pasos a seguir para poder ejecutar el proyecto en un entorno local.

Abra el archivo `src/config.js` y modifique la ruta del end-point de los serviciones en GO: 

```bash
export const BASE_URL = 'http://192.168.0.3:8080/api/v1';
```
Luego ejecute los siguientes comandos para levantar el proyecto en local y le mostrará los end-points creados.

```bash
npm install
npm run android
```

> Si desea puede descargarse la app `dist/customer-management-app.apk` pero apunta a `http://192.168.0.3:8080/api/v1`

Este proyecto ha sido ejecutado con las siguientes versiones:

| Programa  | Version |
| ------------- |:-------------:|
| NodeJS      | v16.x     |
| Npm      | 8.19.4     |
| Expo      | 0.10.12     |
## Autor

[Harold Pacha](mailto:haroldpacha.rm@gmail.com)

## Licencia

Este proyecto está bajo la licencia MIT.