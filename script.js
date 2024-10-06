// Example array of image URLs
const imageUrls = [
    { url: 'https://via.placeholder.com/150' },
    { url: 'https://via.placeholder.com/200' },
    { url: 'https://via.placeholder.com/250' },
    { url: 'https://invalid-url.com/404' }  // This is an invalid URL for testing
];

// Function to download a single image
function downloadImage(image) {
    return new Promise((resolve, reject) => {
        const img = new Image();  // Create a new image element

        img.src = image.url;  // Set the source to the provided URL

        // When image is loaded, resolve the promise with the image element
        img.onload = () => resolve(img);

        // If there's an error loading the image, reject with an error message
        img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
    });
}

// Function to handle downloading and displaying images
function downloadImages(imageUrls) {
    // Create an array of promises for downloading all images
    const downloadPromises = imageUrls.map(downloadImage);

    // Wait for all promises to complete
    Promise.all(downloadPromises)
        .then((images) => {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';  // Clear the output div

            // Display all successfully downloaded images
            images.forEach((img) => {
                outputDiv.appendChild(img);  // Append each image element to the output div
            });
        })
        .catch((error) => {
            console.error(error);
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = `<p style="color:red;">${error}</p>`;  // Display the error message
        });
}

// Adding event listener to the button
document.getElementById('download-images-button').addEventListener('click', () => {
    downloadImages(imageUrls);
});
