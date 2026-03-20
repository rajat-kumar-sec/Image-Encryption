function openTab(event, tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => btn.classList.remove('active'));

    // Show current tab and mark button as active
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Image preview for encryption
document.getElementById('encryptImage').addEventListener('change', function(e) {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const preview = document.getElementById('encryptPreview');
            preview.src = event.target.result;
            preview.style.display = 'block';
            
            const info = document.getElementById('encryptImageInfo');
            const sizeMB = (file.size / 1024 / 1024).toFixed(2);
            info.textContent = `File: ${file.name} | Size: ${sizeMB}MB | Type: ${file.type}`;
        };
        reader.readAsDataURL(file);
    }
});

// Encrypt form submission
document.getElementById('encryptForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const imageFile = document.getElementById('encryptImage').files[0];
    const password = document.getElementById('encryptPassword').value;

    if (!imageFile || !password) {
        showMessage('Please select an image and enter a password', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('password', password);

    const btn = this.querySelector('.btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> Encrypting...';

    try {
        const response = await fetch('/encrypt', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, 'encrypted_image.enc');
            showMessage('✅ Image encrypted successfully! File downloaded.', 'success');
            this.reset();
            document.getElementById('encryptPreview').style.display = 'none';
        } else {
            const errorData = await response.json();
            showMessage('❌ Error: ' + (errorData.error || 'Encryption failed'), 'error');
        }
    } catch (error) {
        showMessage('❌ Error: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">🔒</span> Encrypt Image';
    }
});

// Decrypt form submission
document.getElementById('decryptForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const encryptedFile = document.getElementById('decryptImage').files[0];
    const password = document.getElementById('decryptPassword').value;

    if (!encryptedFile || !password) {
        showMessage('Please select an encrypted file and enter the password', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('encrypted_image', encryptedFile);
    formData.append('password', password);

    const btn = this.querySelector('.btn');
    btn.disabled = true;
    btn.innerHTML = '<span class="btn-icon">⏳</span> Decrypting...';

    try {
        const response = await fetch('/decrypt', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const blob = await response.blob();
            downloadFile(blob, 'decrypted_image.png');
            showMessage('✅ Image decrypted successfully! File downloaded.', 'success');
            this.reset();
        } else {
            const errorData = await response.json();
            showMessage('❌ Error: ' + (errorData.error || 'Decryption failed'), 'error');
        }
    } catch (error) {
        showMessage('❌ Error: ' + error.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-icon">🔓</span> Decrypt Image';
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message show ${type}`;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}

function downloadFile(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}
