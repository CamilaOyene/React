import { getAuth, onAuthStateChanged } from 'firebase/auth';

const auth = getAuth();

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject(Error, 'No hay usuario autenticado');
      }
    });
  });
};

export default getCurrentUser;
