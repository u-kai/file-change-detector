"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar = require("chokidar");
chokidar.watch('.', { ignored: /[\/\\]\./ }).on('change', (event, path) => {
    console.log(event, path);
});
