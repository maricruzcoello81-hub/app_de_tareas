console.log("Iniciando JS");
// Traer tareas guardadas o iniciar vacío
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Mostrar tareas al cargar la página
mostrarTareas();

// Función para agregar tarea
function agregarTarea() {
  const input = document.getElementById("inputTarea");
  const texto = input.value.trim();

  if (texto === "") return;

  tareas.push({ texto: texto, completada: false });

  localStorage.setItem("tareas", JSON.stringify(tareas));

  mostrarTareas();

  input.value = "";
}

// Función para mostrar tareas
function mostrarTareas() {
  const lista = document.getElementById("listaTareas");
  lista.innerHTML = "";

  tareas.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    // Si está completada
    if (tarea.completada) {
      li.classList.add("completada");
    }

    // Marcar/desmarcar
    li.onclick = function () {
      tareas[index].completada = !tareas[index].completada;
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrarTareas();
    };

    // Botón eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "X";

    btnEliminar.onclick = function (e) {
      e.stopPropagation(); // evita que marque como completada
      tareas.splice(index, 1);
      localStorage.setItem("tareas", JSON.stringify(tareas));
      mostrarTareas();
    };

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

// Agregar con Enter
document.getElementById("inputTarea").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});