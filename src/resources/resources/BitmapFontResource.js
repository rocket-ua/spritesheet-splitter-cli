import DataResource from "../DataResource";
import FileReader from "filereader";
import xml2js from "xml2js";

export default class BitmapFontResource extends DataResource {
    constructor(name, srcData, data) {
        super(name, srcData, data);
    }

    _parseData() {
        if (this._data) {
            console.log(JSON.stringify(this._data));

            return;
            this._textures = [];
            let common = this._data.getElementsByTagName('common')[0];

            let pages = this._data.getElementsByTagName('pages')[0];
            for (let i = 0; i < pages.children.length; i++) {
                this._textures[pages.children[i].getAttribute('id')] =
                    {
                        name: pages.children[i].getAttribute('file'),
                        size: {
                            w: undefined,
                            h: undefined
                        }
                    }
            }

            let chars = this._data.getElementsByTagName('chars')[0];
            for (let i = 0; i < chars.children.length; i++) {
                let spriteSrcData = chars.children[i];
                this._sprites[spriteSrcData.getAttribute('id').toString()] = {
                    frame: {
                        x: +spriteSrcData.getAttribute('x'),
                        y: +spriteSrcData.getAttribute('y'),
                        w: +spriteSrcData.getAttribute('width'),
                        h: +spriteSrcData.getAttribute('height')
                    },
                    rotated: false,
                    trimmed: false,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: +spriteSrcData.getAttribute('width'),
                        h: +spriteSrcData.getAttribute('height')
                    },
                    sourceSize: {
                        w: +spriteSrcData.getAttribute('width'),
                        h: +spriteSrcData.getAttribute('height')
                    },
                    scale: {
                        x: (+common.getAttribute('scaleW') || 1),
                        y: (+common.getAttribute('scaleH') || 1)
                    },
                    textureName: this._textures[+spriteSrcData.getAttribute('page')].name
                }
            }
        }
    }

    _parseSrcData() {
        if (this._srcData) {
            console.log(`[BitmapFontResource] Start prepare data ${this._name}`);
            this._type = this._srcData.type;
            let fileReader = new FileReader();
            fileReader.addEventListener('load', (event) => {
                xml2js.parseString(event.target.result, (err, result) => {
                    this.data = result;
                    this._ready = true;
                    console.log(`[BitmapFontResource] Prepare data complete ${this._name}`);
                    this.emit('loaded');
                })
            }, false);
            fileReader.readAsText(this._srcData);
        }
    }
}
