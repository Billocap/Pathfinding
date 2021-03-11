function datafromsource(image: HTMLImageElement) {
    const context = document.createElement("canvas").getContext("2d");

    context.canvas.width = image.width;
    context.canvas.height = image.height;

    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
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

export {datafromsource, mapfromimage};