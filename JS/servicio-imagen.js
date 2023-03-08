const imageUploader = document.getElementById('Foto');
console.log(imageUploader);

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dsgjfinqe/image/upload`
const CLOUDINARY_UPLOAD_PRESET = 'm9qjkuja';

imageUploader.addEventListener('change', async (e) => {
    // console.log(e);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    // Send to cloudianry
    const res = await axios.post(
        CLOUDINARY_URL,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }
    );
    console.log(res.data.secure_url);
    localStorage.setItem('imagen',res.data.secure_url)
});