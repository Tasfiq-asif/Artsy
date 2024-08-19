import { createContext, useEffect, useState } from "react"
import auth from "../firebase/firebaseConfig"
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"

export const AuthContext =createContext(null)

function Provider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  console.log(user)
    

     //Social auth providers
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

    const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };   

     const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
  };

    //update user profile
  const updateUserProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const updateUserName = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const updateUserImage = (image) => {
    return updateProfile(auth.currentUser, {
      photoURL: image,
    });
  };


   //Google Login

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, gitHubProvider);
  };

  //observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

 


    const authInfo = {
        user,
        createUser,
        loading,
        setUser,
        logOut,
        signIn,
        githubLogin,
        googleLogin,
        updateUserProfile
        
    
  };
  return (
    <div>
       <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  )
}

export default Provider