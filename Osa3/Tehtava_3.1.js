const express = require('express')
const app = express()

let notes = [
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

app.get('/api/persons', (req, res) => {
    res.json(notes)
})

const port = 3002

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
