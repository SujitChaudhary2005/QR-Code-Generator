document.getElementById('qrForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const websiteName = document.getElementById('websiteName').value;
    const URL = document.getElementById('URL').value;
  
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ websiteName, URL }),
      });
      const result = await response.json();
  
      if (response.ok) {
        document.getElementById('result').innerHTML = `
          <div>
            <h3>QR Code Generated!</h3>
            <p>URL: ${URL}</p>
            <img src="${result.imagePath}" alt="QR Code" class="qr-image">
            <a href="${result.imagePath}" download="${websiteName}.png" class="btn btn-secondary mt-2">Download QR Code</a>
          </div>
        `;
      } else {
        document.getElementById('result').innerHTML = `<div class="alert alert-danger">${result.error}</div>`;
      }
    } catch (error) {
      document.getElementById('result').innerHTML = `<div class="alert alert-danger">An error occurred: ${error.message}</div>`;
    }
  });  