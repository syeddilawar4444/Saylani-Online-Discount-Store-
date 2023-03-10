import React, { useState, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform, Alert,
  ActivityIndicator
} from "react-native";
import axios from "axios";
//import components
// import Background from "../Componets/Background";
import InputField from "../Componets/InputField";
import Btn from "../Componets/Btn";
import BaseUrl from "../constant/BaseUrl"
import { signUpFirebase } from "../Config/firebase"

function Signup(props) {

  const emailInputRef = useRef("");
  const contactInputRef = useRef("");
  const passwordInputRef = useRef("");
  const cpasswordInputRef = useRef("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setConPassword] = useState("");

  const [loading, setLoading] = useState(false)

  const signUpUser = async () => {
    setLoading(true)
    if (!email || !username || !contact || !password || !cPassword) {
      setLoading(false)
      return alert("Please Fill The Form");
    }
    if (isNaN(contact)) {
      setLoading(false)
      return alert("InCorrect Number");
    }

    if (!(password === cPassword)) {
      setLoading(false)
      return alert("Password Not Match");
    }

    if (contact.length < 11) {
      setLoading(false)
      return alert("Mobile Number invalid");
    }
    if (email.length < 12) {
      setLoading(false)
      return alert("Email Short");
    }
    try {
      const re = await signUpFirebase({ username, email, contact, password })
      setLoading(false)
      setUsername("")
      setPassword("")
      setEmail("")
      setContact("")
      setConPassword("")
      Alert.alert(
        "SignUp",
        "Successfully Registered",
        [{
          text: "OK",
          onPress: () => { props.navigation.navigate("Login") }
        }]
      )

    } catch (e) {
      setLoading(false)
      switch (e.message) {
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          alert("Password at least 6")
          break;
        case "Firebase: Error (auth/invalid-email).":
          alert("invalid-email")
          break;
        case "Firebase: Error (auth/email-already-in-use).":
          alert("user already exist")
          break;
        default:
          alert("Unknown Error Occured")
      }
    }
  }


  return (
    <>
      <KeyboardAvoidingView>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#000C40",
          }}
        >
          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text
              style={{
                color: "white",
                fontSize: 50,
                fontWeight: "bold",
                marginVertical: 10,
              }}
            >
              Register
            </Text>
            <Text style={{ fontSize: 24, color: "white", marginBottom: 10 }}>
              Create New Account
            </Text>
          </View>

          {/* form container */}
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 200,
              paddingTop: 70,
              alignItems: "center",
              height: "100%",
            }}
          >
            <Text style={{ fontSize: 30, color: "#054516" }}>SAYLANI WELFAER</Text>
            <Text>ONLINE DISCOUNT STORE</Text>
            <TextInput
              autoFocus
              onSubmitEditing={() => {
                emailInputRef.current.focus();
              }}
              maxLength={24}
              blurOnSubmit={false}
              returnKeyType="next"
              value={username}
              enterKeyHint={"next"}
              onChangeText={(e) => setUsername(e)}
              placeholder="UserName..."
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 100,
                color: "#054516",
                paddingHorizontal: 10,
                width: "77%",
                paddingVertical: 10,
                marginTop: 14,
                fontSize: 16,
              }}
            />
            <TextInput
              value={email}
              ref={emailInputRef}
              onSubmitEditing={() => {
                contactInputRef.current.focus();
              }}
              returnKeyType="next"
              onChangeText={(e) => setEmail(e)}
              placeholder="email@gmail..."
              keyboardType={"email-address"}
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 100,
                color: "#054516",
                paddingHorizontal: 10,
                width: "77%",
                paddingVertical: 10,
                marginTop: 14,
                fontSize: 16,
              }}
            />
            <TextInput
              ref={contactInputRef}
              onSubmitEditing={() => {
                passwordInputRef.current.focus();
              }}
              returnKeyType="next"
              value={contact}
              maxLength={11}
              onChangeText={(e) => setContact(e)}
              placeholder="03xxxxxxxx"
              keyboardType={"numeric"}
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 100,
                color: "#054516",
                paddingHorizontal: 10,
                width: "77%",
                paddingVertical: 10,
                marginTop: 14,
                fontSize: 16,
              }}
            />
            <TextInput
              ref={passwordInputRef}
              value={password}
              onSubmitEditing={() => {
                cpasswordInputRef.current.focus();
              }}
              returnKeyType="next"
              onChangeText={(e) => setPassword(e)}
              placeholder="Password..."
              secureTextEntry={true}
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 100,
                color: "#054516",
                paddingHorizontal: 10,
                width: "77%",
                paddingVertical: 10,
                marginTop: 14,
                fontSize: 16,
              }}
            />
            <TextInput
              ref={cpasswordInputRef}
              onSubmitEditing={() => signUpUser()}
              value={cPassword}
              onChangeText={(e) => setConPassword(e)}
              placeholder="Confirm Password..."
              secureTextEntry={true}
              style={{
                backgroundColor: "#e0e0e0",
                borderRadius: 100,
                color: "#054516",
                paddingHorizontal: 10,
                width: "77%",
                paddingVertical: 10,
                marginTop: 14,
                fontSize: 16,
              }}
            />

            {/* fotgetpassword */}
            {/* <View style={{alignItems:"flex-end",width:"77%"    }}>
                                <Text style={{color:"#054516", fontSize:16,marginTop:13}} >Forgot Password ?</Text>
                              </View> */}
            {/* loginButton */}

            {loading ? <ActivityIndicator style={{ alignSelf: "center", marginTop: 10 }} size={"large"} color="#0000ff" />
              : <Btn
                bgColor="green"
                textColor="white"
                btnLable="SignUp"
                press={signUpUser}
              />
            }


            {/* Don't have an account */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginVertical: 15,
                justifyContent: "center",
              }}
            >
              <Text>Already hava an account ? </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={{ color: "#054516", fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
export default Signup;
