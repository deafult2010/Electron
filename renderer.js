const versionEl = document.querySelector('#version')
const countEl = document.querySelector('#count');
const { ipcRenderer } = require('electron')

ipcRenderer.on('window-count', (event, props) => {
    countEl.textContent = props.count;
})

ipcRenderer.send('get-window-count')

document.querySelector('#new-window').addEventListener('click', () => {
    ipcRenderer.send('create-window', {
        x: 0,
        y: 0
    });
})

versionEl.innerText = process.versions.electron;

console.log(process.versions)