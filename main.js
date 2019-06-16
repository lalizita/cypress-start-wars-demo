let peopleList = null

renderResponse = person => {
  let card = ''
  person.forEach((item) => {
    card += renderCard(item)
  })
  return card
}

renderCard = person => `
    <div data-test="person">
      <p data-test="person-name">nome: ${person.name}</p>
      <p>gênero: ${person.gender}</p>
      <p>nascimento: ${person.birth_year}</p>
      <p>cor dos olhos: ${person.eye_color}</p>
      <p>cor do cabelo: ${person.hair_color}</p>
    </div>
`

const getPeople = () => {
  const req = new XMLHttpRequest()
  req.open("GET", "https://swapi.co/api/people")
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      const response = JSON.parse(req.responseText)
      peopleList = response.results
      document.getElementById("content").innerHTML = renderResponse(response.results)
    }
  };
  req.send()
  // fetch('https://swapi.co/api/people')
  // .then(res => res.json())
  // .then(({results}) => {
  //   peopleList = results
  //   document.getElementById("content").innerHTML = renderResponse(results)
  // })
  // .catch(err => {
  //   document.getElementById("error-text").innerHTML = err 
  // })
}

const validateForm = value => {
  if(!value) throw 'campo obrigatório'
}

document.getElementById("seach-form").addEventListener("submit", e => {
  e.preventDefault()
  document.getElementById("error-text").innerHTML = ''
  const fieldValue = document.getElementById("search-field").value
  try{
    validateForm(fieldValue)
    console.log(peopleList)
    const findPerson = peopleList.find((per) => fieldValue.toLowerCase() === per.name.toLowerCase())
    if(!findPerson) throw 'Personagem não encontrado'
    document.getElementById("content").innerHTML  = renderCard(findPerson)
  }catch(err){
    document.getElementById("error-text").innerHTML = err
  }
})

getPeople()