import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DuoVibeCreate = () => {
  const [posts, setPosts] = useState([]);
  const [post1, setPost1] = useState('');
  const [post2, setPost2] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load user's posts to select from
    axios.get('/api/posts/user/me') // Adjust API if needed
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post1 === post2) {
      setMessage('Please select two different posts');
      return;
    }
    try {
      const res = await axios.post('/api/duovibes', { post1, post2 });
      setMessage('DuoVibe created successfully!');
    } catch (err) {
      setMessage('Error creating DuoVibe');
    }
  };

  return (
    <div>
      <h2>Create DuoVibe</h2>
      <form onSubmit={handleSubmit}>
        <select value={post1} onChange={e => setPost1(e.target.value)} required>
          <option value="">Select Post 1</option>
          {posts.map(post => <option key={post._id} value={post._id}>{post.caption || post._id}</option>)}
        </select>
        <select value={post2} onChange={e => setPost2(e.target.value)} required>
          <option value="">Select Post 2</option>
          {posts.map(post => <option key={post._id} value={post._id}>{post.caption || post._id}</option>)}
        </select>
        <button type="submit">Create DuoVibe</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default DuoVibeCreate;
