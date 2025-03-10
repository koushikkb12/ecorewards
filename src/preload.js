const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (channel, data) => ipcRenderer.send(channel, data),
  onMessage: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)),
});