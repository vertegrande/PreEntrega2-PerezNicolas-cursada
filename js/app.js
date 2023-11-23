    const usuario = {
      nombre: "",
      dni: 0,
      ingresoMensual: 0,
      montoPrestamo: 0,
      cantidadCuotas: 0,
      nombreBanco: "",
    };

    // Array para almacenar resultados
    const resultados = [];

    // Función para capturar entrada mediante prompt
    function capturarEntrada(mensaje) {
      let input = "";
      while (input === "") {
        input = prompt(mensaje);
        if (input === null) {
          alert("El ingreso ha sido cancelado.");
          break;
        }
      }
      return input;
    }

    // Función para mostrar resultado por consola y alerta
    function mostrarResultado(mensaje) {
      console.log(mensaje);
      alert(mensaje);
    }

    // Función para validar DNI
    function validarDNI() {
      let intentos = 3;
      while (intentos > 0) {
        const dniInput = capturarEntrada(`Por favor, ingrese su número de DNI (${intentos} intentos restantes):`);

        if (dniInput === null) {
          alert("Se acabaron tus intentos, vuelve cuando los chanchos vuelen");
          break;
        }

        usuario.dni = parseInt(dniInput, 10);

        if (!isNaN(usuario.dni) && usuario.dni >= 1000000 && usuario.dni <= 99999999) {
          alert("DNI válido: " + usuario.dni);
          break;
        } else {
          alert("El DNI ingresado no es válido. Debe ser un número entre 1,000,000 y 99,999,999.");
          intentos--;
        }
      }

      if (intentos === 0) {
        alert("Se agotaron los intentos.");
      }
    }

    // Función para solicitar información
    function solicitarInformacion() {
      usuario.nombre = capturarEntrada("Por favor, ingrese su nombre:");
      usuario.cantidadCuotas = parseInt(capturarEntrada("Ingrese el plazo del préstamo en meses:"));
      usuario.nombreBanco = capturarEntrada("Seleccione el banco:\n1. Banco Galicia - Costo Financiero Total expresado en Tasa Nominal Anual CFT TNA 204,07%\n2. Banco Nacion - Costo Financiero Total expresado en Tasa Nominal Anual CFT TNA 182,07%");
    }

    // Validar DNI
    validarDNI();

    // Solicitar información
    solicitarInformacion();

    // Menú de selección de filtros (ingresos mensuales + monto de préstamo)
    const opcionesSueldo = ["Menos de 300,000", "300,000 - 600,000", "Más de 600,000"];
    const opcionesPrestamo = ["250,000", "500,000", "750,000", "1,000,000", "1,500,000"];

    const opcionFiltroSueldo = parseInt(capturarEntrada("Seleccion sus ingresos mensuales:\n1. " + opcionesSueldo[0] + "\n2. " + opcionesSueldo[1] + "\n3. " + opcionesSueldo[2]));
    const opcionFiltroPrestamo = parseInt(capturarEntrada("Seleccione Monto de préstamo:\n1. " + opcionesPrestamo[0] + "\n2. " + opcionesPrestamo[1] + "\n3. " + opcionesPrestamo[2] + "\n4. " + opcionesPrestamo[3] + "\n5. " + opcionesPrestamo[4]));

    // Función para obtener el rango de sueldo según la opción seleccionada
    function obtenerFiltroSueldo(opcion) {
      return opcionesSueldo[opcion - 1] || "Opción no válida";
    }

    // Función para obtener el rango de préstamo según la opción seleccionada
    function obtenerFiltroPrestamo(opcion) {
      return opcionesPrestamo[opcion - 1] || "Opción no válida";
    }

    // Filtrar por monto de sueldo
    const filtroSueldo = obtenerFiltroSueldo(opcionFiltroSueldo);

    // Filtrar por monto de préstamo
    const filtroPrestamo = obtenerFiltroPrestamo(opcionFiltroPrestamo);

    // Establecer el monto de sueldo y préstamo según los filtros seleccionados
    switch (filtroSueldo) {
      case opcionesSueldo[0]:
        usuario.ingresoMensual = 150000;
        break;
      case opcionesSueldo[1]:
        usuario.ingresoMensual = 450000;
        break;
      case opcionesSueldo[2]:
        usuario.ingresoMensual = 700000;
        break;
    }

    switch (filtroPrestamo) {
      case opcionesPrestamo[0]:
        usuario.montoPrestamo = 250000;
        break;
      case opcionesPrestamo[1]:
        usuario.montoPrestamo = 500000;
        break;
      case opcionesPrestamo[2]:
        usuario.montoPrestamo = 750000;
        break;
      case opcionesPrestamo[3]:
        usuario.montoPrestamo = 1000000;
        break;
      case opcionesPrestamo[4]:
        usuario.montoPrestamo = 1500000;
        break;
    }

    // Establecer la tasa de interés según el banco seleccionado
    switch (usuario.nombreBanco) {
      case "1":
        usuario.tasaAnual = 204.07;
        break;
      case "2":
        usuario.tasaAnual = 182.07;
        break;
      default:
        mostrarResultado("Banco no válido. Se utilizará una tasa de interés por defecto.");
        usuario.tasaAnual = 10.00;
        break;
    }

    // Verificar si el usuario es apto con los ingresos para el préstamo
    if (usuario.ingresoMensual >= 100000 && usuario.montoPrestamo <= 900000) {
      // Calcular la tasa de interés mensual
      const tasaMensual = usuario.tasaAnual / 12 / 100;
      // Calcular el pago mensual utilizando la fórmula del préstamo
      const pagoMensual = (usuario.montoPrestamo * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -usuario.cantidadCuotas));

      // Almacenar resultado en el array de resultados
      resultados.push({
        nombre: usuario.nombre,
         "Prestamo Solicitado": usuario.montoPrestamo,
        "Cuotas Seleccionadas": usuario.cantidadCuotas,
        "TNA": usuario.tasaAnual,
        "Cuota Mensual Promedio": pagoMensual.toFixed(2),
        "Entidad Financiera": usuario.nombreBanco,
      });

      // Mostrar el resultado
      mostrarResultado(`Su pago mensual será de: $${pagoMensual.toFixed(2)} pronto nos comunicaremos contigo desde el Banco`);
    } else {
      mostrarResultado("Lo sentimos, sus ingresos no cumplen con los requisitos para obtener el préstamo.");
      console.log("Ingresos Netos" + "" + "$" + usuario.ingresoMensual + " " + "No apto para préstamo");
    }

    // Mostrar resultados en el HTML
    const resultadosContainer = document.createElement("div");
    resultadosContainer.innerHTML = "<h2>Prestamos Solicitado:</h2>";

    resultados.forEach((resultado, index) => {
      resultadosContainer.innerHTML += `<p>Resultado ${index + 1}:</p>`;

      for (const key in resultado) {
        let value = resultado[key];

        // Formatear valores específicos
        switch (key) {
          case "Prestamo Solicitado":
          case "Cuota Mensual":
            value = `$${value.toFixed(2)}`;
            break;
          case "TNA":
            value = `${value.toFixed(2)}%`;
            break;
          case "Entidad Financiera":
            value = (value === "1") ? "Banco Galicia" : "Banco Nacion";
            break;
        }

        resultadosContainer.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      }

      resultadosContainer.innerHTML += "<hr>";
    });
    document.body.appendChild(resultadosContainer);
