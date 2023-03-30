const cloudName = 'metal-mindz';
const unsignedUploadPreset = 'tk4aj6kx';

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#robot-name').value.trim();
  const needFunding = document.querySelector('#robot-funding').value.trim();
  const description = document.querySelector('#robot-desc').value.trim();

  if (name && needFunding && description) {
    const response = await fetch(`/api/robots`, {
      method: 'POST',
      body: JSON.stringify({ name, needFunding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/profile');
      console.log("You are logged in!");
    } else {
      alert(response.statusText);
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/robots/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete robot');
    }
  }
};

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: unsignedUploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === 'success') {
      console.log('Done! Here is the image info: ', result.info);
      document
        .getElementById('robot-img')
        .setAttribute('src', result.info.secure_url);
        console.log(result.info.secure_url);
    }
  }
);

document
  .getElementById('upload_widget').addEventListener(
    'click',
    function () {
      myWidget.open();
    },
    false
  );


document
  .querySelector('.new-robot-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.robot-list')
  .addEventListener('click', delButtonHandler);
