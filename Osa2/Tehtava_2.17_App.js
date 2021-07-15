import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const App = () => {
  const  [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ condition, setCondition] = useState('')
  
  useEffect(()=> {
    console.log('effect')
    personService
      .getAll('http://localhost:3003/persons')
      .then(initialNotes => {
        console.log('promise fulfilled')
        setPersons(initialNotes)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personsToShow = condition
  ? persons.filter(person => person.name.toLowerCase().search(condition.toLowerCase()) !== -1)
  : persons
  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Submitted: ', event.target)
    
    const personObject = {
      name: newName, 
      number: newNumber
    }

    if(persons.filter(e => e.name === newName).length > 0) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
        .then(returnedNote =>{
          console.log(returnedNote)
          setPersons(persons.concat(returnedNote))
          setNewName('') // This clears the "state"
          setNewNumber('')
          console.log(persons)
        })
      }

  }

    const handleName = (event) => {
      console.log('Changed name (state): ', event.target.value)
      setNewName(event.target.value)
    }

    const handleNumber = (event) => {
      console.log('Changed number (state): ', event.target.value)
      setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
      console.log('Changed search (state)', event.target.value)
      setCondition(event.target.value)
    }

    const handleDelete = (id, name) => {
      if (window.confirm(`Delete ${name}?`)) {
        personService
          .deleteObject(id)
          .then(() => {
            personService
              .getAll()
              .then(contacts => {
                const arr = contacts
                setPersons(arr)
              })
          })
      }
    }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        value={condition}
        onChange={handleSearch}
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleName}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>
            {person.name} {person.number}
            <button onClick={
              () => handleDelete(
                person.id, person.name
              )
            }>
              Delete
            </button>
          </li>
          )}
      </ul>
    </div>
  )

}

export default App
