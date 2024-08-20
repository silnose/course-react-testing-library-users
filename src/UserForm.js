import { useState } from "react";

const UserForm = ({ onUserAdd }) => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        onUserAdd({ email, name });
        clearFields();

    };
    const clearFields = () => {
        setEmail('');
        setName('');
    }

    return (
        <form onSubmit={handleSubmit}>

            <div>
            <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>

            <div>
            <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
export default UserForm;