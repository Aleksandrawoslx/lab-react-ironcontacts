
import './App.css';
import contacts from './contacts.json'

import {useState} from "react"

let fiveArr = contacts.slice(0,5)
let restArr = contacts.slice(5, contacts.length)

const trophy = (hasWon) => {
  if (hasWon) {
    return "🏆"
  }
  else {
    return ""
  }
}


function App() {
  const [people, setPeople] = useState(fiveArr)

  const sortName = () => {
    let peopleCopy = [...people];

    peopleCopy.sort((a,b) => {
      if ((a.name).split(" ")[1] > (b.name).split(" ")[1] ) {
        return 1
      }
      if ((a.name).split(" ")[1] < (b.name).split(" ")[1] ) {
        return -1
      }

    })

    setPeople(peopleCopy)
  }

  const sortPopularity = () =>{
    let peopleCopy = [...people];

    peopleCopy.sort((a,b)=>{
      return b.popularity - a.popularity
    })
    setPeople(peopleCopy)
  }

  const addPerson = () => {
    const randNum = Math.floor(Math.random() * restArr.length)
    let person = restArr.splice(randNum, 1)
    setPeople((previous) => {
      return previous.concat(person)
    })
  }
  
  const deletePerson = (e) =>{
    let peopleCopy = [...people];
    peopleCopy = peopleCopy.filter((element)=>{
      return element.id != e.target.id
    })
    setPeople(peopleCopy)
     
  }

  return (
    <div className="App">
      <h1>THE people</h1>
      <div className='controls'>
        <button onClick={addPerson}>Add person</button>
        <button onClick={sortName}>Sort by name</button>
        <button onClick={sortPopularity}>Sort by popularity</button>
      </div>
      
        <table>
          {/* Table Header */}
          <thead>
            <tr>
              <th>
                picture
              </th>
              <th>
                name
              </th>
              <th>
                popularity
              </th>
              <th>Oscar?</th>
              <th>Emmy?</th>
            </tr>
          </thead>
          {/* Table Header */}

          {/* Table Body */}
          <tbody>
          {people.map(person => {
            return (
              <tr key={person.id}>
              <td><img className="personImg" alt ={person.name} src={person.pictureUrl}/></td>
              <td>{person.name}</td>
              <td>{person.popularity}</td>
              <td>{trophy(person.wonOscar)}</td>
              <td>{trophy(person.wonEmmy)}</td>
              <td>
                <button id ={person.id} onClick={deletePerson}>Delete</button>
              </td>
            </tr>
            )
          })}
            

          </tbody>

          {/* Table Body */}

        </table>
        
    </div>
  );
}

export default App;
