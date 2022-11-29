import { useRef, useState, useEffect } from "react";
import { MdCheck, MdInfo } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import './components/Registercomponent/Register.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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
        setSuccess(true);
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
                    className="grid place-items-center min-w-xs"
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
                        className=" shadow-lg hover:shadow-xl min-w-xs w-1/4 p-5 backdrop-blur-md backdrop-invert-1"
                    >
                        <h1 className="mb-5 text-center font-thin text-4xl text-slate-200">
                            Register
                        </h1>

                        {/* Username */}
                        <div className="flex flex-row">
                            <label htmlFor="username" className="font-thin text-sky-100">
                                Username:
                            </label>
                            <label
                                className={`${validUser ? "text-green-600 text-2xl" : "hidden"
                                    }`}
                            >
                                <MdCheck />
                            </label>
                            <label
                                className={` ${validUser || !username ? "hidden" : "text-red-600 text-2xl"
                                    }`}
                            >
                                <FaTimes />
                            </label>
                        </div>
                        <input
                            id="username"
                            className={`min-w-[100%] ring-1 rounded h-8 pl-4 font-thin ${validUser ? "ring-green-600" : "ring-red-600"
                                }`}
                            type="text"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            aria-invalid={validUser ? "false" : "true"}
                            aria-labelledby="usernamenote"
                            onFocus={() => setFocusUser(true)}
                            onBlur={() => setFocusUser(false)}
                        />

                        <p
                            id="usernamenote"
                            className={`text-sky-200 ${focusUser && username && !validUser
                                ? "pt-2 font-thin"
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
                        <div className="flex flex-row mt-2">
                            <label htmlFor="password" className="font-thin text-sky-100">
                                Password:
                            </label>
                            <label
                                className={` ${validPassword ? "text-green-600 text-2xl" : "hidden"
                                    }`}
                            >
                                <MdCheck />
                            </label>
                            <label
                                className={`${validPassword || !password
                                    ? "hidden"
                                    : "text-red-600 text-2xl"
                                    }`}
                            >
                                <FaTimes />
                            </label>
                        </div>
                        <input
                            id="password"
                            className={`min-w-full ring-1 rounded h-8 pl-4 font-thin ${validPassword ? "ring-green-600" : "ring-red-600"
                                }`}
                            type="password"
                            // ref={userRef}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-labelledby="passwordnote"
                            onFocus={() => setFocusPassword(true)}
                            onBlur={() => setFocusPassword(false)}
                        />
                        <p
                            id="passwordnote"
                            className={
                                focusPassword && !validPassword ? "pt-2 font-thin text-sky-100" : "hidden"
                            }
                        >
                            <MdInfo className="text-red-600" />
                            8 to 24 characters,
                            <br />
                            Must include uppercase and lowercase letters, a number and a
                            special character
                            <br />
                        </p>

                        {/* Confirm Password */}
                        <div className="flex flex-row mt-2">
                            <label
                                htmlFor="confirmPassword"
                                className="font-thin text-sky-100"
                            >
                                Confirm Password:
                            </label>
                            <label
                                className={` ${validMatch && match ? "text-green-600 text-2xl" : "hidden"
                                    }`}
                            >
                                <MdCheck />
                            </label>
                            <label
                                className={` ${validMatch || !match ? "hidden" : "text-red-600 text-2xl"
                                    }`}
                            >
                                <FaTimes />
                            </label>
                        </div>
                        <input
                            id="confirmPassword"
                            className={`min-w-full ring-1 rounded h-8 pl-4 font-thin ${validMatch ? "ring-green-600" : "ring-red-600"
                                }`}
                            type="password"
                            // ref={userRef}
                            onChange={(e) => setMatch(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-labelledby="confirmnote"
                            onFocus={() => setFocusMatch(true)}
                            onBlur={() => setFocusMatch(false)}
                        />
                        <p
                            id="confirmnote"
                            className={
                                focusMatch && !validMatch ? "pt-2 font-thin text-sky-100" : "hidden"
                            }
                        >
                            <MdInfo className="text-red-600" />
                            Must match with the above password field
                            <br />
                        </p>

                        {/* Submit button */}
                        <button
                            className={`hover:cursor min-w-full rounded mt-6 mb-4 py-2 font-thin text-xl ${validUser && validPassword && validMatch
                                ? "bg-green-400 hover:bg-green-500 text-green-100 hover:shadow-lg hover:text-white"
                                : "bg-slate-400 text-slate-100 hover:shadow-xl hover:text-slate-50 cursor-not-allowed"
                                }`}
                            disabled={
                                !validUser || !validPassword || !validMatch ? true : false
                            }
                        >
                            Submit
                        </button>

                        <p className="text-center font-thin text-sky-300">
                            Already Registered?
                            <br />
                            <span>
                                <a
                                    href="#"
                                    className="hover:text-white hover:font-normal hover:px-2"
                                >
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
