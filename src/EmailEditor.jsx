import React, { useState } from 'react';

function EmailEditor() {
    const [title, setTitle] = useState('');
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [footer, setFooter] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageUrll, setImageUrll] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    
    // Set your backend URL here (Render backend URL)
    const backendURL = 'https://backend-7gc8.onrender.com';  // Replace with your backend URL

    // Handle image upload
    const handleImageUpload = async (event) => {
        const formData = new FormData();
        formData.append('image', event.target.files[0]);

        const response = await fetch(`${backendURL}/uploadImage`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setImageUrl(data.imageUrl);  // Set the image URL returned by the backend
    };

    // Handle form submission to upload email configuration
    const handleSubmit = async () => {
        const emailConfig = {
            title,
            header,
            content,
            footer,
            imageUrl,
            imageUrll
        };

        const response = await fetch(`${backendURL}/uploadEmailConfig`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailConfig),
        });

        if (response.ok) {
            const blob = await response.blob();
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'output.html';
            link.click();
        }
    };

    return (
        <div>
            <h1>Email Builder</h1>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Header:</label>
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>Footer:</label>
                <input type="text" value={footer} onChange={(e) => setFooter(e.target.value)} />
            </div>
            <div>
                <label>Upload Image:</label>
                <input type="file" onChange={handleImageUpload} />
            </div>
            {imageUrl && <div><img src={imageUrl} alt="Uploaded Preview" width="200" /></div>}
            <div>
                <label>Image URL:</label>
                <input type="text" value={imageUrll} onChange={(e) => setImageUrll(e.target.value)} />
            </div>
            <button onClick={handleSubmit}>Generate Email</button>
        </div>
    );
}

export default EmailEditor;
