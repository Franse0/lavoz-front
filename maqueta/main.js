const mostrarMenu = (id) => {
  const submenu = document.getElementById(id);
  console.log(submenu);
  submenu.classList.toggle("mostrar");
};

const menu = () => {
  const menu = document.getElementById("menu-container");
  menu.classList.toggle("mostrar");
};

const requestCity = async () => {
  fetch("https://api.estadisticasbcra.com/usd_o", {
    headers: {
      Authorization:
        "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDM0NzUyNjQsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJwYW5jaHltYXJpbi5mbUBnbWFpbC5jb20ifQ.yvefqN3l-ifYVidvbZUPewUtgEbHYD7c816zBAfhShH-violdRn4ogGwbmq8cKDd2be4ux5UN8Ge5CnBkuvPPQ",
    },
  }) 
    .then(res=>res.json() )
    .then(data=>{
        console.log(data)
    } )

  return data;
};

requestCity();
