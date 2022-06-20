import { useState } from 'react'
import Cookies from 'js-cookie'

function handleError(err) {
    console.warn(err);
}

const LoginScreen = ({ setIsAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const data = {
            'username': username,
            'password': password
        }

        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            },
            body: JSON.stringify(data)
        }

        const response = await fetch('/dj-rest-auth/login/', options).catch(handleError);

        if (!response.ok) {
            throw new Error('Netowrk reponse is not ok');
        }

        const json = await response.json();

        Cookies.set('Authorization', `Token ${json.key}`);
        setIsAuth(true);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name='username' id='username' value={username} placeholder='Username' required onChange={(e) => setUsername(e.target.value)} />
            <input type="password" name='password' id='password' value={password} placeholder='Password' required onChange={(e) => setPassword(e.target.value)} />
            <button type='submit'>Login</button>
        </form>
    );
}

export default LoginScreen