import EventEmitter from "../event/EventEmitter";
import ResourcesManager from "../resources/ResourcesManager";
import fs from "fs";
import path from "path";
import {XMLHttpRequest} from "xhr2";

export default new class ResourceLoader extends EventEmitter {
    constructor() {
        super();
        this._inProgress = false;
        this._loaderStack = [];
        this.init();
    }

    init() {
        this.gameXHR = new XMLHttpRequest();
        this.gameXHR.addEventListener('error', this.onError.bind(this));
        //this.gameXHR.addEventListener('load', this.onLoad.bind(this));
        this.gameXHR.addEventListener('load', (event) => {
            event.target.response = this.makeResponse(event.target.responseURL, event.target.response);
            this.onLoad(event);
        });
    }

    add(url) {
        this._loaderStack.push({url: url});
    }

    load() {
        this._inProgress = true;
        let loadData = this._loaderStack.shift();
        console.log(`[ResourceLoader] Start loading: ${loadData.url}`);

        if (loadData.url.match(/(http:|https:)/)) {
            this.gameXHR.open('GET', loadData.url, true);
            this.gameXHR.responseType = "buffer";
            this.gameXHR.send();
        } else {
            let filePath = path.resolve(process.cwd(), loadData.url);
            if (!fs.existsSync(filePath)) {
                console.log(`[ResourceLoader] File not exist: ${filePath}`);
                return;
            }
            fs.readFile(path.resolve(process.cwd(), loadData.url), {}, (err, data) => {
                let event = {
                    target: {
                        response: this.makeResponse(loadData.url, data),
                        responseURL: path.resolve(process.cwd(), loadData.url)
                    }
                }
                this.onLoad(event)
            });
        }
    }

    makeResponse(url, data) {
        let type = '';
        const {name: baseName, ext: extName} = path.parse(url);
        switch (extName) {
            case '.json':
                type = 'application/json';
                break;
            case '.xml':
                type = 'text/xml';
                break;
            case '.png':
                type = 'image/png';
                break;
            case '.jpg':
            case '.jpeg':
                type = 'image/jpeg';
                break;
            case '.atlas':
                type = 'application/atlas';
                break
        }
        return {
            buffer: data,
            type: type,
            name: baseName
        }
    }

    onError(event) {
        console.log(`[ResourceLoader] Loading error`);
    }

    onLoad(event) {
        console.log(`[ResourceLoader] Loading complete: ${event.target.responseURL}`);
        this.fileLoadingComplete(event.target);
        if (this._loaderStack.length > 0) {
            this.load();
        } else {
            console.log(`[ResourceLoader] All files loaded`);
            this._inProgress = false;
            this.emit('allComplete');
        }
    }

    fileLoadingComplete(data) {
        let name = path.basename(data.responseURL);
        ResourcesManager.addResource(name, data.response);
        let extName = path.extname(data.responseURL);
        if (data.response.type === 'application/json' ||
            data.response.type === 'application/atlas' ||
            extName === '.atlas') {
            let resource = ResourcesManager.getData(name);
            resource.on('loaded', () => {
                resource.textures.forEach((textureData) => {
                    this.add(path.dirname(data.responseURL) + '/' + textureData.name);
                });
                if (!this._inProgress) {
                    this.load()
                }
            });
        }
    }

    get loaderStack() {
        return this._loaderStack;
    }
}
