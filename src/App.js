import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from './assets/config';

function App() {
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')
  const [logUser, setLogUser] = useState('')
  const [logPass, setLogPass] = useState('')
  const [user, setUser] = useState({})

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        regUser,
        regPass
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        logUser,
        logPass
      )
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
  }, [])


  return (
    <div className="App">
      <div className='register'>
        <input
          type='text'
          placeholder='email@gmail.com'
          onChange={(e) => {
            setRegUser(e.target.value)
          }}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => {
            setRegPass(e.target.value)
          }}
        />
        <input
          type='submit'
          value='Register'
          onClick={(e) => {
            register()
          }}
        />
      </div>
      <div className='login'>
        <input
          type='text'
          placeholder='email@gmail.com'
          onChange={(e) => {
            setLogUser(e.target.value)
          }}
        />
        <input
          type='password'
          placeholder='password'
          onChange={(e) => {
            setLogPass(e.target.value)
          }}
        />
        <input
          type='submit'
          value='Login'
          onClick={(e) => {
            login()
          }}
        />
      </div>
      <div className='logout'>
        {user?.email}
        <button
          onClick={(e) => {
            logout()
          }}
        >
          Logout
        </button>
      </div>
      <div>
        <button
          className='google'
          onClick={(e) => {
            signInWithGoogle()
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default App;
