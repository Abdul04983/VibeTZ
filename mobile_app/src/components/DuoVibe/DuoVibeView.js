import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DuoVibeView = ({ duoVibeId }) => {
  const [duoVibe, setDuoVibe] = useState(null);

  useEffect(() => {
    axios.get(/api/duovibes/)
      .then(res => setDuoVibe(res.data))
      .catch(err => console.error(err));
  }, [duoVibeId]);

  if (!duoVibe) return <div>Loading...</div>;

  return (
    <div style={{display: 'flex', gap: '20px'}}>
      <div>
        <h3>Post 1</h3>
        <p>{duoVibe.post1.caption}</p>
        {/* Add post1 media, likes, etc */}
      </div>
      <div>
        <h3>Post 2</h3>
        <p>{duoVibe.post2.caption}</p>
        {/* Add post2 media, likes, etc */}
      </div>
    </div>
  );
};

export default DuoVibeView;
