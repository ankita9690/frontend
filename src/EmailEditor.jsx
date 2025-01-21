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
<h1 style={{ textAlign: 'center', color: '#333', fontSize: '2em', marginBottom: '20px' }}>Email Builder</h1>

<div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Title:</label>
        <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} 
        />
    </div>
    
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Header:</label>
        <input 
            type="text" 
            value={header} 
            onChange={(e) => setHeader(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} 
        />
    </div>
    
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Content:</label>
        <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', height: '150px' }} 
        />
    </div>
    
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Footer:</label>
        <input 
            type="text" 
            value={footer} 
            onChange={(e) => setFooter(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} 
        />
    </div>
    
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Upload Logo image:</label>
        <input 
            type="file" 
            onChange={handleImageUpload} 
            style={{ padding: '10px', borderRadius: '5px', fontSize: '16px' }} 
        />
    </div>
    
    {imageUrl && (
        <div style={{ marginBottom: '15px', textAlign: 'center' }}>
            <img src={imageUrl} alt="Uploaded Preview" width="200" style={{ borderRadius: '8px', border: '1px solid #ddd' }} />
        </div>
    )}
    
    <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>URL:</label>
        <input 
            type="text" 
            value={imageUrll} 
            onChange={(e) => setImageUrll(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} 
        />
    </div>

    <button 
        onClick={handleSubmit} 
        style={{
            width: '100%', 
            padding: '15px', 
            backgroundColor: '#007BFF', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '5px', 
            fontSize: '16px', 
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
    >
        Generate Email Template
    </button>
</div>

        </div>
    );
}

export default EmailEditor;
