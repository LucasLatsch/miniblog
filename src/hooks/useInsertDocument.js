import { useState, useEffect, useReducer, use } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    // case "":
    //     return {loading: false, error: null, response: action.payload};
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispath] = useReducer(insertReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelledBeforeDispath = (action) => {
    if (!cancelled) {
      dispath(action);
    }
  };

  const insertDocument = async (document) => {
    checkCancelledBeforeDispath({ type: "LOADING" });
    try {
      const newDocument = {
        ...document,
        createdAt: Timestamp.now(),
      };
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      );

      checkCancelledBeforeDispath({
        type: "INSERTED_DOC",
        payload: insertedDocument,
      });
    } catch (error) {
      checkCancelledBeforeDispath({ type: "ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

  return { insertDocument, response };
};
