import { useRef, useState, useEffet } from 'react'
import { MdCheck, MdInfo } from 'react-icons/md'
import { FaTimes } from 'react-icons/fa'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/


const Register = () => {

    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [validUser, setValidUser] = useState('')
    const [focusUser, setFocusUser] = useState('')

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState('')
    const [focusPassword, setFocusPassword] = useState('')

    const [match, setMatch] = useState('')
    const [validMatch, setValidMatch] = useState('')
    const [focusMatch, setFocusMatch] = useState('')

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
    }

    // // First time when the component loads
    // useEffet(() => {
    //     userRef.current.focus()
    // }, [])

    // // Whenever username changes we validate the username with the user regex
    // useEffet(() => {
    //     const result = USER_REGEX.test(username)
    //     setValidUser(result)
    // }, [username])

    // // Whenever password changes we validate the password with the password regex
    // useEffet(() => {
    //     const result = PWD_REGEX.test(password)
    //     setValidPassword(result)

    //     const passwordMatch = password === match
    //     setValidMatch(passwordMatch)
    // }, [password, match])

    // // Whenever there is any changes in either username or password or match then we clear the error
    // useEffet(() => {
    //     setError('')
    // }, [username, password, match])

    return (
        <section className='grid place-items-center'>
            <p ref={errRef} className={`bg-slate-600 ${error ? 'errMsg' : 'offscreen'}`} aria-live='assertive'>{error}</p>
            <h1 className='mt-7 font-thin text-4xl text-slate-600'>Register</h1>
            <form onSubmit={handleSubmit} className='bg-gradient-to-r from-sky-50 to-indigo-50 rounded-lg shadow-lg hover:shadow-xl max-w-xs mt-4 p-5'>




                {/* Username */}
                <label htmlFor='username'>Username:
                    <span className={validUser ? 'valid' : 'hide'}><MdCheck /></span>
                    <span className={validUser || !username ? 'hide' : 'invalid'}><FaTimes /></span>
                </label>
                <input
                    id='username'
                    className='min-w-full ring-1 rounded'
                    type='text'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUsername(e.value.target)}
                    required
                    aria-invalid={validUser ? 'false' : 'true'}
                    aria-labelledby='usernamenote'
                    onFocus={() => setFocusUser(true)}
                    onBlur={() => setFocusUser(false)} />

                <p
                    id='usernamenote'
                    className={focusUser && username && !validUser ? 'instructons' : 'offscreen'}>
                    <MdInfo />
                    4 to 24 characters<br />
                    Must begin with a letter<br />
                    Letters, numbers, underscores, hypens allowed.
                </p>



                {/* Password */}
                <label htmlFor='password'>Password:
                    <span className={validPassword ? 'valid' : 'hide'}><MdCheck /></span>
                    <span className={validPassword || !password ? 'hide' : 'invalid'}><FaTimes /></span>
                </label>
                <input
                    id='password'
                    className='min-w-full ring-1 rounded'
                    type='password'
                    ref={userRef}
                    onChange={(e) => setPassword(e.value.target)}
                    required
                    aria-invalid={validPassword ? 'false' : 'true'}
                    aria-labelledby='passwordnote'
                    onFocus={() => setFocusPassword(true)}
                    onBlur={() => setFocusPassword(false)} />
                <p
                    id='passwordnote'
                    className={focusPassword && !validPassword ? 'instructions' : 'offscreen'}>
                    <MdInfo />
                    8 to 24 characters<br />
                    Must include uppercase and lowercase letters, a number and a special character<br />
                </p>



                {/* Confirm Password */}
                <label htmlFor='confirmPassword'>
                    Confirm Password:
                    <span className={validMatch && match ? 'valid' : 'hide'}><MdCheck /></span>
                    <span className={validMatch || !match ? 'hide' : 'invalid'}><FaTimes /></span>
                </label>
                <input
                    id='confirmPassword'
                    className='min-w-full ring-1 rounded'
                    type='password'
                    ref={userRef}
                    onChange={(e) => setMatch(e.value.target)}
                    required
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-labelledby='confirmnote'
                    onFocus={() => setFocusMatch(true)}
                    onBlur={() => setFocusMatch(false)} />

                <p
                    id='confirmnote'
                    className={focusMatch && !validMatch ? 'instructions' : 'offscreen'}>
                    <MdInfo />
                    Must match the password field<br />
                </p>

                {/* Submit button */}
                <button className='bg-green-600 text-green-100 hover:text-green-50 hover:cursor w-32 rounded my-2 py-2'>Submit</button>

            </form>
        </section >
    )
}

export default Register