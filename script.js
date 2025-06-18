let nombreLibro = document.querySelector('#nombrelibro');
let autorLibro = document.querySelector('#autorlibro');
let paginasLibro = document.querySelector('#paginaslibro');
let leido = document.querySelector('#leido');
let noLeido = document.querySelector('#noleido');
let estanteria = document.querySelector('#estanteria');
let botonAgregar = document.querySelector('#botonagregar');


let arraylibros = [];


class Libro {
    constructor(nombre, autor, paginas, leido, noleido) {
        this.nombre = nombre;
        this.autor = autor;
        this.paginas = paginas;
        this.leido = leido;
        this.noleido = noleido;
    }
};



function crearLibro() {
    let nombre = nombreLibro.value;
    let autor = autorLibro.value;
    let paginas = paginasLibro.value;
    let libroLeido = leido.checked;
    let libroNoLeido = noLeido.checked;
    let nuevolibro = new Libro(nombre, autor, paginas, libroLeido, libroNoLeido);
    let id = crypto.randomUUID();
    nuevolibro.id = id;
    return nuevolibro;
}


function anadirLibroaArray() {
    let libroCreado = crearLibro();
    arraylibros.push(libroCreado);
}



function eliminarLibro(e) {
    let objetivoCliqueado = e.target;
    let etiquetaDelLibro = objetivoCliqueado.parentNode;
    let id = etiquetaDelLibro.id;

    let indice = arraylibros.findIndex(function (objeto) {
        return objeto.id === id;
    })

    arraylibros.splice(id, 1);
    estanteria.innerHTML = '';
    arraylibros.forEach(crearEtiquetaLibro);
}

function cambiarEstatus() {
    if (divLeidoOno.textContent === "Libro leido") {
        divLeidoOno.textContent = "Libro no leido";
    } else if (divLeidoOno.textContent === "Libro no leido") {
        divLeidoOno.textContent = "Libro leido";
    }
}


function crearEtiquetaLibro(objeto) {
    let id = objeto.id;
    let etiquetaDiv = document.createElement('div');
    etiquetaDiv.id = id;
    let botonCambiarEstatus = document.createElement('button');
    botonCambiarEstatus.textContent = "Cambiar estatus";
    botonCambiarEstatus.addEventListener('click',cambiarEstatus);
    let botonEliminarLibro = document.createElement('button');
    botonEliminarLibro.textContent = "Elminar libro";
    botonEliminarLibro.addEventListener('click', eliminarLibro);
    let nombre = objeto.nombre;
    let divNombre = document.createElement('div');
    divNombre.textContent = nombre;
    let autor = objeto.autor;
    let divAutor = document.createElement('div');
    divAutor.textContent = autor;
    let paginas = objeto.paginas;
    let divPaginas = document.createElement('div');
    divPaginas.textContent = paginas;
    let leidoOno;
    if (objeto.leido === true) {
        leidoOno = "Libro leido"
    } else {
        leidoOno = "Libro no leido"
    }
    let divLeidoOno = document.createElement('div');
    divLeidoOno.textContent = leidoOno;
    etiquetaDiv.appendChild(divNombre);
    etiquetaDiv.appendChild(divAutor);
    etiquetaDiv.appendChild(divPaginas);
    etiquetaDiv.appendChild(divLeidoOno);
    etiquetaDiv.appendChild(botonCambiarEstatus);
    etiquetaDiv.appendChild(botonEliminarLibro);
    estanteria.appendChild(etiquetaDiv);
}



function anadirLibroAEstanteria() {
    anadirLibroaArray();
    estanteria.innerHTML = '';
    arraylibros.forEach(crearEtiquetaLibro);
}


botonAgregar.addEventListener('click', anadirLibroAEstanteria);

