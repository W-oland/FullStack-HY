const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())

morgan.token('data', function (req) {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.use(cors())

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

app.get('/api/persons', (req,res) => {
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const person = req.body
  person.id = Math.random()

  if(!person.name || !person.number) {
    return res.status(400).json({
      error:'content missing'
    })
  } else if (persons.find(x => x.name === person.name)) {
    return res.status(400).json({
      error:'name must be unique'
    })
  }

  persons = persons.concat(person)
  res.json(person)
})

const port = process.env.port || 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
