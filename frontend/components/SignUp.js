import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import Image from 'next/image';
import styles from '../styles/SignUp.module.css';
import { BACKEND_URL } from '../utils/config';

function SignUp() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  // Redirect to /home if logged in
  const router = useRouter();
  if (user.token) {
    router.push('/home');
  }

  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    setErrorMessage(''); // Reset error message
    console.log('click', { firstName, username, password });
    console.log('BACKEND_URL:', BACKEND_URL);
    fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, username, password }),
    })
      .then(response => {
        console.log('Response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Data:', data);
        if (data.result) {
          dispatch(login({ token: data.token, username, firstName }));
        } else {
          setErrorMessage(data.error || 'Une erreur est survenue');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrorMessage('Erreur de connexion au serveur');
      });
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="Logo" width={50} height={50} />
      <h3 className={styles.title}>Create your Hackatweet account</h3>
      {errorMessage && <p style={{ color: 'var(--error-color)', fontSize: '14px', marginBottom: '16px', textAlign: 'center', fontWeight: '600' }}>{errorMessage}</p>}
      <input type="text" className={styles.input} onChange={(e) => setFirstName(e.target.value)} value={firstName} placeholder="Firstname" />
      <input type="text" className={styles.input} onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Username" />
      <input type="password" className={styles.input} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" />
      <button className={styles.button} onClick={() => handleSubmit()}>Sign up</button>
    </div>
  );
}

export default SignUp;
