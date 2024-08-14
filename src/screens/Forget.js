import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { urlHead } from '../helper/extrapropertise'
import Login from './Login'

// Import necessary Redux modules
import { configureStore, createSlice } from '@reduxjs/toolkit';
const dataSlice = createSlice({
  name: 'data',
  initialState: {
      value: null
  },
  reducers: {
      setData: (state, action) => {
          state.value = action.payload;
      }
  }
});

// Extract the action creator and reducer from the slice
const { actions, reducer } = dataSlice;

// Create a Redux store with the slice's reducer
const store = configureStore({
  reducer: {
      data: reducer
  }
});

// Export action creator for setting data
export const { setData } = actions;
const VerifyEmailPage = () => {
  var otpbk;
  const [email, setEmail] = useState('');
  const [showOtpAndPasswordFields, setShowOtpAndPasswordFields] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpCheck,setOtpCheck] = useState(false);
  const [passwordResponse,setPasswordResponse] = useState(false);
  const [responseMsg,setResponseMsg] = useState('');
  const [errMsg,setErrMsg] = useState('');
  
  const handleVerifyEmail = async () => {
    try {
      const response = await fetch(`http://${urlHead}/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      .then(response => response.json())
    .then(data => {
     var sallu = data.variable;
     store.dispatch(setData(data.variable));
     otpbk = sallu; console.log("otpbk pn",sallu); console.log("otpbk pn ha",otpbk)
        console.log(data.message);
        if (data.message == 'Valid email') {
            console.log('User is valid');
            setShowOtpAndPasswordFields(true);
        } else {
            console.log('User is not valid');
            alert("User is not valid:You are redirected to Login Page");
            navigation.navigate('signup')
            
        }
    })
    } catch (error) {
      console.error('Error verifying email:', error);
      Alert.alert('Error', 'An error occurred while verifying email');
    }    
    
  };
  const checkInputs = async (otpValue, passwordValue) => {
    if (otpValue.trim() === '' && passwordValue.trim() === '') {
      return "OTP and password are empty";
    } else if (otpValue.trim() === '') {
      return "OTP is empty";
    } else if (passwordValue.trim() === '') {
      return "Password is empty";
    } else {
      return "Both OTP and password are filled";
    }
  };

const handleVerifyPassword =async () => {
  const state = store.getState();
  var change = state.data.value.toString();
  console.log("Value of OTP",otp,"Value of redux OTP",change,typeof otp,typeof change);
 
  const inputCheckResult = await checkInputs(otp, password);
    setErrorMessage(inputCheckResult);
    if(otp==change){
      setOtpCheck(true);
      try {
        // Make a request to the backend route
        const response = await fetch(`http://${urlHead}/setPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email:email
            })
        });
    
        // Check if the response is successful
        if (response.ok) {
            const data = await response.json();
            console.log("set succesfully")
            console.log(data); // Do something with the response data
             setPasswordResponse(true);
             setResponseMsg(data);
             navigation.navigate('login');
        } else {
            //  throw new Error('Failed to fetch data from the server');
            // console.log("no succesfully")
            const dataEr = await response.json();
            console.log("inside error message ",data);
            setErrMsg(dataEr);
            
        }
    } catch (error) {
        console.log('An error occurred:', error);
         setPasswordResponse(2);
  
  
    }
    }
    
};
  


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <TextInput
        style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%' }}
        placeholder="Enter email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Button
        title="Click to verify email"
        onPress={handleVerifyEmail}
      />
      {showOtpAndPasswordFields && (
        <>
          <h6>Email verified</h6>
          <TextInput
            style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%' }}
            placeholder="Enter OTP"
            onChangeText={text => setOtp(text)}
            value={otp}
          />
          <TextInput
            style={{ marginBottom: 10, borderWidth: 1, borderColor: '#ccc', padding: 10, width: '100%' }}
            placeholder="Enter password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <Button
            title="Verify and Set Password"
            onPress={handleVerifyPassword}
          />
          <h4>You will be directly redirected to login page after succesful change in password</h4>
           <h5>{errorMessage}</h5>
           {otpCheck &&<h5>OTP matched setting new password kindly wait for 2 miniutes</h5>}
           {passwordResponse&&(<h5>Password sent successfully to backend for checking.Kindly wait </h5>)
           }
           {responseMsg &&<h5>{responseMsg}</h5>}
           
          
        </>
      )}
      
    </View>
  );
};

export default VerifyEmailPage;
