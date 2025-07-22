console.log('Renderer Loaded')

// You can call your backend API here
fetch('http://localhost:5000/api/posts')
  .then(res => res.json())
  .then(data => {
    console.log('Fetched posts:', data)
    const status = document.getElementById('status')
    status.innerText = 'Loaded ' + data.length + ' posts from backend.'
  })
  .catch(err => {
    console.error(err)
    const status = document.getElementById('status')
    status.innerText = 'Failed to connect to backend.'
  })
