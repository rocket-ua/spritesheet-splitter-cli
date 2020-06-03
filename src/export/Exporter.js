import RendererExport from "../renderer/RendererExport";
import ResourcesManager from "../resources/ResourcesManager.js";
import path from "path";
import fs from "fs";
import {argv} from "yargs";

export default new class Exporter {
    constructor() {
        this._spriteSheetsData = {};
    }

    /**
     * Создать разделенные спрайты, создать массив и скачать его
     * @param spriteSheetName имя спрайтлиста для экспорта
     * @param sprites массив имен спрайтов для экспорта
     */
    exportImages(spriteSheetName, sprites) {
        //создание обекта с данными спрайтов для одного спрайтлиста
        if (!this._spriteSheetsData.hasOwnProperty(spriteSheetName)) {
            this._spriteSheetsData[spriteSheetName] = {};
        }

        //получить данные отрисованных спрайтов из спрайтлиста (по массиву имен)
        let spriteSheetData = this._spriteSheetsData[spriteSheetName];
        sprites.forEach((spriteName)=>{
            console.log(`[Exporter] Receiving sprite ${spriteName}`);
            let type = spriteName.indexOf(/(.jpg|.jpeg)/) === -1 ? 'image/png' : 'image/jpg'
            spriteSheetData[spriteName] = {
                data: RendererExport.drawSpriteToExport(spriteSheetName, spriteName, type),
                type: type
            };
            console.log(`[Exporter] Sprite received ${spriteName}`);
        });

        //создать архив
        let spriteSheet = ResourcesManager.getSpriteSheet(spriteSheetName);
        this._exportSprites(spriteSheetData, spriteSheet.name);
    }

    _exportSprites(spriteSheetData, spriteSheetName) {
        console.log(`[Exporter] Export sprite sheet ${spriteSheetName}`);
        for (let param in spriteSheetData) {
            if (spriteSheetData.hasOwnProperty(param)) {
                let exportData = spriteSheetData[param];
                let ext = exportData.type === 'image/jpg' ? '.jpg' : '.png';
                let { dir } = path.parse(param);
                let baseDirPath = path.resolve(process.cwd(), argv.out, spriteSheetName);
                fs.mkdir(path.resolve(baseDirPath, dir), { recursive: true }, (err) => {
                    if (err) throw err;
                    let filePath = path.resolve(baseDirPath, param.replace(ext, '')) + ext;
                    console.log(`[Exporter] Export file ${filePath}`);
                    fs.writeFile(filePath, this._formatURL(exportData.data), 'base64', (err) => {
                        if (err) throw err;
                    });
                });
            }
        }
    }

    _formatURL(dataURL) {
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}
