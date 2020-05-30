import ResourceLoader from "./loader/ResourceLoader";
import Exporter from "./export/Exporter";
import ResourceManager from "./resources/ResourcesManager";
import {argv} from "yargs";
import path from "path";

export default class App {
    constructor() {
        if (argv.data && argv.out) {
            this.init();
            this.loadResources();
            this.startExport();
        } else {
            console.log('You must specify "--data" and "--out" parameters')
        }
    }

    init() {

    }

    startExport() {
        let names = [];
        let spriteSheet = ResourceManager.getSpriteSheet(path.basename(argv.data));
        spriteSheet.promise.then(() => {
            for (let param in spriteSheet.data.sprites) {
                if (spriteSheet.data.sprites.hasOwnProperty(param)) {
                    names.push(param);
                }
            }
            Exporter.exportImages('spriteSheet', names);
        });

        /*if (spriteSheet && spriteSheet.ready) {
            for (let param in spriteSheet.data.sprites) {
                if (spriteSheet.data.sprites.hasOwnProperty(param)) {
                    names.push(param);
                }
            }
            Exporter.exportImages('spriteSheet', names);
        }*/
    }

    loadResources() {
        ResourceLoader.on('allComplete', this.allResourcesLoaded, this);
        ResourceLoader.add(argv.data);
        ResourceLoader.load();
    }

    allResourcesLoaded() {

    }
}
new App();
