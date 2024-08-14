import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";

import { ActivityIndicator, MD2Colors } from "react-native-paper";
import React, { useState } from "react";
import logo from "../../assets/mainlogo.png";
import { button1 } from "../common/button";
import {
  errormessage,
  formgroup,
  head1,
  head2,
  input,
  input1,
  label,
  link,
  link2,
} from "../common/formcss";
import axios from "axios";
import { urlHead } from "../helper/extrapropertise";
const Signup = ({ navigation }) => {
  const [loder, setloder] = useState(false);
  const [fdata, setFdata] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    dob: "",
    address: "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const Sendtobackend = () => {
    console.log(fdata);
    if (
      fdata.name == "" ||
      fdata.email == "" ||
      fdata.password == "" ||
      fdata.cpassword == "" ||
      fdata.dob == "" ||
      fdata.address == ""
    ) {
      setErrormsg("All fields are required");
      return;
    } else {
      if (fdata.password != fdata.cpassword) {
        setErrormsg("Password and Confirm Password must be same");
        return;
      } else {
        setloder(true);
        fetch(`https://${urlHead}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fdata),
          mode: "cors",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Checking");
            console.log(data);
            if (data.error === "Invalid Credentials") {
              setErrormsg(data.error);
            } else {
              console.log("Checking");
              console.log(data.udata);
              alert("account created successfully");
              navigation.navigate("Verification", { userdata: data.udata });
            }
            setloder(false); // Ensure loader is turned off
          })
          .catch((error) => {
            console.error(error);
            setloder(false); // Ensure loader is turned off in case of error
          });
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.patternbg}
        source={require("../../assets/pattern.jpeg")}
      />

      <View style={styles.container1}>
        <View style={styles.s1}></View>
        <ScrollView style={styles.s2}>
          {loder && (
            <Modal
              transparent={true}
              visible={loder}
              onRequestClose={() => {
                setloder(!loder);
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <ActivityIndicator
                  animating={true}
                  size="large"
                  color={MD2Colors.red800}
                />
              </View>
            </Modal>
          )}
          <Text style={head1}>Create a New Account</Text>
          <Text style={link2}>
            Already Registered?&nbsp;
            <Text style={link} onPress={() => navigation.navigate("login")}>
              Login here
            </Text>
          </Text>
          {errormsg ? <Text style={errormessage}>{errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={label}>Name</Text>
            <TextInput
              style={input}
              placeholder="Enter your Name"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Email</Text>
            <TextInput
              style={input}
              placeholder="Enter your Email"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>DOB</Text>
            <TextInput
              style={input}
              placeholder="Enter your Date of Birth"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, dob: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Password</Text>
            <TextInput
              style={input}
              placeholder="Enter your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
            />
          </View>

          <View style={formgroup}>
            <Text style={label}>Confirm Password</Text>
            <TextInput
              style={input}
              placeholder="Confirm your Password"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
            />
          </View>
          <View style={formgroup}>
            <Text style={label}>Address</Text>
            <TextInput
              style={input1}
              placeholder="Enter your Address"
              onPressIn={() => setErrormsg(null)}
              onChangeText={(text) => setFdata({ ...fdata, address: text })}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              Sendtobackend();
            }}
          >
            <Text style={button1}>Signup</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
  patternbg: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  container1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  s1: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10%",
  },
  small1: {
    color: "#fff",
    fontSize: 17,
  },
  h1: {
    fontSize: 30,
    color: "#fff",
  },
  s2: {
    display: "flex",
    backgroundColor: "#fff",
    width: "100%",
    height: "90%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  formgroup: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginVertical: 10,
  },
  label: {
    fontSize: 17,
    color: "#000",
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFB0CC",
    borderRadius: 20,
    padding: 10,
  },
  fp: {
    display: "flex",
    alignItems: "flex-end",
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
