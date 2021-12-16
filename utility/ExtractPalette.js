const extractImageData = (imgSrc) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    let img = new Image;
    img.src = imgSrc;
    img.crossOrigin = '';
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        context.drawImage(img, 0, 0);

        const data = context.getImageData(0, 0, img.width, img.height).data;
        console.log(data);
        return data;
    }
}

export { extractImageData };