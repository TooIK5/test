async function sentRequest(data) {
  const response = await fetch('./js/server-ok.json', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
      return response.json();
  })
    .catch(() => {
      getError();
    });
}

async function getError() {
  await fetch('./js/server-error.json')
    .then(response => response.json())
    .then(json => console.log(json.Error))
}

