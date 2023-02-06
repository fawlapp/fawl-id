import React from "react"
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

interface errorMsg {
  code: String
}

// declaring this here temporarily
// should be moved to its own file & exported
function SignInError(props: errorMsg) {
  if (props.code !== "")
  {
    return (
        <div className="flex justify-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-1/2 mx-0 mt-7" role="alert">
                Please try logging in again
            </div>
        </div>
    )
  } else {
    return (
      <></>
    )
  }
}

function SignIn() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorC, setError] = useState("");

    useEffect(() => {

        if (typeof Cookies.get('FawlError') !== 'undefined' && Cookies.get('FawlError')){
        const cookieError = Cookies.get('FawlError');
        setError(String(cookieError))
        }

    }, []);

    async function handleSubmit(event: any) {
        event.preventDefault()

        await fetch ('https://id.fawl.app/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _user: user ?? "",
            _password: password ?? ""
        })
        }) 
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data)
        if (data.statusCode !== 200) {
            setError(String("Error"))
            console.error('unable to login')
        } else {
            window.location.href = 'https://fawl.app'
        }
        })
    }

    function onUserChangeHandler(event: any) {
        setUser(event.target.value);
    }

    function onPassChangeHandler(event: any) {
        setPassword(event.target.value);
    }

  return (
    <main className="rounded-lg overflow-hidden shadow-lg bg-white my-5 w-full text-center">
        <SignInError code={errorC} />
        <h2 className="my-6 text-xl text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
            <input className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="@username" value={user} onChange={onUserChangeHandler}></input>
            <br/><br/>
            <input className="shadow appearance-none border rounded w-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password" value={password} onChange={onPassChangeHandler}></input>
            <br />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-5 my-7" type="submit">&#8594;</button>
        </form>
    </main>
  )
}

export default SignIn;