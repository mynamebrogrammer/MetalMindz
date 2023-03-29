const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#robot-name').value.trim();
  // const needed_funding = document.querySelector('#project-funding').value.trim();
  const needFunding = document.querySelector('#robot-funding').value.trim();
  // const img = document.querySelector('#password-signup').value.trim();
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
  // event.preventDefault();
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

document
  .querySelector('.new-robot-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.robot-list')
  .addEventListener('click', delButtonHandler);
