import Resource from "../Resource";
import FileReader from "filereader";
import {Image} from "canvas";

export default class TextureResource extends Resource {
    constructor(name, srcData, data) {
        super(name, srcData, data);

        this.data = new Image();
        this.data.onload = () =>{
            this._ready = true;
            this.emit('loaded');
        };
    }

    _parseSrcData(value) {
        if (this._srcData) {
            this._type = this._srcData.type;
            let fileReader = new FileReader();
            fileReader.addEventListener('load', (event) => {
                this.data.src = event.target.result;
            }, false);
            fileReader.readAsDataURL(this._srcData);
        }
    }

    get width() {
        return this.data ? this.data.width : 0;
    }

    get height() {
        return this.data ? this.data.height : 0;
    }
}
