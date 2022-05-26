import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from './assets/config';

function App() {
  const [regUser, setRegUser] = useState('')
  const [regPass, setRegPass] = useState('')
  const [logUser, setLogUser] = useState('')
  const [logPass, setLogPass] = useState('')
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

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
    </div>
  );
}

export default App;
