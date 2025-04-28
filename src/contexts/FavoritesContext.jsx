import React, {createContext, useState, useEffect} from 'react';
import {useAuth} from './AuthContext';
import {db} from '../services/firebase';
import {doc, getDoc,updateDoc,arrayUnion,arrayRemove} from 'firebase/firestore'

const FavoritesContext = createContext();

const FavoritesProvider = ({children}) => {
    const {currentUser} = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
          if (currentUser) { 
            try {
              const userDocRef = doc(db, 'users', currentUser.uid);
              const userDoc = await getDoc(userDocRef);
    
              if (userDoc.exists()) {
                setFavorites(userDoc.data().favorites || []); 
              }
            } catch (error) {
              console.error("Error fetching favorites:", error); 
            }
          } else {
            setFavorites([]); 
          }
        };
    
        fetchFavorites();
    }, [currentUser]);

    const addToFavorites = async(recipeId) => {
        if (currentUser) { 
            try {
              const userDocRef = doc(db, 'users', currentUser.uid);
              await updateDoc(userDocRef, { 
                favorites: arrayUnion(recipeId) 
              });
              setFavorites([...favorites, recipeId]); 
            } catch (error) {
              console.error("Error adding to favorites:", error); 
            }
          }
    };

    const removeFromFavorites = async(recipeId) => {
        if (currentUser) { 
            try {
              const userDocRef = doc(db, 'users', currentUser.uid);
              await updateDoc(userDocRef, { 
                favorites: arrayRemove(recipeId) 
              });
              setFavorites(favorites.filter((id) => id !== recipeId)); 
            } catch (error) {
              console.error("Error removing from favorites:", error); 
            }
          }
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );

};

export default FavoritesProvider;