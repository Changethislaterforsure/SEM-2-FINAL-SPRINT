const animationBox = document.getElementById('animation-box');

animationBox.addEventListener('click', (e) => {
  const shape = document.createElement('div');

  
  const types = ['circle', 'square', 'triangle'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  shape.classList.add('shape', randomType);

  
  if (randomType !== 'triangle') {
    shape.style.background = getRandomColor();
  }

  
  const boxRect = animationBox.getBoundingClientRect();
  const size = 40;
  const x = e.clientX - boxRect.left - size / 2;
  const y = e.clientY - boxRect.top - size / 2;

  shape.style.left = `${x}px`;
  shape.style.top = `${y}px`;

  animationBox.appendChild(shape);
});


function getRandomColor() {
  const colors = ['#ff006e', '#00f5d4', '#8338ec', '#ffbe0b', '#fb5607'];
  return colors[Math.floor(Math.random() * colors.length)];
}

const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');

let winCount = 0;
let playerHP = 100;
let opponentHP = 100;
let selectedPokemon = null;

// POKEMON
startBtn.addEventListener('click', startGame);

function startGame() {
  winCount = 0;
  selectedPokemon = null;
  showPokemonChoices();
}

function showPokemonChoices() {
  gameScreen.innerHTML = `<p>Choose your Pokémon!</p>`;
  const promises = [];

  for (let i = 0; i < 3; i++) {
    const id = Math.floor(Math.random() * 151) + 1;
    promises.push(fetchPokemonWithMoves(id));
  }

  Promise.all(promises).then(pokemonList => {
    pokemonList.forEach(pokemon => {
      const img = document.createElement('img');
      img.src = pokemon.sprite;
      img.classList.add('pokemon-choice');
      img.title = pokemon.name;
      img.addEventListener('click', () => {
        selectedPokemon = pokemon;
        beginBattleLoop();
      });
      gameScreen.appendChild(img);
    });
  });
}

async function beginBattleLoop() {
  if (winCount >= 10) {
    showEndScreen(true);
    return;
  }

  playerHP = 100;
  opponentHP = 100;

  const player = selectedPokemon;
  const opponent = await fetchPokemonWithMoves(Math.floor(Math.random() * 151) + 1);

  displayBattle(player, opponent);
}

function displayBattle(player, opponent) {
  gameScreen.innerHTML = `
    <h3>Battle ${winCount + 1}</h3>
    <div>
      <p>Your Pokémon: ${player.name} (${player.type})</p>
      <img src="${player.sprite}">
      <p>HP: ${playerHP}</p>
    </div>
    <div>
      <p>Opponent: ${opponent.name} (${opponent.type})</p>
      <img src="${opponent.sprite}">
      <p>HP: ${opponentHP}</p>
    </div>
    <div id="move-buttons"><h4>Choose Your Move:</h4></div>
  `;

  const buttonBox = document.getElementById('move-buttons');
  player.moves.forEach(move => {
    const btn = document.createElement('button');
    btn.textContent = `${move.name} (${move.type})`;
    btn.addEventListener('click', async () => {
      const effectiveness = await getEffectiveness(move.type, opponent.type);
      const damage = Math.floor((move.power / 10) * effectiveness);
      opponentHP -= damage;

      if (opponentHP <= 0) {
        winCount++;
        gameScreen.innerHTML += `<p style="color:lime;">You defeated ${opponent.name}!</p>`;
        setTimeout(beginBattleLoop, 2000);
      } else {
        opponentTurn(player, opponent);
      }

      displayBattle(player, opponent);
    });
    buttonBox.appendChild(btn);
  });
}

async function opponentTurn(player, opponent) {
  const move = opponent.moves[Math.floor(Math.random() * opponent.moves.length)];
  const effectiveness = await getEffectiveness(move.type, player.type);
  const damage = Math.floor((move.power / 10) * effectiveness);
  playerHP -= damage;

  if (playerHP <= 0) {
    showEndScreen(false);
  }
}

function showEndScreen(won) {
  gameScreen.innerHTML = won
    ? `<h2 style="color:lime;">YOU WIN! 🎉</h2><button id="restart-btn">Play Again</button>`
    : `<h2 style="color:red;">YOU LOSE 💀</h2><button id="restart-btn">Try Again</button>`;

  document.getElementById('restart-btn').addEventListener('click', startGame);
}

async function fetchPokemonWithMoves(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  const levelUpMoves = data.moves.filter(move =>
    move.version_group_details.some(
      detail => detail.move_learn_method.name === 'level-up'
    )
  );

  const selected = [];
  while (selected.length < 4 && levelUpMoves.length > 0) {
    const rand = Math.floor(Math.random() * levelUpMoves.length);
    const move = levelUpMoves.splice(rand, 1)[0];
    const moveData = await fetch(move.move.url).then(res => res.json());
    if (moveData.power && moveData.type) {
      selected.push({
        name: moveData.name,
        type: moveData.type.name,
        power: moveData.power
      });
    }
  }

  return {
    id: data.id,
    sprite: data.sprites.front_default,
    name: data.name,
    baseXP: data.base_experience,
    type: data.types[0].type.name,
    moves: selected
  };
}

async function getEffectiveness(attackType, targetType) {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${attackType}`);
  const data = await res.json();

  if (data.damage_relations.double_damage_to.some(t => t.name === targetType)) return 2;
  if (data.damage_relations.half_damage_to.some(t => t.name === targetType)) return 0.5;
  if (data.damage_relations.no_damage_to.some(t => t.name === targetType)) return 0;
  return 1;
}

document.getElementById('load-video').addEventListener('click', () => {
    const input = document.getElementById('youtube-link').value;
    const videoId = extractVideoID(input);
    const container = document.getElementById('video-container');
  
    if (videoId) {
      container.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${videoId}" 
          allowfullscreen 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
      `;
    } else {
      container.innerHTML = `<p style="color:red;">Invalid YouTube URL</p>`;
    }
  });
  
  
  function extractVideoID(url) {
    const regex = /(?:youtube\.com.*(?:v=|\/embed\/)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }