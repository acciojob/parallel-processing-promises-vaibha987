const imageUrls = [
    { url: 'https://picsum.photos/id/237/200/300' },
    { url: 'https://picsum.photos/id/238/200/300' },
    { url: 'https://picsum.photos/id/239/200/300' },
   // { url: 'https://invalid-url.com/404' }  // This is an invalid URL for testing
];
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');

        img.src = image.url;

        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
}
function downloadImages(imageUrls) {
    const downloadPromises = imageUrls.map(downloadImage);

    Promise.all(downloadPromises)
        .then((images) => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';

            images.forEach((img) => {
                outputDiv.appendChild(img);
            });
        })
        .catch((error) => {
            console.error(error);
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = `<p style="color:red;">${error}</p>`;
        });
}
document.getElementById('download-images-button').addEventListener('click', () => {
    downloadImages(imageUrls);
});
