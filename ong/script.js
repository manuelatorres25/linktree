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

const items = document.querySelectorAll('.item');
const bins = document.querySelectorAll('.bin');
const totalObjetos = items.length;

// --- DESKTOP ---
items.forEach(item => {
  item.addEventListener('dragstart', () => {
    draggedItem = item;
  });
});

// --- MOBILE (TOUCH) ---
items.forEach(item => {
  item.addEventListener('touchstart', (e) => {
    e.preventDefault(); // evita que la imagen se abra
    draggedItem = item;
  });

  item.addEventListener('touchmove', (e) => {
    e.preventDefault(); // evita scroll y apertura
  });

  item.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const elem = document.elementFromPoint(touch.clientX, touch.clientY);

    if (elem && elem.classList.contains('bin')) {
      handleDrop(elem);
    }
  });
});

// --- FUNCIONES ---
function handleDrop(bin) {
  if (!draggedItem) return;

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
    alert("Juego terminado. Aciertos: " + correctas + " de " + totalObjetos);
  }
}

// --- DESKTOP DROP ---
bins.forEach(bin => {
  bin.addEventListener('dragover', e => e.preventDefault());

  bin.addEventListener('drop', () => {
    handleDrop(bin);
  });
});

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




