import * as chokidar from 'chokidar'

chokidar.watch('.', { ignored: /[\/\\]\./ }).on('all', (event, path) => {
    console.log(event, path)
})
