import Vue from 'vue'
import { AbsAudioPlayer } from './AbsAudioPlayer'
import { AbsDownloader } from './AbsDownloader'
import { AbsFileSystem } from './AbsFileSystem'
import { AbsDatabase } from './AbsDatabase'
import { AbsLogger } from './AbsLogger'

// Detect Samsung Tizen TV via the injected tizen API object;
// fall back to webOS for everything else.
const platform = (typeof window !== 'undefined' && typeof window.tizen !== 'undefined') ? 'tizen' : 'webos'

Vue.prototype.$platform = platform
document.documentElement.dataset.platform = platform

const savedZoom = localStorage.getItem('webos-zoom')
if (savedZoom) document.documentElement.style.fontSize = (parseFloat(savedZoom) * 20) + 'px'

export { AbsAudioPlayer, AbsDownloader, AbsFileSystem, AbsLogger, AbsDatabase }
