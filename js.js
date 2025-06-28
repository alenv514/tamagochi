// Tamagotchi Virtual Premium - Código JavaScript Completo
document.addEventListener('DOMContentLoaded', function() {
  // Variables del Tamagotchi
  const tamagotchi = {
    name: "Mascottita",
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

  // Elementos del DOM
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
    statusMessage: document.getElementById('mensaje-fijo'),
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

  // GIFs para diferentes estados
  const gifs = {
    contenta: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXdhNTU4emV4eGloeGl4Y2s5bmh0ZGI5cGs0cnVvM2ZrbnJrZTRrbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3OAQXuYQ0utkwFiTt2/giphy.gif',
    hambrienta: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWoxZDE1Ym1qeHh1NHN0cmZ2bGs5Y3c4N3V1bmxldWRhdW1wMzFzcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VgczOypzDaiQUj255m/giphy.gif',
    aburrida: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGE0eXZxaXl1cWxtcWFtMjV2NDlyc2h2djN3MHN6Z3p0MnQ1ZWpxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Xbs2KHzuoisBKiw5gP/giphy.gif',
    triste: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3FzbHpzczRiNmNqaHd6OXJhZ29uZzVvZjhhaTU0ZWRyZXYzMm90diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/99bCcVD9GMIBcuOlNB/giphy.gif',
    sucia: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExOXh6eXllb2Q2dXRqa2F6ZTltbWZmYnljY29hMXN5dGpmbmJhcXdycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/J920Dq9epT74B8lmVk/giphy.gif',
    muerta: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXNjaTllajFxa2NobGEwcndjZzV1bWZnN2RjbWF4dGFzNWRpOGlpbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5OCW0BkC27wV1ZKhvZ/giphy.gif',
    durmiendo: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXJkeXFnZTMyZTZmaXdvdDVoMTJyd3IwYnZndmZvMXBjcmJoeThieSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/90Vr6LOpoZ5VS5nDoW/giphy.gif',
    jugando: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGxjbjhwaW1zejcxOTgzOXpudXJ5cDhranUxMXN0aGs0YjE4YzExYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wOHkFujG7c2z2pWBDn/giphy.gif'
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
    let nube = document.getElementById('nube-emocional');
    if (!nube) {
      nube = document.createElement('div');
      nube.id = 'nube-emocional';
      document.body.appendChild(nube);
    }
    nube.textContent = mensaje;
    nube.style.opacity = '1';
    nube.style.display = 'block';
    // ¡Ahora la nube emocional NO desaparece automáticamente!
  }

  // Mostrar consejo abajo de la mascota
  function mostrarConsejoAbajo(consejo) {
    let consejoDiv = document.getElementById('consejo-abajo');
    if (!consejoDiv) {
      consejoDiv = document.createElement('div');
      consejoDiv.id = 'consejo-abajo';
      consejoDiv.style.position = 'absolute';
      consejoDiv.style.left = '50%';
      consejoDiv.style.transform = 'translateX(-50%)';
      consejoDiv.style.bottom = '-40px';
      consejoDiv.style.background = '#e6f7ff';
      consejoDiv.style.color = '#005c7a';
      consejoDiv.style.borderRadius = '18px';
      consejoDiv.style.padding = '12px 24px';
      consejoDiv.style.fontSize = '1.1rem';
      consejoDiv.style.boxShadow = '0 2px 12px rgba(0,0,0,0.10)';
      consejoDiv.style.minWidth = '220px';
      consejoDiv.style.textAlign = 'center';
      consejoDiv.style.zIndex = '900';
      consejoDiv.style.opacity = '0.97';
      consejoDiv.style.pointerEvents = 'none';
      // Insertar dentro del pet-gif parent
      const petContainer = elements.petGif.parentElement;
      petContainer.appendChild(consejoDiv);
    }
    consejoDiv.textContent = consejo;
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
    updateDisplay();
    startGameLoop();
    createParticles();
    
    // Configurar el juego de memoria
    setupMemoryGame();
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
    elements.ageDisplay.textContent = `⏰ ${tamagotchi.age.hours}h ${tamagotchi.age.minutes}m`;
    
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

  // Actualizar el GIF de la mascota según su estado
  function updatePetGif() {
    if (tamagotchi.isDead) {
      elements.petGif.src = gifs.muerta;
      return;
    }
    
    if (tamagotchi.isSleeping) {
      elements.petGif.src = gifs.durmiendo;
      return;
    }
    
    switch(tamagotchi.state) {
      case "feliz":
        elements.petGif.src = gifs.contenta;
        break;
      case "hambrienta":
        elements.petGif.src = gifs.hambrienta;
        break;
      case "cansada":
        elements.petGif.src = gifs.triste;
        break;
      case "sucia":
        elements.petGif.src = gifs.sucia;
        break;
      case "enferma":
        elements.petGif.src = gifs.triste;
        break;
      default:
        elements.petGif.src = gifs.contenta;
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
    elements.statusMessage.textContent = message;
    elements.statusMessage.style.opacity = '1';
    
    setTimeout(() => {
      elements.statusMessage.style.opacity = '0';
    }, duration);
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
    
    // Degradación de estadísticas cada 10 segundos
    setInterval(() => {
      if (!tamagotchi.isDead && !tamagotchi.isSleeping) {
        // Disminuir hambre
        tamagotchi.stats.hunger = Math.max(0, tamagotchi.stats.hunger - 2);
        
        // Disminuir felicidad si el hambre es baja
        if (tamagotchi.stats.hunger < 50) {
          tamagotchi.stats.happiness = Math.max(0, tamagotchi.stats.happiness - 1);
        }
        
        // Disminuir energía
        tamagotchi.stats.energy = Math.max(0, tamagotchi.stats.energy - 1);
        
        // Disminuir higiene
        tamagotchi.stats.hygiene = Math.max(0, tamagotchi.stats.hygiene - 1);
        
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
    }, 10000); // Cada 10 segundos
  }

  // Comprobar si la mascota ha muerto
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
      
      elements.deathReason.textContent = deathReason;
      elements.deathOverlay.style.display = 'flex';
      
      // Guardar en el historial de muertes
      tamagotchi.deathHistory.push({
        name: tamagotchi.name,
        age: `${tamagotchi.age.hours}h ${tamagotchi.age.minutes}m`,
        reason: deathReason,
        date: new Date().toLocaleString()
      });
      
      updateDisplay();
    }
  }

  // Acciones del Tamagotchi
  function performAction(action) {
    if (tamagotchi.isDead) return;
    if (tamagotchi.isSleeping && action !== 'despertar') {
      showNotification("¡Shhh! Está durmiendo 💤");
      return;
    }
    
    switch(action) {
      case 'comer':
        tamagotchi.stats.hunger = Math.min(100, tamagotchi.stats.hunger + 30);
        tamagotchi.stats.hygiene = Math.max(0, tamagotchi.stats.hygiene - 5);
        elements.petGif.src = gifs.contenta;
        showStatusMessage("¡Ñam ñam! Delicioso 🍎", 2000);
        setTimeout(() => updatePetGif(), 2000);
        break;
        
      case 'asearse':
        tamagotchi.stats.hygiene = Math.min(100, tamagotchi.stats.hygiene + 40);
        elements.petGif.src = gifs.contenta;
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
        elements.petGif.src = gifs.jugando;
        showStatusMessage("¡Esto es divertido! 🎮", 2000);
        setTimeout(() => updatePetGif(), 2000);
        break;
    }
    
    updateDisplay();
  }

  // Mecánica de sueño
  function startSleeping() {
    if (tamagotchi.isDead) return;
    if (tamagotchi.isSleeping) {
      wakeUp();
      return;
    }
    
    tamagotchi.isSleeping = true;
    elements.sleepOverlay.style.display = 'flex';
    showStatusMessage("Zzzzz... 💤");
    updatePetGif();
    
    let sleepTime = 5 * 60; // 5 minutos en segundos
    let sleepInterval = setInterval(() => {
      sleepTime--;
      
      // Actualizar temporizador visual
      let minutes = Math.floor(sleepTime / 60);
      let seconds = sleepTime % 60;
      elements.sleepTimer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
      
      // Actualizar círculo de progreso
      let progress = 326.7 - ((sleepTime / (5 * 60)) * 326.7);
      elements.sleepProgress.style.strokeDashoffset = progress;
      
      // Recuperar energía mientras duerme
      if (sleepTime % 10 === 0) {
        tamagotchi.stats.energy = Math.min(100, tamagotchi.stats.energy + 10);
        updateDisplay();
      }
      
      // Despertar cuando termine el tiempo
      if (sleepTime <= 0) {
        clearInterval(sleepInterval);
        wakeUp();
      }
    }, 1000);
  }

  function wakeUp() {
    tamagotchi.isSleeping = false;
    elements.sleepOverlay.style.display = 'none';
    showStatusMessage("¡Buenos días! 🌞", 2000);
    updatePetGif();
    updateDisplay();
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
    if (tamagotchi.deathHistory.length === 0) {
      alert("No hay historial de mascotas anteriores.");
      return;
    }
    
    let historyText = "📜 Historial de Mascotas:\n\n";
    tamagotchi.deathHistory.forEach((pet, index) => {
      historyText += `#${index + 1}: ${pet.name}\n`;
      historyText += `Edad: ${pet.age}\n`;
      historyText += `Causa: ${pet.reason}\n`;
      historyText += `Fecha: ${pet.date}\n\n`;
    });
    
    alert(historyText);
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

  // Exponer funciones globales
  window.performAction = performAction;
  window.startSleeping = startSleeping;
  window.openGameModal = openGameModal;
  window.closeGameModal = closeGameModal;
  window.showNameModal = showNameModal;
  window.showDeathHistory = showDeathHistory;
});