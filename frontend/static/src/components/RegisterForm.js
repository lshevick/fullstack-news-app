import { useState } from "react"
import Cookies from "js-cookie"
import { Link } from "react-router-dom";

function handleError(err) {
    console.warn(err);
}

const defaultState = {
    username: '',
    email: '',
    password1: '',
    passoword2: '',
}


const RegisterForm = ({ setScreen }) => {
    const [state, setState] = useState(defaultState)
    const [registered, setRegistered] = useState(false)

    const handleInput = e => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch('/dj-rest-auth/registration/', options).catch(handleError);
        if (!response.ok) {
            throw new Error('Network response is not ok')
        }

        const json = await response.json();

        Cookies.set('Authorization', `${json.key}`);
        setRegistered(true);
        setState(defaultState);

    }

    const isRegistered = (
        <div>
            <p>Thank you for signing up!</p>
            {/* <button type="button" onClick={() => setScreen('login')} className='underline font-bold'>Login</button> */}
            <Link to='/login'>Login</Link>

        </div>
    )


    return (
        // <>
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1 className='p-3 my-3 font-bold text-3xl font-serif'>NEWS APP</h1>


            <form className='flex flex-col text-left bg-neutral-500 p-5 px-10 rounded-md h-1/3 justify-between' onSubmit={handleSubmit}>
                    <label htmlFor="username" aria-label="username"></label>
                    <input className="bg-neutral-200 p-1 rounded-md text-black" placeholder="Username" type="text" name="username" id="username" value={state.username} autoComplete='off' required onChange={handleInput} />
                    <label htmlFor="email" aria-label="email"></label>
                    <input className="bg-neutral-200 p-1 rounded-md text-black" placeholder="E-Mail" type="text" name="email" id="email" value={state.email} autoComplete='off' required onChange={handleInput} />
                    <label htmlFor="password1" aria-label='create password'></label>
                    <input className="bg-neutral-200 p-1 rounded-md text-black" placeholder="Password" type="password" name="password1" id="password1" value={state.password1} autoComplete='off' required onChange={handleInput} />
                    <label htmlFor="password2" aria-label='re-enter password'></label>
                    <input className="bg-neutral-200 p-1 rounded-md text-black" placeholder="Re-Enter Password" type="password" name="password2" id="password2" value={state.password2} autoComplete='off' required onChange={handleInput} />
                <button type="submit" className="mt-3 bg-emerald-700 w-1/2 text-center rounded-md p-1 border-emerald-900 border-2 hover:bg-emerald-600">Register</button>

            </form>
            {/* <button className='underline m-5' type="button" onClick={() => setScreen('login')}>Back to Login</button> */}
            <Link to='/login'>Back to Login</Link>
            {registered && isRegistered}
        {/* </> */}
        </div>
    );
}

export default RegisterForm