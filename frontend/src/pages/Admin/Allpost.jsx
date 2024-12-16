import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function Allpost() {
    // Initial post data (could be fetched from an API)
    const initialPosts = [
        { id: 1, name: 'Greta Ahma', title: 'Professor', salary: '1500$', image: '/images/image1.jpg' },
        { id: 2, name: 'Alma Novobërdaliu', title: 'Assistant', salary: '1200$', image: '/images/image2.jpg' },
        { id: 3, name: 'Rreze Rexhepi', title: 'Assistant', salary: '1200$', image: '/images/image3.jpg' },
    ];

    const [posts, setPosts] = useState(initialPosts);

    // Handle Delete
    const handleDelete = (postId) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
    };

    // Handle Update
    const handleUpdate = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                // For demonstration, we'll just update the salary and title
                return { ...post, title: 'Updated Title', salary: '2000$' };
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    return (
        <div className='container'>
            <h1 className="text-center mb-4 text-white">All posts</h1>
            <div className='row'>
                {posts.map(post => (
                    <div key={post.id} className='col-md-4 mb-4 col-lg-4 col-12'>
                        <div className="card h-100">
                            <img 
                                src={post.image} 
                                className="card-img-top img-fluid"
                                alt={post.name}
                            />
                            <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                <h5 className="card-title">{post.name}</h5>
                                <p className="card-text">{post.title}</p>
                                <p className="card-text">{post.salary}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button 
                                    className="btn custom-btn-delete"
                                    onClick={() => handleDelete(post.id)} // Delete action
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                                <button 
                                    className="btn custom-btn-update"
                                    onClick={() => handleUpdate(post.id)} // Update action
                                >
                                    <FaEdit /> Update
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}



