import { StyleSheet, Text, View, Image, TextInput, Modal } from 'react-native'
import React, { useState } from 'react'
import logo from '../../assets/mainlogo.png'
import { button1 } from '../common/button'
import { errormessage, formgroup, head1, head2, input, label, link, link2 } from '../common/formcss'
import { urlHead } from '../helper/extrapropertise'
import e from 'cors'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

const Login = ({ navigation }) => {
    const [loder, setloder] = useState(false)
    const [fdata, setFdata] = useState({
        email: '',
        password: ''
    })

    const [errormsg, setErrormsg] = useState(null);

    const Sendtobackend = () => {
        setloder(true)
        console.log(fdata);
        if (fdata.email == '' || fdata.password == '') {
            setErrormsg('All fields are required');
            setloder(false)
            return;
        }
        else {
            fetch(`https://${urlHead}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fdata)
            })
                .then(res => res.json()).then(
                    data => {
                        console.log("data madhe kay ahe ",data);
                        if (data.error) {
                            setErrormsg(data.error)
                            setloder(false)
                        }
                        else {
                            // alert('logged successfully');
                            setloder(false)
                            navigation.navigate('homepage');
                        }
                    }
                ).catch((e)=>{
                    console.log(e);
                    setloder(false)
                    
                })
        }
    }
    return (
        <View style={styles.container}>
            
            <Image style={styles.patternbg} source={require("../../assets/pattern.jpeg")} />

            <View style={styles.container1} >
                <View style={styles.s1}>
                    {/* <Image style={styles.logo} source={logo} /> */}
                    {/* <Text style={styles.h1} onPress={() => navigation.navigate('welcome')}>Used2, Inc.</Text> */}
                    <Text style={styles.h1}>MG and associates</Text>
                </View>
                <View style={styles.s2}>
                    {loder &&
                 <Modal

                 transparent={true}
                 visible={loder}
                 onRequestClose={() => {
                   setloder(!loder);
                 }}
               >
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                 <ActivityIndicator
                   animating={true}
                   size="large"
                   color={MD2Colors.red800}
                 />
                 </View>
               </Modal>}
                    <Text style={head1}>Login</Text>
                    <Text style={head2}>Sign in to continue</Text>
                    {
                        errormsg ? <Text style={errormessage}>{errormsg}</Text> : null

                    }
                    <View style={formgroup}>
                        <Text style={label}>Email</Text>
                        <TextInput style={input}
                            placeholder="Enter your email"

                            onPressIn={() => setErrormsg(null)}
                            onChangeText={(text) => setFdata({ ...fdata, email: text })}
                        />
                    </View>
                    <View style={formgroup}>
                        <Text style={label}>Password</Text>
                        <TextInput style={input}
                            placeholder="Enter your password"

                            secureTextEntry={true}

                            onChangeText={(text) => setFdata({ ...fdata, password: text })}
                            onPressIn={() => setErrormsg(null)}

                        />
                    </View>
                    <View style={styles.fp}>
                        <Text style={link}>Forgot Password?</Text>
                    </View>
                    <Text style={button1}
                        onPress={() => Sendtobackend()}
                    >Login</Text>
                    <Text style={link2}>Don't have an account?&nbsp;
                        <Text style={link}
                            onPress={() => navigation.navigate('signup')}
                        >
                            Create a new account
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    s1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%',
    },
    small1: {
        color: '#fff',
        fontSize: 17,
    }
    ,
    h1: {
        fontSize: 30,
        color: '#fff',
    },
    s2: {
        display: 'flex',
        backgroundColor: '#fff',
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    formgroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginVertical: 10,
    },
    label: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFB0CC",
        borderRadius: 20,
        padding: 10,
    },
    fp: {
        display: 'flex',
        alignItems: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    logo: {
        height: 80,
        resizeMode: 'contain',
    }
})