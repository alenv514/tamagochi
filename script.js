// =========================
// UTILIDADES
// =========================
const Utils = {
    clamp: (value, min, max) => Math.max(min, Math.min(max, value)),
    randomChoice: (array) => array[Math.floor(Math.random() * array.length)],
    formatTime: (minutes) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    },
    updateStats: (stats, changes) => ({
      ...stats,
      ...Object.keys(changes).reduce((acc, key) => ({
        ...acc,
        [key]: Utils.clamp(stats[key] + changes[key], 0, 100)
      }), {})
    })
  };

// =========================
// DATOS DE LA MASCOTA
// =========================
const PetData = {
  gifs: {
    contenta: 'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',
    hambrienta: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW9raWw1MjQ4anZlZzgzaWRtZWNiY2UxcXpnYWp5Znhjb2dxMHdhYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/99bCcVD9GMIBcuOlNB/giphy.gif',
    aburrida: 'https://media.giphy.com/media/l3vR3EssQ5ALagr7y/giphy.gif',
    triste: '',
    sucia: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif',
    muerta: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
    durmiendo: 'https://media.giphy.com/media/YQk8nXloVftzW/giphy.gif',
    jugando: 'https://media.giphy.com/media/11s7Ke7jcNxCHS/giphy.gif'
  },
  consejos: {
    contenta: ["¡Sigue así! Tu mascota está muy feliz", "Todo va perfecto, continúa cuidándola"],
    hambrienta: ["Dale de comer pronto", "La comida es importante para su salud"],
    aburrida: ["¡Juega con ella para animarla!", "Necesita diversión y entretenimiento"],
    triste: ["Dedícale más tiempo y cariño", "Intenta jugar o darle caricias"],
    sucia: ["Es hora de un buen baño", "La limpieza es importante para su bienestar"],
    muerta: ["Lo siento... no la cuidaste bien", "Intenta ser más atento la próxima vez"]
  },
  emocionesJugador: {
    contenta: ["¡Eres el mejor amigo del mundo!", "Gracias por cuidarme, me haces muy feliz ❤️"],
    hambrienta: ["Tengo hambre... pero no quiero molestarte 😔", "Solo quería decirte que te extraño cuando no estás."],
    aburrida: ["¿Jugamos un rato? ¡Te extraño!", "Me gusta estar contigo, incluso si no hacemos nada."],
    triste: ["¿Aún me quieres?", "A veces me siento solita..."],
    sucia: ["No me siento bien así, pero sé que harás algo ❤️", "Incluso sucia, me alegra verte."],
    muerta: ["Gracias por los momentos bonitos...", "Siempre fuiste especial para mí."]
  }
};

const DeathTracker = {
  getHistory: () => JSON.parse(localStorage.getItem('pet-death-history') || '[]'),
  addDeath: (petData) => {
    const history = DeathTracker.getHistory();
    const deathEntry = {
      name: petData.name,
      age: petData.age,
      reason: petData.deathReason,
      date: new Date().toLocaleString('es-ES'),
      finalStats: { ...petData.stats }
    };
    history.unshift(deathEntry); // Agregar al inicio
    if (history.length > 20) history.pop(); // Mantener solo 20 registros
    localStorage.setItem('pet-death-history', JSON.stringify(history));
  },
  clearHistory: () => localStorage.removeItem('pet-death-history')
};

  // =========================
  // ESTADOS DE LA MASCOTA
  // =========================
  class PetState {
    constructor(name, priority = 0) {
      this.name = name;
      this.priority = priority;
    }
    canEnter(stats) { throw new Error('canEnter debe ser implementado'); }
    getGif() { throw new Error('getGif debe ser implementado'); }
    getMessage(petName) { throw new Error('getMessage debe ser implementado'); }
    getAdvice() { throw new Error('getAdvice debe ser implementado'); }
    onComer(stats) { return Utils.updateStats(stats, { hunger: 25, happiness: 5 }); }
    onJugar(stats) { return Utils.updateStats(stats, { happiness: 20, energy: -15, hygiene: -5 }); }
    onDormir(stats) { return Utils.updateStats(stats, { energy: 30, hunger: -5 }); }
    onAsearse(stats) { return Utils.updateStats(stats, { hygiene: 25, happiness: 5 }); }
    onConsejos() { return Utils.randomChoice(this.getAdvice()); }
  }
  
  class ContentaState extends PetState {
    constructor() { super('contenta', 1); }
    canEnter(s) { return s.happiness >= 70 && s.hunger >= 50 && s.energy >= 50 && s.hygiene >= 50; }
    getGif() { return PetData.gifs.contenta; }
    getMessage(n) { return `${n} está muy feliz y contenta! ✨`; }
    getAdvice() { return PetData.consejos.contenta; }
  }
  class HambrientaState extends PetState {
    constructor() { super('hambrienta', 5); }
    canEnter(s) { return s.hunger < 30; }
    getGif() { return PetData.gifs.hambrienta; }
    getMessage(n) { return `${n} tiene mucha hambre! 🍽️`; }
    getAdvice() { return PetData.consejos.hambrienta; }
    onComer(s) { return Utils.updateStats(s, { hunger: 35, happiness: 10 }); }
  }
  class AburridaState extends PetState {
    constructor() { super('aburrida', 3); }
    canEnter(s) { return s.happiness < 40 && s.energy >= 30; }
    getGif() { return PetData.gifs.aburrida; }
    getMessage(n) { return `${n} está aburrida y necesita diversión 😐`; }
    getAdvice() { return PetData.consejos.aburrida; }
    onJugar(s) { return Utils.updateStats(s, { happiness: 30, energy: -10, hygiene: -5 }); }
  }
  class TristeState extends PetState {
    constructor() { super('triste', 4); }
    canEnter(s) { return s.happiness < 25; }
    getGif() { return PetData.gifs.triste; }
    getMessage(n) { return `${n} está muy triste... necesita cariño 😢`; }
    getAdvice() { return PetData.consejos.triste; }
  }
  class SuciaState extends PetState {
    constructor() { super('sucia', 4); }
    canEnter(s) { return s.hygiene < 25; }
    getGif() { return PetData.gifs.sucia; }
    getMessage(n) { return `${n} está muy sucia y necesita un baño! 🛁`; }
    getAdvice() { return PetData.consejos.sucia; }
    onAsearse(s) { return Utils.updateStats(s, { hygiene: 40, happiness: 10 }); }
  }
  class MuertaState extends PetState {
    constructor() { super('muerta', 10); }
    canEnter(s) { return s.happiness <= 0 || s.hunger <= 0 || s.energy <= 0; }
    getGif() { return PetData.gifs.muerta; }
    getMessage(n) { return `${n} ha muerto... 💀`; }
    getAdvice() { return PetData.consejos.muerta; }
    getDeathReason(stats) {
      if (stats.happiness <= 0) return "Murió de tristeza y abandono 😢";
      if (stats.hunger <= 0) return "Murió de hambre por desnutrición 🍽️";
      if (stats.energy <= 0) return "Murió de agotamiento extremo 😴";
      return "Causa de muerte desconocida";
    }
    onComer(s) { return s; }
    onJugar(s) { return s; }
    onDormir(s) { return s; }
    onAsearse(s) { return s; }
  }
  
  class PetContext {
    constructor() {
      this.states = [
        new MuertaState(), new HambrientaState(), new SuciaState(),
        new TristeState(), new AburridaState(), new ContentaState()
      ];
      this.currentState = new ContentaState();
    }
    determineState(stats) {
      return this.states.filter(s => s.canEnter(stats))
        .reduce((best, current) => current.priority > best.priority ? current : best);
    }
    updateState(stats) {
      const newState = this.determineState(stats);
      if (newState.name !== this.currentState.name) {
        this.currentState = newState;
        return true;
      }
      return false;
    }
    performAction(action, stats) {
      const method = `on${action.charAt(0).toUpperCase() + action.slice(1)}`;
      return typeof this.currentState[method] === 'function'
        ? this.currentState[method](stats)
        : stats;
    }
    getCurrentInfo(name) {
      return {
        gif: this.currentState.getGif(),
        message: this.currentState.getMessage(name),
        advice: this.currentState.onConsejos(),
        stateName: this.currentState.name,
        isDead: this.currentState.name === 'muerta'
      };
    }
  }
  
  let gameState = {
    stats: { happiness: 100, hunger: 100, energy: 100, hygiene: 100 },
    age: 0,
    name: 'Mascotita',
    lastUpdate: Date.now()
  };
  
  const petContext = new PetContext();
  
  const degradeByTime = (stats, min) => ({
    happiness: Utils.clamp(stats.happiness - min * 0.5, 0, 100),
    hunger: Utils.clamp(stats.hunger - min * 1.5, 0, 100),
    energy: Utils.clamp(stats.energy - min * 0.8, 0, 100),
    hygiene: Utils.clamp(stats.hygiene - min * 0.7, 0, 100)
  });
  
  function loadGame() {
    const saved = localStorage.getItem('tamagotchi-state-save');
    if (saved) {
      const savedState = JSON.parse(saved);
      const timePassed = Math.floor((Date.now() - savedState.lastUpdate) / 60000);
      gameState = {
        ...savedState,
        stats: degradeByTime(savedState.stats, timePassed),
        age: savedState.age + timePassed
      };
    }
    updateDisplay();
  }
  
  function saveGame() {
    const stateToSave = { ...gameState, lastUpdate: Date.now() };
    localStorage.setItem('tamagotchi-state-save', JSON.stringify(stateToSave));
  }
  
  function updateDisplay() {
    const stateChanged = petContext.updateState(gameState.stats);
    const info = petContext.getCurrentInfo(gameState.name);

    // Si la mascota acaba de morir, registrar la muerte
    if (stateChanged && info.isDead) {
      const deathReason = petContext.currentState.getDeathReason(gameState.stats);
      gameState.deathReason = deathReason;
      document.getElementById('death-reason').textContent = deathReason;
      DeathTracker.addDeath(gameState);
    }

    document.getElementById('pet-gif').src = info.gif;
    document.getElementById('pet-name').textContent = gameState.name;
    document.getElementById('state-indicator').textContent = `Estado: ${info.stateName}`;
    
    // Efecto de nube mejorado para el mensaje
    const statusElement = document.getElementById('status-message');
    statusElement.style.animation = 'none';
    statusElement.style.opacity = '0';
    statusElement.textContent = info.message;
    
    setTimeout(() => {
      statusElement.style.animation = 'fadeInBounce 0.6s ease forwards, cloudFloat 3s ease-in-out infinite 0.6s';
    }, 50);

    document.getElementById('advice-box').textContent = info.advice;

    Object.keys(gameState.stats).forEach(stat => {
      const value = Math.round(gameState.stats[stat]);
      document.getElementById(`${stat}-value`).textContent = value;
      document.getElementById(`${stat}-bar`).style.width = value + '%';
    });
  
    document.getElementById('age').textContent = `Edad: ${Utils.formatTime(gameState.age)}`;
    document.getElementById('death-overlay').style.display = info.isDead ? 'flex' : 'none';
    updateNotifications();
    saveGame();
  }
  
  function updateNotifications() {
    const { stats } = gameState;
    const alerts = [];
    if (stats.hunger < 20) alerts.push("¡HAMBRE!");
    if (stats.happiness < 20) alerts.push("¡TRISTE!");
    if (stats.energy < 20) alerts.push("¡CANSADA!");
    if (stats.hygiene < 20) alerts.push("¡SUCIA!");
    document.getElementById("notifications").textContent = alerts.join(" ");
  }
  
  function autoAdvice() {
    petContext.updateState(gameState.stats); // Asegura el estado actual
    if (petContext.currentState.name !== "muerta") {
      const consejo = petContext.currentState.onConsejos();
      document.getElementById("advice-box").textContent = consejo;
    } else {
      document.getElementById("advice-box").textContent =
        "😢 La mascota ha fallecido. Intenta cuidarla mejor la próxima vez.";
    }
  }
  
  
  function performAction(action) {
    if (petContext.currentState.name === "muerta") return;
    const newStats = petContext.performAction(action, gameState.stats);
    gameState = { ...gameState, stats: newStats };
    updateDisplay();
  }
  
  function restartGame() {
    gameState = {
      stats: { happiness: 100, hunger: 100, energy: 100, hygiene: 100 },
      age: 0,
      name: gameState.name, // Mantener el nombre actual
      lastUpdate: Date.now()
    };
    updateDisplay();
  }

  function showNameModal() {
    document.getElementById('name-modal').style.display = 'flex';
    document.getElementById('new-pet-name').value = '';
    document.getElementById('new-pet-name').focus();
  }

  function hideNameModal() {
    document.getElementById('name-modal').style.display = 'none';
  }

  function confirmNewPet() {
    const newName = document.getElementById('new-pet-name').value.trim();
    if (newName && newName.length > 0) {
      gameState.name = newName;
      restartGame();
      hideNameModal();
    } else {
      alert('Por favor, ingresa un nombre válido para tu mascota.');
    }
  }
  
  function automaticDegrade() {
    if (petContext.currentState.name === "muerta") return;
    gameState = {
      ...gameState,
      stats: degradeByTime(gameState.stats, 1),
      age: gameState.age + 1
    };
    updateDisplay();
  }
  
  function autoMensajeEmocional() {
    petContext.updateState(gameState.stats);
    const estado = petContext.currentState.name;
    const mensajes = PetData.emocionesJugador[estado];
  
    if (mensajes && mensajes.length > 0) {
      const mensaje = Utils.randomChoice(mensajes);
      document.getElementById("status-message").textContent = mensaje;
    }
  }
  
  function initGame() {
    if (!localStorage.getItem("tamagotchi-state-save")) {
      const name = prompt("¿Cómo quieres llamar a tu mascota?", "Mascottita");
      if (name) gameState.name = name;
    }
    loadGame();
    setInterval(automaticDegrade, 60000);
    setInterval(autoAdvice, 45000);
    setInterval(autoMensajeEmocional, 5000);
    
    // Event listener para Enter en el modal de nombre
    document.getElementById('new-pet-name').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        confirmNewPet();
      }
    });
  }
  
  function showDeathHistory() {
    const history = DeathTracker.getHistory();
    const historyList = document.getElementById('death-history-list');
    
    if (history.length === 0) {
      historyList.innerHTML = '<div class="no-deaths">¡No hay mascotas muertas aún! 🎉</div>';
    } else {
      historyList.innerHTML = history.map(entry => `
        <div class="death-entry">
          <div class="death-entry-header">💀 ${entry.name}</div>
          <div class="death-entry-info">Vivió: ${Utils.formatTime(entry.age)}</div>
          <div class="death-entry-info">Fecha: ${entry.date}</div>
          <div class="death-entry-info">Stats finales: 
            ❤️${entry.finalStats.happiness} 
            🍽️${entry.finalStats.hunger} 
            ⚡${entry.finalStats.energy} 
            🧼${entry.finalStats.hygiene}
          </div>
          <div class="death-entry-reason">${entry.reason}</div>
        </div>
      `).join('');
    }
    
    document.getElementById('history-modal').style.display = 'flex';
  }
  
  function hideHistoryModal() {
    document.getElementById('history-modal').style.display = 'none';
  }
  
  window.addEventListener("load", initGame);