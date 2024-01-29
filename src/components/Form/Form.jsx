import { useState } from "react";
import css from './Form.module.css';
import { nanoid } from 'nanoid'

const Form = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const onChangeName = (e) => {
        const {name, value} = e.target;

        switch (name) {
            case 'name':
                setName(value);
                break;

            case 'number':
                setNumber(value);
                break;

            default:
                return;
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const id = nanoid().toString();
        const formName = name.trim().toString();
        const formNumber = number.trim().toString();
        const finalFormData = {id, name: formName, number: formNumber};
        onSubmit(finalFormData);
        reset();
    }

    const reset = () => {
        setName('');
        setNumber('');
    }

    return (
        <form className={css.form} onSubmit={onSubmitForm}>
            <label htmlFor="name" className={css.label}>
                <span className={css.name}>Name</span>
                <input type="text" name="name" className={css.input} value={name} onChange={onChangeName} required />
            </label>
            <label htmlFor="number" className={css.label}>
                <span className={css.name}>Number</span>
                <input type="tel" name="number" className={css.input} value={number} onChange={onChangeName} required />
            </label>
            <button type="submit" className={css.button}>Add contact</button>
        </form>
    )
}

export { Form };

// class Form extends Component {
    
//     state = {
//         name: '',
//         number: ''
//     }

//     onChangeName = (e) => {
//         this.setState({[e.target.name]: e.target.value});
//       }

//     onSubmitForm = (event) => {
//     event.preventDefault();
//     const id = nanoid().toString();
//     const name = this.state.name.trim().toString();
//     const number = this.state.number.trim().toString();
//     const finalFormData = {id, name, number};
//     this.props.onSubmit(finalFormData);
//     this.reset();
//     }

//     reset = () => {
//         this.setState({
//             name: '',
//             number: ''
//         })
//     }
    
//     render() {

//         return (
//             <>
//                 <form className={css.form} onSubmit={this.onSubmitForm}>
//                     <label htmlFor="name" className={css.label}>
//                         <span className={css.name}>Name</span>
//                         <input type="text" name="name" className={css.input} value={this.state.name} onChange={this.onChangeName} required />
//                     </label>
//                     <label htmlFor="number" className={css.label}>
//                         <span className={css.name}>Number</span>
//                         <input type="tel" name="number" className={css.input} value={this.state.number} onChange={this.onChangeName} required />
//                     </label>
//                     <button type="submit" className={css.button}>Add contact</button>
//                 </form>
//             </>
//         )
//     }
// }
