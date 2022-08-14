async function sentRequest() {
  const object = { name: 'James Gordon' };

    const response = await fetch('./js/server-ok.json', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json'
    }
}).then(
(response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
}
)
.catch((error) => {
console.log(error);
getError(); 
});

}

async function getError() {
   await fetch('./js/server-error.json')
  .then(response => response.json())
  .then(json => console.log(json.Error))
}

