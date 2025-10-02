import React, { useState, useRef } from 'react';
import uploadService from '../api/uploadService';

const ImageUpload = ({ onImageUpload, currentImageUrl, loading }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImageUrl || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    try {
      setUploading(true);
      setError('');
      
      const response = await uploadService.uploadImage(file);
      setPreview(response.imageUrl);
      
      if (onImageUpload) {
        onImageUpload(response.imageUrl);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
      setPreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreview('');
    if (onImageUpload) {
      onImageUpload('');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!loading && !uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        Product Image
      </label>

      {/* Upload Area */}
      <div
        onClick={handleClick}
        style={{
          border: `2px dashed ${error ? '#dc3545' : '#ddd'}`,
          borderRadius: '8px',
          padding: '20px',
          textAlign: 'center',
          cursor: loading || uploading ? 'not-allowed' : 'pointer',
          backgroundColor: loading || uploading ? '#f8f9fa' : 'white',
          opacity: loading || uploading ? 0.6 : 1,
          transition: 'all 0.2s ease',
          minHeight: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          if (!loading && !uploading) {
            e.target.style.borderColor = '#007bff';
            e.target.style.backgroundColor = '#f8f9fa';
          }
        }}
        onMouseLeave={(e) => {
          if (!loading && !uploading) {
            e.target.style.borderColor = '#ddd';
            e.target.style.backgroundColor = 'white';
          }
        }}
      >
        {preview ? (
          <div style={{ position: 'relative', width: '100%' }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '200px',
                borderRadius: '4px',
                objectFit: 'cover'
              }}
            />
            {!loading && !uploading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveImage();
                }}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Remove image"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          <div>
            {uploading ? (
              <div>
                <div style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  border: '2px solid #f3f3f3',
                  borderTop: '2px solid #007bff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginBottom: '10px'
                }}></div>
                <p style={{ margin: 0, color: '#666' }}>Uploading...</p>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>📷</div>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  Click to upload image
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={loading || uploading}
      />

      {/* Error message */}
      {error && (
        <div style={{
          color: '#dc3545',
          fontSize: '14px',
          marginTop: '5px'
        }}>
          {error}
        </div>
      )}

      {/* Upload instructions */}
      {!preview && !error && (
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '5px'
        }}>
          Supported formats: JPG, PNG, GIF, WebP
        </div>
      )}

      {/* Add CSS for loading animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;
