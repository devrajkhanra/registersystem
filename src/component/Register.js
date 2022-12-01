import { useRef, useState, useEffect } from "react";
import { MdInfo } from "react-icons/md";
import { TfiCheck, TfiClose } from 'react-icons/tfi'

import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState("");
    const [validUser, setValidUser] = useState("");
    const [focusUser, setFocusUser] = useState("");

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState("");
    const [focusPassword, setFocusPassword] = useState("");

    const [match, setMatch] = useState("");
    const [validMatch, setValidMatch] = useState("");
    const [focusMatch, setFocusMatch] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // First time when the component loads
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // Whenever username changes we validate the username with the user regex
    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUser(result);
    }, [username]);

    // Whenever password changes we validate the password with the password regex
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);

        const passwordMatch = password === match;
        setValidMatch(passwordMatch);
    }, [password, match]);

    // Whenever there is any changes in either username or password or match then we clear the error
    useEffect(() => {
        setError("");
    }, [username, password, match]);

    // Form submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);

        const response = await axios.post(REGISTER_URL, JSON.stringify({ username, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })

        console.log(response.data)
        console.log(response.accessToken)
        console.log(JSON.stringify(response))
        setSuccess(true);

        if (!error?.response) {
            setError('No server Response')
        } else if (error.response?.status === 409) {
            setError('Username Taken')
        } else {
            setError('Registration Failed')
        }
    };

    return (
        <>
            {success ? (
                <section className="grid place-items-center min-w-xs">
                    <h1 className="mb-5 text-center font-thin text-4xl text-slate-600">
                        Success!
                    </h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section
                    className="grid place-items-center min-w-xs bg-gradient-to-r from-purple-100 to-blue-100"
                >
                    <p
                        ref={errRef}
                        className={error ? "text-xl text-slate-100" : "hidden"}
                        aria-live="assertive"
                    >
                        {error}
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className=" shadow-md min-w-xs w-[27%] py-5 px-10 bg-white">

                        <h1 className="my-5 font-semibold text-2xl text-slate-700">
                            Register
                        </h1>

                        {/* Username */}
                        <div className={`min-w-[100%] inline-flex items-baseline focus:outline-none focus:border-blue-800 ${validUser ? 'border-b border-green-500' : validUser === '' ? 'border-b border-blue-500' : 'border-b border-red-500'}`}>

                            <input
                                id="username"
                                className={`min-w-[93%] font-thin placeholder:text-slate-800 text-xl focus:border-none focus:outline-none`}
                                type="text"
                                placeholder="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-invalid={validUser ? "false" : "true"}
                                aria-labelledby="usernamenote"
                                onFocus={() => setFocusUser(true)}
                                onBlur={() => setFocusUser(false)} />

                            <span
                                className={` ${validUser ? "text-green-600 ease-in-out duration-1000" : "hidden"
                                    }`}>
                                <TfiCheck />
                            </span>
                            <span
                                className={` ${validUser || !username ? "hidden" : "text-red-600 ease-in-out duration-1000"
                                    }`}>
                                <TfiClose /></span>
                        </div>
                        <p
                            id="usernamenote"
                            className={`text-black ${focusUser && username && !validUser
                                ? "pt-2 font-normal"
                                : "hidden"
                                }`}
                        >
                            <MdInfo className="text-red-600" />
                            4 to 24 characters,
                            <br />
                            Must begin with a Letter,
                            <br />
                            Letters, numbers, underscores, hypens allowed.
                        </p>

                        {/* Password */}
                        <div className={`min-w-[100%] inline-flex items-baseline focus:outline-none focus:border-blue-800 ${validPassword ? 'border-b border-green-500' : validPassword === '' ? 'border-b border-blue-500' : 'border-b border-red-500'}`}>
                            <input
                                id="password"
                                className={`mt-5 min-w-[93%] font-thin placeholder:text-slate-800 text-xl focus:border-none focus:outline-none`}
                                type="password"
                                placeholder='password'
                                // ref={userRef}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-labelledby="passwordnote"
                                onFocus={() => setFocusPassword(true)}
                                onBlur={() => setFocusPassword(false)}
                            />
                            <span
                                className={` ${validPassword ? "text-green-600" : "hidden"
                                    }`}
                            >
                                <TfiCheck />
                            </span>
                            <span
                                className={`${validPassword || !password
                                    ? "hidden"
                                    : "text-red-600"
                                    }`}
                            >
                                <TfiClose />
                            </span>
                        </div>

                        <p
                            id="passwordnote"
                            className={`text-black ${focusPassword && password && !validPassword
                                ? "pt-2 font-normal"
                                : "hidden"
                                }`}
                        >
                            <MdInfo className="text-red-600" />
                            8 to 24 characters,
                            <br />
                            Must include uppercase and lowercase letters, a number and a
                            special character
                            <br />
                        </p>

                        {/* Confirm Password */}
                        <div className={`min-w-[100%] inline-flex items-baseline focus:outline-none focus:border-blue-800 ${validMatch ? 'border-b border-green-500' : validMatch === '' ? 'border-b border-blue-500' : 'border-b border-red-500'}`}>
                            <input
                                id="confirmPassword"
                                className={`mt-5 min-w-[93%] font-thin placeholder:text-slate-800 text-xl focus:border-none focus:outline-none`}
                                type="password"
                                // ref={userRef}
                                onChange={(e) => setMatch(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-labelledby="confirmnote"
                                onFocus={() => setFocusMatch(true)}
                                onBlur={() => setFocusMatch(false)}
                            />
                            <span
                                className={` ${validMatch && match ? "text-green-600 font-bold" : "hidden"
                                    }`}
                            >
                                <TfiCheck />
                            </span>
                            <span
                                className={` ${validMatch || !match ? "hidden" : "text-red-600 text-"
                                    }`}
                            >
                                <TfiClose />
                            </span>
                        </div>

                        <p
                            id="confirmnote"
                            className={`text-black ${focusMatch && match && !validMatch
                                ? "pt-2 font-normal"
                                : "hidden"
                                }`}
                        >
                            <MdInfo className="text-red-600" />
                            Must match with the above password field
                            <br />
                        </p>

                        {/* Submit button */}
                        <div className="flex flex-row justify-end">
                            <button
                                className={` px-7 hover:cursor min-w-[25%] mt-6 mb-4 py-1 font-normal text-md ${validUser && validPassword && validMatch
                                    ? "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
                                    : "bg-slate-400 text-white hover:shadow-xl hover:text-slate-50 cursor-not-allowed"
                                    }`}
                                disabled={
                                    !validUser || !validPassword || !validMatch ? true : false
                                }
                            >
                                Submit
                            </button>
                        </div>

                        <p className="text-center font-thin text-slate-800">
                            Already Registered?
                            <br />
                            <span>
                                <a href="#" className="text-blue-900 hover:text-black hover:font-normal hover:px-2">
                                    Sign In
                                </a>
                            </span>
                        </p>
                    </form>
                </section>
            )}
        </>
    );
};

export default Register;

