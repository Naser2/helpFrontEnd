# helpFrontEnd

//Form for sign up
//Form for log in
//Form for posting
//Form for editing


# Pokemon Teams!

Here you're going to help us keep track of Pokemon
trainers at Flatiron School. Through their journey,
**a Pokemon trainer can only have 6 Pokemon for their
team**. If they want to add another Pokemon, they must
release one of their Pokemon first.

![Showing how the application runs from loading, adding Pokemon to a team and also releasing one](/pokemon-teams-frontend/assets/pokemon_teams.gif)

## Requirements
- When a user loads the page, they should see all
  trainers, with their current team of Pokemon.
- Whenever a user hits `Add Pokemon` and they have
  space on their team, they should get a new Pokemon.
- Whenever a user hits `Release Pokemon` on a specific
  Pokemon team, that specific Pokemon should be released from
  the team.

## Suggested HTML
A Pokemon Card can be placed within the `<main>` tags.

### Pokemon Trainer Card
```
<div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div>
```

## API
We are going to be using a Rails backend to support our requests. In order to have this working,
you want to make sure you go to your Terminal and run the following code below:

    $ cd pokemon-teams-backend # Change into the directory
    $ bundle install           # Install the appropriate dependencies/gems
    $ rails db:migrate         # Migrate the database
    $ rails db:seed            # Seed the database
    $ rails server             # Start the server

You will want to make sure this is running in a terminal. When you're making requests you will
make it to `http://localhost:3000` as the base url. The documentation below should show you how
to utilize every API endpoint necessary to build the application.

### Getting All Trainers and their Pokemon
```
#=> Example Request
GET /trainers

#=> Example Response
[
  {
    "id":1,
    "name":"Prince",
    "pokemons":[
      {
        "id":140,
        "nickname":"Jacey",
        "species":"Kakuna",
        "trainer_id":1
      },
      {
        "id":141,
        "nickname":"Zachariah",
        "species":"Ditto",
        "trainer_id":1
      },
      // ...
    ]
  }
  // ...
]
```

### Adding a Pokemon
```
#=> Example Request
POST /pokemons

Required Headers:
{
  'Content-Type': 'application/json'
}

Required Body:
{
  trainer_id: 1
}

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
```

### Releasing a Pokemon
```
#=> Example Request
DELETE /pokemons/:pokemon_id

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
```




const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const getTrainers = () => {
  return fetch(TRAINERS_URL)
  .then(res => res.json())
}

const createPokemon = (trainerId) => {
  return fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': trainerId
    })
  })
  .then(res => res.json())
}

const releasePokemon = (pokemonId) => {
  return fetch(`${POKEMONS_URL}/${pokemonId}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}

let appContainer = document.querySelector('main')

getTrainers()
  .then(json => {
    json.forEach(trainer => {
      let trainerCard = document.createElement('div')
      trainerCard.setAttribute('class', 'card')
      trainerCard.dataset.id = trainer.id

      trainerCard.innerHTML = renderCard(trainer)
      trainerCard.addEventListener('click', handleButton)

      appContainer.append(trainerCard)

    })
  })


function renderCard(trainer) {
  return `<p>${trainer.name}</p>
  <button data-trainer-id="${trainer.id}">Add Pokemon</button>
  <ul>
    ${trainer.pokemons.map( pokemon => {
      return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }).join('')}
  </ul>
  `
}

function handleButton(event) {
  if(event.target.tagName === "BUTTON") {
    switch(event.target.innerText){
      case 'Add Pokemon':
        createPokemon(parseInt(event.target.dataset.trainerId))
        .then(pokemon => {
          if(!pokemon.error){
            let trainerCard = document.querySelector(`div[data-id='${pokemon["trainer_id"]}']`)
            let pokemonList = trainerCard.querySelector('ul')
            pokemonList.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
          }
        })
      break;
      case 'Release':
        let pokemonId = parseInt(event.target.dataset.pokemonId)
        event.target.parentNode.remove()
        releasePokemon(pokemonId)
      break;
    }
  }
}




"{"addToUserPosts":[{"id":1,"title":"Stipes tunc corrigo voro.","body":"Aeger centum debeo. Vapulus voveo et. Eum succedo est.\\nVado utilis audeo. Alias abscido derelinquo. Tabula vociferor abutor.\\nNostrum adsidue ventito. Abutor videlicet terror. Certo colo vobis."},{"id":2,"title":"Damnatio caput dolorem defleo.","body":"Comprehendo veritas amita. Patior tabesco cetera. Adipiscor admoveo vivo.\\nCurvus ascit audentia. Dolores ars benigne. Dens ultra cupressus.\\nUt cohibeo cunabula. Strenuus certus adhaero. Vociferor sperno vinculum."},{"id":3,"title":"Amplitudo.","body":"Aeger caelum ventito. Thorax desipio succedo. Arx attollo adultus.\\nAliquid cubo tabesco. Celebrer earum combibo. Sollers censura sono.\\nBeneficium viduo demulceo. Conventus eum peior. Volubilis addo sunt."},{"id":4,"title":"Vomer adicio sufficio.","body":"Magnam vir summa. Demitto caute consuasor. Placeat doloremque brevis.\\nVoluptate curatio universe. Auctor amissio voluntarius. Cogito curo ait.\\nCompello sed et. Stella tactus aut. Deleniti conicio similique."},{"id":5,"title":"Defero omnis solitudo debeo.","body":"Aggero alter cursus. Adicio denuncio angustus. Aut tego animus.\\nDefessus commodi hic. Cui virga coaegresco. Cinis acervus circumvenio.\\nDamno basium vero. Suasoria conforto abundans. Viriliter admoveo quaerat."},{"id":6,"title":"Dapifer consuasor velit.","body":"Canonicus umbra bene. Conventus cubicularis tredecim. Contigo tantillus utrimque.\\nAdsum callide villa. Curiositas texo arx. Conspergo aestivus absens.\\nPecunia in absque. Qui demoror conservo. Vesper clam pariatur."},{"id":7,"title":"Capto.","body":"Quia vilis clementia. Soleo et culpa. Constans aspernatur vito.\\nDecretum perspiciatis arca. Pariatur vehemens inventore. Libero dolorum verumtamen.\\nTergo aut ipsam. Vomica cruentus claustrum. Cometes cilicium attollo."},{"id":8,"title":"Curiositas.","body":"Consequatur contabesco custodia. Excepturi tumultus adopto. Alii aegre textilis.\\nMolestias conculco convoco. Deleo uxor tergum. Autus annus laborum.\\nAdstringo tonsor molestiae. Tyrannus uter trepide. Aliquid amet viduo."},{"id":9,"title":"Culpa uberrime.","body":"Umbra casso caelum. Decor curatio decens. Aeger animadverto conscendo.\\nAbduco quis praesentium. Asporto ipsam aetas. Taceo advoco auris.\\nSolus via avaritia. Iste angulus alienus. Admitto utique candidus."},{"id":10,"title":"Velum.","body":"Credo conqueror apud. Via angustus virgo. Clam ambitus denego.\\nPossimus strues adamo. Sol sapiente curto. Defessus vultuosus demonstro.\\nEt tolero voluptas. Comes cimentarius sufficio. Vultuosus averto charisma."},{"id":11,"postTitle":"gaaaa","postBody":"            sffdsff"}]}"
