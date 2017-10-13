import Settings from './module/Settings.js';
import EventHandler from './EventHandler.js';
import WidescreenMode from './module/WidescreenMode';

class P0weruser {
    constructor() {
        P0weruser.addStyles();
        this.eventHandler = new EventHandler();
        this.modules = this.getModules();
        this.settings = new Settings(this);

        // Load activated modules
        this.loadModules();
    }

    static addStyles() {
        // FontAwesome (Icons)
        let fa = document.createElement('link');
        fa.type = 'text/css';
        fa.rel = 'stylesheet';
        fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
        document.getElementsByTagName('head')[0].appendChild(fa);
    }

    loadModules() {
        let activated = this.getActivatedModules();

        for (let i = 0; i < activated.length; i++) {
            this.modules[activated[i]].load();
        }
    }

    getModules() {
        if (!this.modules) {
            this.modules = {
                'WidescreenMode': new WidescreenMode()
            };
        }

        return this.modules;
    }

    getActivatedModules() {
        return JSON.parse(window.localStorage.getItem('activated_modules'));
    }


    saveActivatedModules(selection) {
        window.localStorage.setItem('activated_modules', JSON.stringify(selection));
    }
}

window.p0weruser = new P0weruser();
