const mostrarMenu =(id)=>{
    const submenu = document.getElementById(id);
    console.log(submenu)
    submenu.classList.toggle("mostrar")
}

const menu =()=>{
    const menu =document.getElementById('menu-container');
    menu.classList.toggle('mostrar')
}