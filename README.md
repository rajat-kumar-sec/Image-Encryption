Image Encryption

A simple and efficient project for encrypting and decrypting images to ensure data security and privacy. This repository demonstrates how image data can be transformed into an unreadable format and later restored using a decryption process.

Features

Encrypt images to protect sensitive data.
Decrypt images back to original form.
Supports common image formats.
Fast and lightweight implementation.
Easy-to-understand code for learning purposes.

Tech Stack

Programming Language: Python

Libraries Used---

numpy
opencv (cv2)
PIL (Pillow)
tkinter (for GUI, if applicable)
os, random

Getting Started:

Clone the Repository:
git clone https://github.com/rajat-kumar-sec/Image-Encryption.git

cd Image-Encryption
Install Dependencies
pip install numpy opencv-python pillow
Run the Program
python main.py

Note: The main script filename may vary (e.g., image_encryption.py). Update accordingly.

How It Works

The input image is read and converted into pixel data in Encrypted Formate Which is not UnEncrypted without the Password !!!
Encryption logic is applied (e.g., pixel manipulation, key-based transformation)
The encrypted image is generated and saved
Decryption reverses the process using the same key

Project Structure

Image-Encryption/
│── main.py / image_encryption.py
│── encrypted_images/
│── decrypted_images/
│── README.md

### Example Workflow ###

Original Image → Encrypt → Encrypted Image → Decrypt → Original Image

 Use Cases 

Secure image sharing
Protecting confidential visual data
Learning cryptography concepts
Academic projects

Contributing

Contributions are welcome!

Fork the repo.
Create a new branch (feature-xyz)
Commit your changes.
Open a Pull Request.
