//CALCULADORA DE IMPACTO
const PRECIO_ARBOL = 2500;

function calcularArboles(valor) {
    const monto = Number(valor);
    const arboles = Math.floor(monto / PRECIO_ARBOL);

    const box = document.getElementById("resultadoImpacto");
    box.style.display = "block";

    box.innerHTML = `
        <h4>Impacto estimado 🌱</h4>
        <p>Con <b>$${monto}</b> se pueden plantar aproximadamente 
        <b>${arboles}</b> árbol(es).</p>
    `;
}
//GALERIA
function abrirModal(img) {
  document.getElementById("modalGaleria").style.display = "flex";
  document.getElementById("imgModal").src = img.src;
}

function cerrarModal(e) {
  if (e.target.classList.contains("modal-galeria") || e.target.classList.contains("cerrar")) {
    document.getElementById("modalGaleria").style.display = "none";
  }
}
//JUEGO
let draggedItem = null;
let correctas = 0;
let intentos = 0;

const totalObjetos = document.querySelectorAll(".item").length;

/* --- EVENTOS PARA PC (drag & drop normal) --- */
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", () => {
    draggedItem = item;
  });
});

/* --- EVENTOS PARA CELULAR (touch) --- */
document.querySelectorAll(".item").forEach(item => {

  item.addEventListener("touchstart", (e) => {
    draggedItem = item;
  });

  item.addEventListener("touchmove", (e) => {
    e.preventDefault(); // evita scroll mientras arrastra
    const touch = e.touches[0];
    const elemento = document.elementFromPoint(touch.clientX, touch.clientY);

    document.querySelectorAll('.bin').forEach(bin => {
      bin.classList.remove('dragover');
    });

    if (elemento && elemento.classList.contains('bin')) {
      elemento.classList.add('dragover');
    }
  });

  item.addEventListener("touchend", (e) => {
    const touch = e.changedTouches[0];
    const elemento = document.elementFromPoint(touch.clientX, touch.clientY);

    document.querySelectorAll('.bin').forEach(bin => {
      bin.classList.remove('dragover');
    });

    if (elemento && elemento.classList.contains("bin")) {
      soltarEnBin(elemento);
    }
  });
});

/* --- EVENTOS PARA PC (dragover/drop) --- */
document.querySelectorAll(".bin").forEach(bin => {
  
  bin.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  bin.addEventListener("dragenter", () => {
    bin.classList.add("dragover");
  });

  bin.addEventListener("dragleave", () => {
    bin.classList.remove("dragover");
  });

  bin.addEventListener("drop", () => {
    soltarEnBin(bin);
  });
});

/* --- FUNCIÓN GENERAL PARA SOLTAR ITEMS --- */
function soltarEnBin(bin) {
  if (!draggedItem) return;

  bin.classList.remove("dragover");

  const correcto = draggedItem.dataset.type === bin.dataset.type;

  if (correcto) {
    alert("¡Correcto!");
    correctas++;
  } else {
    alert("Incorrecto");
  }

  intentos++;
  draggedItem = null;

  if (intentos === totalObjetos) {
    alert(`Juego terminado. Aciertos: ${correctas} de ${totalObjetos}`);
  }
}

//FORMULARIO DE CONTACTO
    (function(){
      emailjs.init("_XQ6zjcwkulunLv28"); // <-- reemplaza con tu Public Key
    })();

    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
      event.preventDefault();

      emailjs.sendForm('serviceid', 'template_ld9ek2o', this) // <-- reemplaza con tu Service ID y Template ID
        .then(function() {
          alert('Mensaje enviado con éxito!');
          form.reset();
        }, function(error) {
          alert('Hubo un error al enviar el mensaje: ' + JSON.stringify(error));
        });
    });



