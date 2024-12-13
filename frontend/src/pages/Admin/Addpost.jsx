import React, { useState } from 'react';
import { post } from '../../services/Endpoint'; // Assuming 'post' is defined correctly in your services/Endpoint.js
import toast from 'react-hot-toast';


export default function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload on form submit

    // Ensure data is available before sending
    if (!title || !description || !image) {
      toast.error('Please fill in all fields and upload an image');
      return;
    }

    try {
      const formData = new FormData();

      // Append data to FormData object
      if (image) {
        formData.append('postimg', image);
      }
      formData.append('title', title);
      formData.append('desc', description);

      // Log formData for debugging
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      // Make the POST request with credentials
      const response = await post('/blog/create', formData, {
        withCredentials: true,  // Ensures cookies (like authentication token) are sent with the request
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message || 'Post created successfully');
        // Reset form fields after successful post
        setTitle('');
        setImage(null);
        setDescription('');
      } else {
        toast.error(data.message || 'Failed to create post');
      }

      console.log(data);  // Log response for debugging
    } catch (error) {
      toast.error('An error occurred while submitting the post');
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Add New Post</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="postImage" className="form-label">Upload Image</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    id="image" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label">Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="postTitle" 
                    placeholder="Enter post title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postDescription" className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    id="postDescription" 
                    rows="6" 
                    placeholder="Write your post description here" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Submit Post</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
