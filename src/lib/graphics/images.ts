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

export {datafromsource, loadImage};