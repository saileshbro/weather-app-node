const weatherForm = document.querySelector('form');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = "";
messageTwo.textContent = "";
weatherForm.onsubmit = (e) => {
  e.preventDefault();
  const address = document.querySelector('#address').value;
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.error) {
        return messageOne.textContent = data.error;
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;

    });
};