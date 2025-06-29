// Tamagotchi Virtual Premium - Código JavaScript Completo
document.addEventListener('DOMContentLoaded', function() {
  // Variables del Tamagotchi
  const tamagotchi = {
    name: "Mascottita",
    character: "gato", // Nuevo campo para el personaje seleccionado
    stats: {
      happiness: 100,
      hunger: 100,
      energy: 100,
      hygiene: 100
    },
    age: {
      hours: 0,
      minutes: 0
    },
    state: "contenta",
    isSleeping: false,
    isDead: false,
    deathHistory: []
  };

  // Elementos del DOM - CORRECCIÓN
  const elements = {
    happinessValue: document.getElementById('happiness-value'),
    happinessBar: document.getElementById('happiness-bar'),
    hungerValue: document.getElementById('hunger-value'),
    hungerBar: document.getElementById('hunger-bar'),
    energyValue: document.getElementById('energy-value'),
    energyBar: document.getElementById('energy-bar'),
    hygieneValue: document.getElementById('hygiene-value'),
    hygieneBar: document.getElementById('hygiene-bar'),
    ageDisplay: document.getElementById('age'),
    stateIndicator: document.getElementById('state-indicator'),
    petGif: document.getElementById('pet-gif'),
    petName: document.getElementById('pet-name'),
    // CORRECCIÓN: Crear el elemento si no existe o usar uno que sí exista
    statusMessage: document.getElementById('notifications') || document.getElementById('consejo-texto'),
    notifications: document.getElementById('notifications'),
    sleepOverlay: document.getElementById('sleep-overlay'),
    sleepTimer: document.getElementById('sleep-timer'),
    sleepProgress: document.getElementById('sleep-progress'),
    deathOverlay: document.getElementById('death-overlay'),
    deathReason: document.getElementById('death-reason'),
    gameModal: document.getElementById('game-modal'),
    memoryGame: document.getElementById('memory-game'),
    pairsFound: document.getElementById('pairs-found'),
    movesCount: document.getElementById('moves-count')
  };

  // GIFs para diferentes estados - ACTUALIZADOS
  const gifs = {
    gato: {
      contenta: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXdhNTU4emV4eGloeGl4Y2s5bmh0ZGI5cGs0cnVvM2ZrbnJrZTRrbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3OAQXuYQ0utkwFiTt2/giphy.gif',
      hambrienta: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWoxZDE1Ym1qeHh1NHN0cmZ2bGs5Y3c4N3V1bmxldWRhdW1wMzFzcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VgczOypzDaiQUj255m/giphy.gif',
      aburrida: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGE0eXZxaXl1cWxtcWFtMjV2NDlyc2h2djN3MHN6Z3p0MnQ1ZWpxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Xbs2KHzuoisBKiw5gP/giphy.gif',
      triste: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3FzbHpzczRiNmNqaHd6OXJhZ29uZzVvZjhhaTU0ZWRyZXYzMm90diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/99bCcVD9GMIBcuOlNB/giphy.gif',
      sucia: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXh6eXllb2Q2dXRqa2F6ZTltbWZmYnljY29hMXN5dGpmbmJhcXdycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/J920Dq9epT74B8lmVk/giphy.gif',
      muerta: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXNjaTllajFxa2NobGEwcndjZzV1bWZnN2RjbWF4dGFzNWRpOGlpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5OCW0BkC27wV1ZKhvZ/giphy.gif',
      durmiendo: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXJkeXFnZTMyZTZmaXdvdDVoMTJyd3IwYnZndmZvMXBjcmJoeThieSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/90Vr6LOpoZ5VS5nDoW/giphy.gif',
      jugando: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGxjbjhwaW1zejcxOTgzOXpudXJ5cDhranUxMXN0aGs0YjE4YzExYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wOHkFujG7c2z2pWBDn/giphy.gif'
    },
    pinguino: {
      contenta: 'https://media.giphy.com/media/0bw8GYqGsDzrNkePBZ/giphy.gif', // Feliz
      hambrienta: 'https://media.giphy.com/media/ond9LO3hgmBmNr0RJE/giphy.gif', // Hambriento
      aburrida: 'https://media.giphy.com/media/35qxCMH8aWJ50GaENl/giphy.gif', // Aburrido
      triste: 'https://media.giphy.com/media/GMzAZelJzUPsc6YnAa/giphy.gif', // Llorando
      sucia: 'https://media.giphy.com/media/Lo9QAdGA6t592PIAJV/giphy.gif', // Sucio
      muerta: 'https://media.giphy.com/media/aDAVL1L2JEhn4u6EaO/giphy.gif', // Muriendo
      durmiendo: 'https://media.giphy.com/media/UgCw3nzd4qR00rdck7/giphy.gif', // Durmiendo
      jugando: 'https://media.giphy.com/media/Hw3s7ZiTvIKjMLmCir/giphy.gif' // Jugando
    }
  };

  // Estados posibles
  const states = {
    contenta: "😊 Contenta",
    feliz: "😄 Feliz",
    hambrienta: "😋 Hambrienta",
    cansada: "🥱 Cansada",
    sucia: "🤢 Sucia",
    enferma: "🤒 Enferma",
    muerta: "💀 Muerta"
  };

  // --- EMOCIONES JUGADOR Y CONSEJOS ---
  const consejos = {
    contenta: ["¡Sigue así! Tu mascota está muy feliz", "Todo va perfecto, continúa cuidándola"],
    hambrienta: ["Dale de comer pronto", "La comida es importante para su salud"],
    aburrida: ["¡Juega con ella para animarla!", "Necesita diversión y entretenimiento"],
    triste: ["Dedícale más tiempo y cariño", "Intenta jugar o darle caricias"],
    sucia: ["Es hora de un buen baño", "La limpieza es importante para su bienestar"],
    muerta: ["Lo siento... no la cuidaste bien", "Intenta ser más atento la próxima vez"]
  };
  const emocionesJugador = {
    contenta: ["¡Eres el mejor amigo del mundo!", "Gracias por cuidarme, me haces muy feliz ❤️"],
    hambrienta: ["Tengo hambre... pero no quiero molestarte 😔", "Solo quería decirte que te extraño cuando no estás."],
    aburrida: ["¿Jugamos un rato? ¡Te extraño!", "Me gusta estar contigo, incluso si no hacemos nada."],
    triste: ["¿Aún me quieres?", "A veces me siento solita..."],
    sucia: ["No me siento bien así, pero sé que harás algo ❤️", "Incluso sucia, me alegra verte."],
    muerta: ["Gracias por los momentos bonitos...", "Siempre fuiste especial para mí."]
  };

  // Mostrar nube emocional flotante
  function mostrarNubeEmocional(mensaje) {
    const notif = document.getElementById('emocion-notificacion');
    const texto = document.getElementById('emocion-texto');
    notif.style.display = 'flex';
    texto.textContent = mensaje;
    setTimeout(() => { notif.style.display = 'none'; }, 5000); // Se oculta tras 5s
  }

  // Mostrar consejo abajo de la mascota
  function mostrarConsejoAbajo(consejo) {
    const notif = document.getElementById('consejo-notificacion');
    const texto = document.getElementById('consejo-texto');
    notif.style.display = 'flex';
    texto.textContent = consejo;
  }
  document.getElementById('cerrar-consejo').onclick = function() {
    document.getElementById('consejo-notificacion').style.display = 'none';
  }

  // Lógica para mostrar emociones periódicamente en burbuja flotante
  function autoMensajeEmocional() {
    if (tamagotchi.isDead) return;
    const estado = tamagotchi.state;
    const mensajes = emocionesJugador[estado];
    if (mensajes && mensajes.length > 0) {
      const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
      mostrarNubeEmocional(mensaje);
    }
  }

  // Lógica para mostrar emociones periódicamente en #mensaje-fijo (barra fija)
  function autoMensajeEmocionalStatus() {
    if (tamagotchi.isDead) {
      elements.statusMessage.textContent = "😢 La mascota ha fallecido. Intenta cuidarla mejor la próxima vez.";
      elements.statusMessage.style.opacity = '1';
      return;
    }
    const estado = tamagotchi.state;
    const mensajes = emocionesJugador[estado];
    if (mensajes && mensajes.length > 0) {
      const mensaje = mensajes[Math.floor(Math.random() * mensajes.length)];
      elements.statusMessage.textContent = mensaje;
      elements.statusMessage.style.opacity = '1';
    }
  }

  function autoConsejo() {
    if (tamagotchi.isDead) {
      mostrarConsejoAbajo('😢 La mascota ha fallecido. Intenta cuidarla mejor la próxima vez.');
      return;
    }
    const estado = tamagotchi.state;
    const lista = consejos[estado];
    if (lista && lista.length > 0) {
      const consejo = lista[Math.floor(Math.random() * lista.length)];
      mostrarConsejoAbajo(consejo);
    }
  }


  // Lógica para mostrar la nube emocional en intervalos aleatorios (rato menos pensado)
  function lanzarMensajeEmocionalAleatorio() {
    if (tamagotchi.isDead) return;
    autoMensajeEmocional();
    // Próximo mensaje entre 7 y 18 segundos
    const proximo = Math.floor(Math.random() * 11000) + 7000;
    setTimeout(lanzarMensajeEmocionalAleatorio, proximo);
  }

  // Iniciar la primera vez
  lanzarMensajeEmocionalAleatorio(); // Burbuja flotante en intervalos aleatorios
  setInterval(autoMensajeEmocionalStatus, 7000); // Mensaje en barra fija
  setInterval(autoConsejo, 7000);
// --- NUEVA FUNCIÓN DE INICIALIZACIÓN (opcional, para guardar estado y eventos extra) ---
function initGame() {
  if (!localStorage.getItem("tamagotchi-state-save")) {
    const name = prompt("¿Cómo quieres llamar a tu mascota?", "Mascottita");
    if (name) tamagotchi.name = name;
  }
  // loadGame(); // Si tienes una función para cargar estado, descomenta esto
  // setInterval(automaticDegrade, 60000); // Si tienes degradación automática, descomenta esto
  setInterval(autoConsejo, 45000);
  setInterval(autoMensajeEmocional, 5000);
  setInterval(autoMensajeEmocionalStatus, 7000);
  // Event listener para Enter en el modal de nombre
  const nameInput = document.getElementById('new-pet-name');
  if (nameInput) {
    nameInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        confirmNewPet();
      }
    });
  }
}

  // Inicializar el Tamagotchi
  function init() {
    // No actualizar display automáticamente, esperar a que se seleccione el personaje
    startGameLoop();
    createParticles();
    setupMemoryGame();
    initializeStartMenu(); // Inicializar menú de selección
  }

  // Nueva función para inicializar el menú de selección
  function initializeStartMenu() {
    const characterOptions = document.querySelectorAll('.character-option');
    const nameInput = document.getElementById('pet-name-input');
    
    // Seleccionar gato por defecto
    if (characterOptions.length > 0) {
      characterOptions[0].classList.add('selected');
    }
    
    // Manejar selección de personaje
    characterOptions.forEach(option => {
      option.addEventListener('click', () => {
        characterOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
      });
    });
    
    // Permitir Enter para iniciar
    if (nameInput) {
      nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          startGame();
        }
      });
    }
  }

  // Nueva función para iniciar el juego
  function startGame() {
    const nameInput = document.getElementById('pet-name-input');
    const selectedCharacter = document.querySelector('.character-option.selected');
    
    if (!selectedCharacter) {
      alert('Por favor selecciona un personaje');
      return;
    }
    
    // Obtener nombre (usar placeholder si está vacío)
    const petName = nameInput.value.trim() || 'Mascottita';
    const characterType = selectedCharacter.dataset.character;
    
    // Configurar tamagotchi
    tamagotchi.name = petName;
    tamagotchi.character = characterType;
    
    // Ocultar modal de inicio
    document.getElementById('start-modal').style.display = 'none';
    
    // Actualizar display inicial
    updateDisplay();
    
    // Mostrar mensaje de bienvenida
    showNotification(`¡Hola! Soy ${petName} 😊`, 3000);
  }

  // Actualizar la visualización
  function updateDisplay() {
    // Actualizar barras y valores
    elements.happinessValue.textContent = tamagotchi.stats.happiness;
    elements.happinessBar.style.width = `${tamagotchi.stats.happiness}%`;

    elements.hungerValue.textContent = tamagotchi.stats.hunger;
    elements.hungerBar.style.width = `${tamagotchi.stats.hunger}%`;

    elements.energyValue.textContent = tamagotchi.stats.energy;
    elements.energyBar.style.width = `${tamagotchi.stats.energy}%`;

    elements.hygieneValue.textContent = tamagotchi.stats.hygiene;
    elements.hygieneBar.style.width = `${tamagotchi.stats.hygiene}%`;

    // Actualizar edad
    elements.ageDisplay.textContent = `${tamagotchi.age.hours}h ${tamagotchi.age.minutes}m`;

    // Actualizar estado
    updateState();
    elements.stateIndicator.textContent = states[tamagotchi.state];

    // Actualizar GIF según estado
    updatePetGif();

    // Actualizar nombre
    elements.petName.textContent = tamagotchi.name;
  }

  // Actualizar el estado del Tamagotchi
  function updateState() {
    if (tamagotchi.isDead) {
      tamagotchi.state = "muerta";
      return;
    }
    
    if (tamagotchi.isSleeping) {
      return;
    }
    
    if (tamagotchi.stats.happiness <= 20 || tamagotchi.stats.hunger <= 20 || 
        tamagotchi.stats.energy <= 20 || tamagotchi.stats.hygiene <= 20) {
      tamagotchi.state = "enferma";
    } else if (tamagotchi.stats.happiness >= 80) {
      tamagotchi.state = "feliz";
    } else if (tamagotchi.stats.hunger <= 40) {
      tamagotchi.state = "hambrienta";
    } else if (tamagotchi.stats.energy <= 40) {
      tamagotchi.state = "cansada";
    } else if (tamagotchi.stats.hygiene <= 40) {
      tamagotchi.state = "sucia";
    } else {
      tamagotchi.state = "contenta";
    }
  }

  // Actualizar el GIF de la mascota según su estado - MODIFICADO
  function updatePetGif() {
    const characterGifs = gifs[tamagotchi.character];
    
    if (tamagotchi.isDead) {
      elements.petGif.src = characterGifs.muerta;
      return;
    }
    
    if (tamagotchi.isSleeping) {
      elements.petGif.src = characterGifs.durmiendo;
      return;
    }
    
    switch(tamagotchi.state) {
      case "feliz":
        elements.petGif.src = characterGifs.contenta;
        break;
      case "hambrienta":
        elements.petGif.src = characterGifs.hambrienta;
        break;
      case "cansada":
        elements.petGif.src = characterGifs.triste;
        break;
      case "sucia":
        elements.petGif.src = characterGifs.sucia;
        break;
      case "enferma":
        elements.petGif.src = characterGifs.triste;
        break;
      default:
        elements.petGif.src = characterGifs.contenta;
    }
  }

  // Mostrar notificación
  function showNotification(message, duration = 3000) {
    elements.notifications.textContent = message;
    elements.notifications.style.display = 'block';
    
    setTimeout(() => {
      elements.notifications.style.display = 'none';
    }, duration);
  }

  // Mostrar mensaje de estado
  function showStatusMessage(message, duration = 3000) {
    // Usar el elemento de notificaciones
    showNotification(message, duration);
  }

  // Bucle principal del juego
  function startGameLoop() {
    // Actualizar edad cada minuto
    setInterval(() => {
      if (!tamagotchi.isDead && !tamagotchi.isSleeping) {
        tamagotchi.age.minutes++;
        
        if (tamagotchi.age.minutes >= 60) {
          tamagotchi.age.hours++;
          tamagotchi.age.minutes = 0;
        }
      }
    }, 60000); // 1 minuto real = 1 minuto en el juego
    
    // Degradación de estadísticas cada 3 segundos
    setInterval(() => {
      if (!tamagotchi.isDead && !tamagotchi.isSleeping) {
        // Disminuir hambre
        tamagotchi.stats.hunger = Math.max(0, tamagotchi.stats.hunger - 5);

        // Disminuir felicidad si el hambre es baja
        if (tamagotchi.stats.hunger < 50) {
          tamagotchi.stats.happiness = Math.max(0, tamagotchi.stats.happiness - 5);
        }

        // Disminuir energía
        tamagotchi.stats.energy = Math.max(0, tamagotchi.stats.energy - 5);

        // Disminuir higiene
        tamagotchi.stats.hygiene = Math.max(0, tamagotchi.stats.hygiene - 5);

        // Notificaciones de advertencia
        if (tamagotchi.stats.hunger < 30) {
          showNotification("¡Tengo hambre! 🍎");
        }
        if (tamagotchi.stats.energy < 30) {
          showNotification("¡Estoy cansada! 💤");
        }
        if (tamagotchi.stats.hygiene < 30) {
          showNotification("¡Necesito un baño! 🧼");
        }

        // Comprobar si ha muerto
        checkDeath();

        // Actualizar visualización
        updateDisplay();
      }
    }, 3000); // Cada 3 segundos
  }

  // Comprobar si la mascota ha muerto - MODIFICADO
  function checkDeath() {
    if (tamagotchi.stats.happiness <= 0 || tamagotchi.stats.hunger <= 0 || 
        tamagotchi.stats.energy <= 0 || tamagotchi.stats.hygiene <= 0) {
      tamagotchi.isDead = true;
      
      // Determinar causa de muerte
      let deathReason = "No la cuidaste bien...";
      if (tamagotchi.stats.hunger <= 0) deathReason = "Murió de hambre... 💀";
      if (tamagotchi.stats.energy <= 0) deathReason = "Murió de agotamiento... ⚡";
      if (tamagotchi.stats.hygiene <= 0) deathReason = "Murió por falta de higiene... 🧼";
      if (tamagotchi.stats.happiness <= 0) deathReason = "Murió de tristeza... 💔";
      
      // Guardar en el historial de muertes
      tamagotchi.deathHistory.push({
        name: tamagotchi.name,
        character: tamagotchi.character, // Guardar también el personaje
        age: `${tamagotchi.age.hours}h ${tamagotchi.age.minutes}m`,
        reason: deathReason,
        date: new Date().toLocaleString()
      });
      
      // Mostrar overlay de muerte brevemente y luego regresar al menú
      elements.deathReason.textContent = deathReason;
      elements.deathOverlay.style.display = 'flex';
      updateDisplay();
      
      // Después de 3 segundos, regresar al menú de selección
      setTimeout(() => {
        returnToStartMenu();
      }, 3000);
    }
  }

  // Nueva función para regresar al menú de inicio
  function returnToStartMenu() {
    // Ocultar overlay de muerte
    elements.deathOverlay.style.display = 'none';
    
    // Resetear el tamagotchi a valores iniciales
    tamagotchi.name = "Mascottita";
    tamagotchi.character = "gato";
    tamagotchi.stats = {
      happiness: 100,
      hunger: 100,
      energy: 100,
      hygiene: 100
    };
    tamagotchi.age = {
      hours: 0,
      minutes: 0
    };
    tamagotchi.state = "contenta";
    tamagotchi.isSleeping = false;
    tamagotchi.isDead = false;
    
    // Mostrar el modal de inicio nuevamente
    document.getElementById('start-modal').style.display = 'flex';
    
    // Resetear la selección del menú
    const characterOptions = document.querySelectorAll('.character-option');
    const nameInput = document.getElementById('pet-name-input');
    
    // Limpiar selección anterior
    characterOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Seleccionar gato por defecto
    if (characterOptions.length > 0) {
      characterOptions[0].classList.add('selected');
    }
    
    // Limpiar el input de nombre
    if (nameInput) {
      nameInput.value = '';
    }
    
    // Mostrar notificación
    showNotification("💔 Tu mascota ha fallecido. ¡Comienza de nuevo!", 4000);
  }

  // Modificar la función restart para que también use el menú - OPCIONAL
  function restart(newName) {
    // En lugar de reiniciar directamente, regresar al menú
    returnToStartMenu();
  }

  // Modificar showNameModal para usar el nuevo sistema - OPCIONAL  
  function showNameModal() {
    // En lugar del prompt, regresar al menú de selección
    returnToStartMenu();
  }

  // Acciones del Tamagotchi
  function performAction(action) {
    if (tamagotchi.isDead) return;
    if (tamagotchi.isSleeping && action !== 'despertar') {
      showNotification("¡Shhh! Está durmiendo 💤");
      return;
    }
    
    const characterGifs = gifs[tamagotchi.character];
    
    switch(action) {
      case 'comer':
        tamagotchi.stats.hunger = Math.min(100, tamagotchi.stats.hunger + 30);
        tamagotchi.stats.hygiene = Math.max(0, tamagotchi.stats.hygiene - 5);
        elements.petGif.src = characterGifs.contenta;
        showStatusMessage("¡Ñam ñam! Delicioso 🍎", 2000);
        setTimeout(() => updatePetGif(), 2000);
        break;
        
      case 'asearse':
        tamagotchi.stats.hygiene = Math.min(100, tamagotchi.stats.hygiene + 40);
        elements.petGif.src = characterGifs.contenta;
        showStatusMessage("¡Qué limpia me siento! 🧼", 2000);
        setTimeout(() => updatePetGif(), 2000);
        break;
        
      case 'jugar':
        if (tamagotchi.stats.energy < 20) {
          showNotification("Estoy demasiado cansada para jugar... 💤");
          return;
        }
        tamagotchi.stats.energy = Math.max(0, tamagotchi.stats.energy - 15);
        tamagotchi.stats.happiness = Math.min(100, tamagotchi.stats.happiness + 20);
        elements.petGif.src = characterGifs.jugando;
        showStatusMessage("¡Esto es divertido! 🎮", 2000);
        setTimeout(() => updatePetGif(), 2000);
        break;
    }
    
    updateDisplay();
  }

  // Mecánica de sueño simplificada - 3 segundos fijos - CORREGIDA
  function startSleeping() {
    if (tamagotchi.isDead) return;
    if (tamagotchi.isSleeping) {
        return; // No permitir interrumpir el sueño
    }

    tamagotchi.isSleeping = true;
    elements.sleepOverlay.style.display = 'flex';
    elements.sleepOverlay.setAttribute('aria-hidden', 'false');
    
    // CORRECCIÓN: Usar showNotification en lugar de showStatusMessage
    showNotification("Zzzzz... 💤");
    updatePetGif();

    const sleepDuration = 3; // 3 segundos fijos
    let sleepTime = sleepDuration;
    
    // Mostrar el tiempo inicial
    elements.sleepTimer.textContent = `00:0${sleepTime}`;

    // Configurar el progreso inicial del círculo (empezar vacío)
    const circumference = 2 * Math.PI * 52; // r=52
    elements.sleepProgress.style.strokeDasharray = circumference;
    elements.sleepProgress.style.strokeDashoffset = circumference; // Empezar vacío

    // Deshabilitar el botón de dormir
    const sleepButton = document.querySelector('.btn-sleep');
    if (sleepButton) {
        sleepButton.disabled = true;
        sleepButton.innerHTML = '💤 Durmiendo...';
    }

    let sleepInterval = setInterval(() => {
        sleepTime--;

        // Actualizar temporizador visual
        elements.sleepTimer.textContent = `00:0${sleepTime}`;

        // Actualizar progreso visual del círculo (se va llenando)
        const progressPercent = (sleepDuration - sleepTime) / sleepDuration;
        const offset = circumference - (progressPercent * circumference);
        elements.sleepProgress.style.strokeDashoffset = offset;

        // Despertar cuando termine el tiempo
        if (sleepTime <= 0) {
            clearInterval(sleepInterval);
            wakeUp();
        }
    }, 1000);
}

function wakeUp() {
    // Recuperar 5 de energía
    tamagotchi.stats.energy = Math.min(100, tamagotchi.stats.energy + 20);
    
    tamagotchi.isSleeping = false;
    elements.sleepOverlay.style.display = 'none';
    elements.sleepOverlay.setAttribute('aria-hidden', 'true');
    
    // CORRECCIÓN: Usar showNotification
    showNotification("¡Descansé un poquito! +20 energía ⚡", 3000);
    updatePetGif();
    updateDisplay();

    // Restaurar el botón de dormir
    const sleepButton = document.querySelector('.btn-sleep');
    if (sleepButton) {
        sleepButton.disabled = false;
        sleepButton.innerHTML = '💤 Dormir';
    }
}

// Juego de memoria
  function setupMemoryGame() {
    const cards = ['🍎', '🍕', '🍦', '🍔', '🍓', '🍪', '🍉', '🍍'];
    const gameCards = [...cards, ...cards]; // Duplicar para hacer parejas
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    
    // Barajar cartas
    gameCards.sort(() => Math.random() - 0.5);
    
    // Crear tablero
    elements.memoryGame.innerHTML = '';
    gameCards.forEach((emoji, index) => {
      const card = document.createElement('button');
      card.className = 'memory-card';
      card.dataset.index = index;
      card.dataset.value = emoji;
      card.addEventListener('click', flipCard);
      elements.memoryGame.appendChild(card);
    });
    
    function flipCard() {
      if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
      }
      
      this.classList.add('flipped');
      this.textContent = this.dataset.value;
      flippedCards.push(this);
      
      if (flippedCards.length === 2) {
        moves++;
        elements.movesCount.textContent = moves;
        
        if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
          // Pareja encontrada
          flippedCards.forEach(card => {
            card.classList.add('matched');
            card.classList.remove('flipped');
          });
          
          matchedPairs++;
          elements.pairsFound.textContent = matchedPairs;
          
          // Aumentar felicidad por encontrar pareja
          if (!tamagotchi.isDead && !tamagotchi.isSleeping) {
            tamagotchi.stats.happiness = Math.min(100, tamagotchi.stats.happiness + 5);
            updateDisplay();
          }
          
          // Comprobar si se ha ganado
          if (matchedPairs === cards.length) {
            setTimeout(() => {
              // Recompensa por ganar
              if (!tamagotchi.isDead && !tamagotchi.isSleeping) {
                tamagotchi.stats.happiness = Math.min(100, tamagotchi.stats.happiness + 20);
                showStatusMessage("¡Qué divertido! 😄", 3000);
                updateDisplay();
              }
              closeGameModal();
            }, 1000);
          }
        } else {
          // No es pareja, voltear de nuevo
          setTimeout(() => {
            flippedCards.forEach(card => {
              card.classList.remove('flipped');
              card.textContent = '';
            });
          }, 1000);
        }
        
        flippedCards = [];
      }
    }
  }

  function openGameModal() {
    if (tamagotchi.isDead) return;
    if (tamagotchi.isSleeping) {
      showNotification("¡Shhh! Está durmiendo 💤");
      return;
    }
    
    if (tamagotchi.stats.energy < 20) {
      showNotification("Estoy demasiado cansada para jugar... 💤");
      return;
    }
    
    // Coste de energía por jugar
    tamagotchi.stats.energy = Math.max(0, tamagotchi.stats.energy - 10);
    updateDisplay();
    
    setupMemoryGame();
    elements.gameModal.style.display = 'flex';
  }

  function closeGameModal() {
    elements.gameModal.style.display = 'none';
  }

  function showNameModal() {
    const newName = prompt("¿Cómo quieres llamar a tu nueva mascota?", "Mascottita");
    if (newName) {
      restart(newName);
    }
  }

  function restart(newName) {
    tamagotchi.name = newName || "Mascottita";
    tamagotchi.stats = {
      happiness: 100,
      hunger: 100,
      energy: 100,
      hygiene: 100
    };
    tamagotchi.age = {
      hours: 0,
      minutes: 0
    };
    tamagotchi.state = "contenta";
    tamagotchi.isSleeping = false;
    tamagotchi.isDead = false;
    
    elements.deathOverlay.style.display = 'none';
    updateDisplay();
    showStatusMessage("¡Hola! Soy tu nueva mascota. 😊", 3000);
  }

  function showDeathHistory() {
    const modal = document.getElementById('history-modal');
    const list = document.getElementById('history-list');
    list.innerHTML = "";

    if (tamagotchi.deathHistory.length === 0) {
      list.innerHTML = '<div class="no-deaths">No hay historial de mascotas anteriores.</div>';
    } else {
      tamagotchi.deathHistory.forEach((pet, index) => {
        list.innerHTML += `
          <div class="death-entry">
            <div class="death-entry-header">#${index + 1}: ${pet.name}</div>
            <div class="death-entry-info">Edad: ${pet.age}</div>
            <div class="death-entry-info">Fecha: ${pet.date}</div>
            <div class="death-entry-reason">${pet.reason}</div>
          </div>
        `;
      });
    }
    modal.style.display = "flex";
  }

  function closeHistoryModal() {
    document.getElementById('history-modal').style.display = "none";
  }

  // Efecto de partículas flotantes
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posición y tamaño aleatorios
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      
      // Animación con delay aleatorio
      const delay = Math.random() * 8;
      const duration = Math.random() * 5 + 5;
      particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
      
      // Opacidad aleatoria
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      
      particlesContainer.appendChild(particle);
    }
  }

  // Inicializar el juego
  init();

  // Exponer funciones globales - ACTUALIZADO
  window.performAction = performAction;
  window.startSleeping = startSleeping;
  window.openGameModal = openGameModal;
  window.closeGameModal = closeGameModal;
  window.showNameModal = showNameModal;
  window.showDeathHistory = showDeathHistory;
  window.closeHistoryModal = closeHistoryModal;
  window.startGame = startGame; // Nueva función global
  window.initializeStartMenu = initializeStartMenu;
  window.returnToStartMenu = returnToStartMenu; // Exponer la nueva función globalmente
});