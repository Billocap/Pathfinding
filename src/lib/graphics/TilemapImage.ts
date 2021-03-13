import { datafromsource } from './images';

class TilemapImage {
    private _source: ImageData;
    private _palette: string[];

    constructor() {
        this._palette = [];
    }

    set source(image: HTMLImageElement) {
        this._source = datafromsource(image);
    }

    set palette(image: HTMLImageElement) {
        const palette: string[] = [];
        const data = datafromsource(image);

        for (let index = 0; index < data.data.length; index+=4) {
            const [r, g, b, a] = Array.from(data.data.slice(index, index + 4));

            const pixel = `rgba(${r},${g},${b},${a})`;

            if (!pixel.match(/rgba\(0,0,0,\d*\)/) && !palette.includes(pixel)) {
                palette.push(pixel);
            }
        }

        this._palette = palette;
    }

    get tilemap(): [number[], string[]] {
        const palette: string[] = this._palette;
        const result: number[] = [];

        for (let index = 0; index < this._source.data.length; index+=4) {
            const [r, g, b, a] = Array.from(this._source.data.slice(index, index + 4));

            const pixel = `rgba(${r},${g},${b},${a})`;

            if (!pixel.match(/rgba\(0,0,0,\d*\)/) && !palette.includes(pixel)) {
                palette.push(pixel);
            }
            
            if (!pixel.match(/rgba\(0,0,0,\d\)/)) {
                result.push(palette.indexOf(pixel));
            } else {
                result.push(-1);
            }
        }

        return [result, palette];
    }
}

export default TilemapImage;