

// 1️⃣. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// 🤓 Pista: revisa el método document.querySelector()
let imgpokemon1 = document.querySelector('.pokemon-1__img');
let imgpokemon2 = document.querySelector('.pokemon-2__img');
let hp_pokemon1 = document.querySelector('.pokemon-1__hp');
let name_pokemon1 = document.querySelector('.pokemon-1__name');
let attack_pokemon1 = document.querySelector('.pokemon-1__attack');
let defense_pokemon1 = document.querySelector('.pokemon-1__defense');
let type_pokemon1 = document.querySelector('.pokemon-1__type');
let hp_pokemon2 = document.querySelector('.pokemon-2__hp');
let name_pokemon2 = document.querySelector('.pokemon-2__name');
let attack_pokemon2 = document.querySelector('.pokemon-2__attack');
let defense_pokemon2 = document.querySelector('.pokemon-2__defense');
let type_pokemon2 = document.querySelector('.pokemon-2__type');

// Selectores para el Pokemon 1



// Selectores para el Pokemon 2

// 2️⃣. Miremos ahora la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// La API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// 🤓 Pista: Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

const getPokemon = async (pokeID) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
};
// 3️⃣ - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta: 👩🏻‍💻
/* const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
}; */
const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
};


// 4️⃣ - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos
let poke1ID = getRandomNumber(1, 900);
let poke2ID = getRandomNumber(1, 900);

// 🤓 Pista: algo como ... const poke1ID = getRandomNumber(1, 900);

// 5️⃣ - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}


//Puedes usar esta: 👩🏻‍💻
/* const getPokemon = async (pokeID) => {
  const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
}; */


// 6️⃣ - Vamos a crear los pokemons en la función createPokemons.
// Primero Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// 🤓 Pista: - Crea una función asíncrona que reciba los 2 ID de los pokemon, es decir los números que obtenemos de llamar la función random
//           - Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
//           - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

let createPokemons = async (poke1ID, poke2ID) => {
  const pokemon1 = await getPokemon(poke1ID);
  console.log('pokemon',pokemon1);
  const pokemon2 = await getPokemon(poke2ID);

  imgpokemon1.src = pokemon1.sprites.other["official-artwork"]["front_default"];
  hp_pokemon1.innerHTML = pokemon1.stats[0].base_stat;
  name_pokemon1.innerHTML = pokemon1.name;
  defense_pokemon1.innerHTML = pokemon1.stats[2].base_stat;
  attack_pokemon1.innerHTML = pokemon1.stats[1].base_stat;
  type_pokemon1.innerHTML = pokemon1.types[0].type.name;

  imgpokemon2.src = pokemon2.sprites.other["official-artwork"]["front_default"];
  hp_pokemon2.innerHTML = pokemon2.stats[0].base_stat;
  name_pokemon2.innerHTML = pokemon2.name;
  defense_pokemon2.innerHTML = pokemon2.stats[2].base_stat;
  attack_pokemon2.innerHTML = pokemon2.stats[1].base_stat;
  type_pokemon2.innerHTML = pokemon2.types[0].type.name;
}

// 🎁 Bonus! - Vamos a crear la función fightPokemons que permitirá que los pokemons interactúen y peleen

// 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.

const fightPokemons = () => {

  const pokemon1 = {
    name: name_pokemon1.innerHTML,
    hp: parseInt(hp_pokemon1.innerHTML),
    attack: parseInt(attack_pokemon1.innerHTML),
    defense: parseInt(defense_pokemon1.innerHTML)
  };
  const pokemon2 = {
    name: name_pokemon2.innerHTML,
    hp: parseInt(hp_pokemon2.innerHTML),
    attack: parseInt(attack_pokemon2.innerHTML),
    defense: parseInt(defense_pokemon2.innerHTML)
  };

  // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
  // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
  const calculateDamage = (attacker, defender) => {
    const damage = attacker.attack - defender.defense;
    const newHP = defender.hp - (damage > 0 ? damage : 0);
    return { newHP: newHP > 0 ? newHP : 0, damage: damage > 0 ? damage : 0 };
  };
  // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
  // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -


  // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
  // Empecemos con el Pokemon 1.
  let battleText = "";
  const result1 = calculateDamage(pokemon1, pokemon2);
  battleText += `${pokemon1.name} ataca a ${pokemon2.name}. `;
  if (result1.damage > 0) {
    battleText += `¡Logra perforar su defensa! ${pokemon2.name} recibe ${result1.damage} de daño y le quedan ${result1.newHP} puntos de vida.\n`;
  } else {
    battleText += `No logra superar la defensa de ${pokemon2.name}.\n`;
  }
  const result2 = calculateDamage(pokemon2, pokemon1);
  battleText += `${pokemon2.name} ataca a ${pokemon1.name}. `;
  if (result2.damage > 0) {
    battleText += `¡Logra perforar su defensa! ${pokemon1.name} recibe ${result2.damage} de daño y le quedan ${result2.newHP} puntos de vida.\n`;
  } else {
    battleText += `No logra superar la defensa de ${pokemon1.name}.\n`;
  }

  // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño
  if (result1.damage > result2.damage) {
    battleText += `¡${pokemon1.name} es el ganador!`;
  } else if (result2.damage > result1.damage) {
    battleText += `¡${pokemon2.name} es el ganador!`;
  } else {
    battleText += "¡Es un empate!";
  }

  document.querySelector('.modal__text').innerHTML = battleText;
};

fightPokemons.addEventListener
// Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
// y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
// Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.


// Ahora el Pokemon2, mismo procedimiento.


// Definamos el ganador que sería el más daño haya hecho al otro pokemon.
// Recordemos que los puntos de daño son negativos!!
// - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
// - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
// - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.



// 7️⃣ - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// 🤓 Pista: - Seleccionar el elmento HTML del botón
//           - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )
// 🕵🏻‍♀️ En nuestra app tenemos 3 botones. El de Catch!, Fight! y el que OK! que aparece en el modal cuando pelean los pokemons
// Cada botón tendrá atado un eventListener que vamos a construir juntos ❤️

// Botón para obtener nuevos Pokémon

let catchButton = document.querySelector('.button__catch');

createPokemons(poke1ID, poke2ID);

catchButton.addEventListener('click', () => {
  window.location.reload();
});

// Botón para iniciar la batalla
let fightButton = document.querySelector('.button__fight');
fightButton.addEventListener('click', () => {
  fightPokemons();
  document.querySelector('.modal').style.display = 'block';
});

// Botón para cerrar el modal después de la batalla
let modalCloseButton = document.querySelector('.button__modal');
modalCloseButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
});
