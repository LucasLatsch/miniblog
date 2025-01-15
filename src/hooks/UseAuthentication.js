import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let systemErrorMessage;
      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa coonter pelo menos 6 caracteres;";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email já cadastrado;";
      } else if (error.message.includes("invalid-email")) {
        systemErrorMessage = "Email invalido, tente novamente;";
      } else {
        systemErrorMessage =
          "Ocorreu um erro, por favor tente novamente mais tarde;";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  //logout - sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login -sign in
  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "Usuário ou senha inválidos;";
      } else if (error.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "Usuário ou senha inválidos;";
      } else {
        systemErrorMessage = "Ocoreu um erro, por favor tente mais tarde;";
      }

      setError(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
