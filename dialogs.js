const { dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindow) {
    dialog.showMessageBox(browserWindow, {
        type: 'info',
        icon: nativeImage.createFromPath('./smile.png'),
        message: 'Hello',
        detail: 'Just a friendly meow.',
        buttons: ['Meow', 'Close'],
        defaultId: 0
    }).then(res => {
        console.log(res);
    });
}

function showSaveDialog(browsereWindow) {
    dialog.showSaveDialog(browsereWindow, {
        defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt')
    }).then(async filename => {
        if (filename) {
            const processMemoryInfo = await process.getProcessMemoryInfo();
            const memInfo = JSON.stringify(processMemoryInfo, null, 2);
            console.log(processMemoryInfo)
            fs.writeFile(filename.filePath, memInfo, 'utf8', (err) => {
                if (err) {
                    dialog.showErrorBox('Save Failed.', err.message)
                }
            })
        }
    })
}

function showOpenDialog(browsereWindow) {
    dialog.showOpenDialog(browsereWindow, {
        defaultPath: app.getPath('downloads'),
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    }).then(res => {
        if (res) {
            // console.log(res.filePaths)
            console.log(res.filePaths, fs.readFileSync(res.filePaths[0], 'utf8'))
        }
    })
}