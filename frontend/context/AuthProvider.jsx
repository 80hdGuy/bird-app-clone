import * as SecureStore from 'expo-secure-store';
import { createContext, useState } from 'react';
import axiosConfig from '../utilities/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        isLoading,
        login: (email, password) => {
          setIsLoading(true);
          axiosConfig
            .post('/login', {
              email: email,
              password: password,
              device_name: 'mobile',
            })
            .then((response) => {
              const userResponse = {
                token: response.data.token,
                id: response.data.user.id,
                name: response.data.user.name,
                username: response.data.user.username,
                email: response.data.user.email,
                avatar: response.data.user.avatar,
              };
              setUser(userResponse);
              setError(null);
              SecureStore.setItemAsync('user', JSON.stringify(userResponse));
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response.data.message);
              setError(error.response.data.message);
              setIsLoading(false);
            });
        },
        logout: () => {
          setIsLoading(true);
          axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
          axiosConfig
            .post('/logout')
            .then((response) => {
              setError(null);
              setIsLoading(false);
            })
            .catch((error) => {
              console.log(error.response.data.message);
              setError(error.response.data.message);
              setIsLoading(false);
            })
            .finally(() => {
              setUser(null);
              SecureStore.deleteItemAsync('user');
            });
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
