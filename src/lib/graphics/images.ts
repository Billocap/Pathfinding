async function loadImage(source: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        
        img.onload = e => resolve(e.target as HTMLImageElement);
        img.onerror = reject;

        img.src = source;
    });
}

function datafromsource(image: HTMLImageElement) {
    const context = document.createElement("canvas").getContext("2d");

    context.canvas.width = image.width;
    context.canvas.height = image.height;

    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
}

function datafromtile(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
    const context = document.createElement("canvas").getContext("2d");

    context.canvas.width = image.width;
    context.canvas.height = image.height;

    context.drawImage(image, 0, 0);

    return context.getImageData(x, y, width, height);
}

function mapfromimage(image: ImageData): [number[], string[]] {
    const palette: string[] = [];
    const result: number[] = [];

    for (let index = 0; index < image.data.length; index+=4) {
        const [r, g, b, a] = Array.from(image.data.slice(index, index + 4));

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

function canvasfromtile(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
    const canvas = document.createElement("canvas");

    canvas.width  = width;
    canvas.height = height;

    canvas.getContext("2d").putImageData(datafromtile(image, x, y, width, height), 0, 0);

    return canvas;
}

export {datafromsource, datafromtile, mapfromimage, loadImage, canvasfromtile};