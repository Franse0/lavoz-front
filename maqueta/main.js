
const requestCity = async () => {
  fetch("https://dolarapi.com/v1/dolares/oficial")
  .then(response => response.json())
  .then(data => console.log(data));

  return data;
};

requestCity();
