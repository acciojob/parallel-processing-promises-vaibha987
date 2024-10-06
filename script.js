const imageUrls = [
    { url: 'https://via.placeholder.com/150' },
    { url: 'https://via.placeholder.com/200' },
    { url: 'https://via.placeholder.com/250' },
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
