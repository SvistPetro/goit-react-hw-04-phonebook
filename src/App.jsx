import { useState, useEffect, useRef } from "react";
import { Form } from 'components/Form/Form';
import { ContactList } from "./components/ContactList/ContactList";
import { Filter } from "./components/Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(false);

  useEffect(() => {
    const localStoregeContacts = localStorage.getItem('contacts');
    const parcedContacts = JSON.parse(localStoregeContacts);

    if (parcedContacts) {
      setContacts(parcedContacts);
    }
  }, [])

  useEffect(() => {
    if (firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddContact = formData => {
    
    const duplicate = contacts.some(contact => contact.name.toLowerCase() === formData.name.toLowerCase());
    
    if(duplicate) {
      alert(`${formData.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, formData]);
    firstRender.current = true;
  }

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    firstRender.current = true;
  }

  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
 
  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={handleAddContact}/>

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
          <>
            <Filter value={filter} onChange={handleChangeFilter}/>
            <ContactList contacts={handleFilteredContacts()} onDelete={handleDeleteContact}/>
          </>
        ) : (
          <p>Your phonebook is empty. Add first contact!</p>
        )
      }
      
    </div>
  );
}

// export class App extends Component {

//   state = {
//     contacts: [],
//     filter: ''
//   }

//   handleAddContact = formData => {
//     console.log(formData);

//     const duplicate = this.state.contacts.some(contact => contact.name.toLowerCase() === formData.name.toLowerCase());
    
//     if(duplicate) {
//       alert(`${formData.name} is already in contacts`);
//       return;
//     }

//     this.setState(prevState => {return {contacts: [...prevState.contacts, formData]}});
//   }

//   handleDeleteContact = (contactId) => {
//     this.setState({contacts: this.state.contacts.filter(contact => contact.id !== contactId)});
//   }

//   handleChangeFilter = (event) => {
//     this.setState({filter: event.target.value});
//   }

//   componentDidMount (){
//     const contacts = localStorage.getItem('contacts');
//     const parcedContacts = JSON.parse(contacts);

//     if (parcedContacts) {
//       this.setState({contacts: parcedContacts});
//     }
//   }

//   componentDidUpdate (prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {

//     const filteredContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.trim().toLowerCase()));

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <Form onSubmit={this.handleAddContact}/>

//         <h2>Contacts</h2>
//         <Filter value={this.state.filter} onChange={this.handleChangeFilter}/>
//         <ContactList contacts={filteredContacts} onDelete={this.handleDeleteContact}/>
//       </div>
//     );
//   }
// }
