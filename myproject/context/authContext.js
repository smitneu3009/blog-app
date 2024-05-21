import React,{createContext,useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [state,setState] = useState({
        user:null,
        token:'',
    });

    axios.defaults.baseURL = "http://10.0.0.35:8080/api/v1";

    useEffect(()=>{
        const getLocalStorageData = async() => {
            let data =await AsyncStorage.getItem("@auth");
            let loginData = JSON.parse(data);
            setState({...state,user:loginData?.user,token:loginData?.token})
        }
          
        getLocalStorageData();
    },[]);

    return (
        <AuthContext.Provider value={[state,setState]}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider,AuthContext};