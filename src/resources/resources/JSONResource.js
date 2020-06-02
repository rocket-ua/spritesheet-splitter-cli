import DataResource from "../DataResource";
import FileReader from "filereader";

export default class JSONResource extends DataResource {
    constructor(name, srcData, data) {
        super(name, srcData, data);
    }

    _parseData() {
        if (this._data) {
            this._textures = [
                {
                    name: this.data.meta.image,
                    size: this.data.meta.size
                }
            ];

            if (Array.isArray(this.data.frames)) {
                this.data.frames.forEach((spriteSrcData) => {
                    this._sprites[spriteSrcData.filename] = {
                        frame: spriteSrcData.frame,
                        rotated: spriteSrcData.rotated,
                        trimmed: spriteSrcData.trimmed,
                        spriteSourceSize: spriteSrcData.spriteSourceSize,
                        sourceSize: spriteSrcData.sourceSize,
                        scale: {
                            x: +this.data.meta.scale,
                            y: +this.data.meta.scale
                        },
                        rotation: spriteSrcData.rotated ? -90 : 0,
                        textureName: this.data.meta.image
                    }
                });
            } else {
                for (let spriteName in this.data.frames) {
                    if (this.data.frames.hasOwnProperty(spriteName)) {
                        let spriteSrcData = this.data.frames[spriteName];
                        this._sprites[spriteName] = {
                            frame: spriteSrcData.frame,
                            rotated: spriteSrcData.rotated,
                            trimmed: spriteSrcData.trimmed,
                            spriteSourceSize: spriteSrcData.spriteSourceSize,
                            sourceSize: spriteSrcData.sourceSize,
                            scale: {
                                x: +this.data.meta.scale,
                                y: +this.data.meta.scale
                            },
                            rotation: spriteSrcData.rotated ? -90 : 0,
                            textureName: this.data.meta.image
                        }
                    }
                }
            }
        }
    }

    _parseSrcData() {
        if (this._srcData) {
            console.log(`[JSONResource] Start prepare data ${this._name}`);
            this._type = this._srcData.type;
            let fileReader = new FileReader();
            fileReader.addEventListener('load', (event) => {
                this.data = JSON.parse(event.target.result);
                this._ready = true;
                console.log(`[JSONResource] Prepare data complete ${this._name}`);
                this.emit('loaded');
            }, false);
            fileReader.readAsText(this._srcData);
        }
    }
}
