const express = require('express')
const app = express()

let persons = [
  {
      id:1,
      name: "Arto Hellas",
      number: "040-123456"
  },
  {
      id:2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
  },
  {
      id:3,
      name: "Dan Abramov",
      number: "12-43-245435"
  },
  {
      id:4,
      name: "Mary Poppendick",
      number: "39-23-62345436"
  }
]



app.get('/persons', (req,res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {

  const max = persons.length > 0
  ? Math.max(...persons.map(person => person.id))
  : 0

  res.send(`<p>Phonebook has info for ${max} people</p>
            <p>${new Date()}</p>`
  )
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
