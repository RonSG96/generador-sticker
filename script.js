// Función para manejar la selección de "Todos"
function seleccionarTodos() {
  const todosCheckbox = document.getElementById('todos');
  const filaCheckboxes = document.querySelectorAll('.fila-check');

  filaCheckboxes.forEach((checkbox) => {
    checkbox.checked = false; // Desmarca todas las casillas de fila
    checkbox.disabled = todosCheckbox.checked; // Deshabilita o habilita según "Todos"
  });
}

// Función principal para generar las etiquetas
async function generarEtiquetas() {
  const fechaFabricacion = document.getElementById('fechaFabricacion').value;
  const fechaVencimiento = document.getElementById('fechaVencimiento').value;
  const todosCheckbox = document.getElementById('todos').checked;

  if (!fechaFabricacion || !fechaVencimiento) {
    alert('Por favor, ingresa ambas fechas.');
    return;
  }

  // Formatear las fechas a DD/MM/YY
  const formatearFecha = (fecha) => {
    const [año, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${año.slice(-2)}`;
  };

  const fechaFabricacionFormateada = formatearFecha(fechaFabricacion);
  const fechaVencimientoFormateada = formatearFecha(fechaVencimiento);

  const { jsPDF } = window.jspdf || window.jspdf || {};
  const doc = new jsPDF('p', 'mm', 'a4');

  const imgSrc = 'images/final2.jpg';
  const img = new Image();
  img.src = imgSrc;

  img.onload = function () {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.addImage(img, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Coordenadas de texto dentro de cada cuadro blanco para cada fila
    const posicionesFabricacion = [
      // PRIMERA FILA
      { x: 10, y: 48 },
      { x: 60, y: 48 },
      { x: 110, y: 48 },
      { x: 160, y: 48 },

      // SEGUNDAFILA
      { x: 10, y: 96 },
      { x: 60, y: 96 },
      { x: 110, y: 96 },
      { x: 160, y: 96 },

      // TERCERA FILA
      { x: 10, y: 146 },
      { x: 60, y: 146 },
      { x: 110, y: 146 },
      { x: 160, y: 146 },

      //CUARTA FILA
      { x: 10, y: 195 },
      { x: 60, y: 195 },
      { x: 110, y: 195 },
      { x: 160, y: 195 },

      //QUINTA FILA
      { x: 10, y: 244 },
      { x: 60, y: 244 },
      { x: 110, y: 244 },
      { x: 160, y: 244 },

      //SEXTA FILA
      { x: 10, y: 294 },
      { x: 60, y: 294 },
      { x: 110, y: 294 },
      { x: 160, y: 294 },
    ];

    const etiquetasPorFila = 4;

    // Determinar qué filas están seleccionadas
    let filasSeleccionadas = [];
    if (todosCheckbox) {
      filasSeleccionadas = [1, 2, 3, 4, 5, 6];
    } else {
      for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById(`fila${i}`);
        if (checkbox && checkbox.checked) {
          filasSeleccionadas.push(i);
        }
      }
    }

    // Filtrar las posiciones basadas en las filas seleccionadas
    const posicionesFiltradasFabricacion = [];
    filasSeleccionadas.forEach((fila) => {
      const inicio = (fila - 1) * etiquetasPorFila;
      const fin = inicio + etiquetasPorFila;
      posicionesFiltradasFabricacion.push(
        ...posicionesFabricacion.slice(inicio, fin)
      );
    });

    // Generar las posiciones de vencimiento basadas en la posición de fabricación filtrada
    const posicionesFiltradasVencimiento = posicionesFiltradasFabricacion.map(
      (pos) => ({
        x: pos.x + 22,
        y: pos.y,
      })
    );

    // Agregar fechas en las posiciones calculadas
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Color negro

    posicionesFiltradasFabricacion.forEach((pos, index) => {
      doc.text(`F: ${fechaFabricacionFormateada}`, pos.x, pos.y);
      doc.text(
        `V: ${fechaVencimientoFormateada}`,
        posicionesFiltradasVencimiento[index].x,
        posicionesFiltradasVencimiento[index].y
      );
    });

    // Guardar el archivo PDF
    doc.save('etiquetas_con_fondo_seleccionadas.pdf');
  };
}
