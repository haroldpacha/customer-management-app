import React, { Component } from 'react';
import { View, Pressable, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import globalStyles from '../styles/global';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default class SignIn extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            check_textInputChange: false,
            secureTextEntry: true,
        };

        this.navigation = this.props.navigation;
    }

    InsertRecord = () => {
        var Email = this.state.email;
        var Password = this.state.password;

        if ((Email.length == 0) || (Password.length == 0)) {
            alert("Required Field Is Missing!!!");
        } else {
            var APIURL = "http://10.0.2.2:80/SignIn/login.php";

            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            var Data = {
                Email: Email,
                Password: Password
            };

            fetch(APIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            })
                .then((Response) => Response.json())
                .then((Response) => {
                    alert(Response[0].Message)
                    if (Response[0].Message == "Success") {
                        console.log("true")
                        this.props.navigation.navigate("HomeScreen");
                    }
                    console.log(Data);
                })
                .catch((error) => {
                    console.error("ERROR FOUND" + error);
                })
        }
    }

    updateSecureTextEntry() {
        this.setState({
            ...this.state,
            secureTextEntry: !this.state.secureTextEntry
        });
    }

    render() {
        return (
            <View style={globalStyles.viewStyle}>
                <View style={globalStyles.action}>
                    <TextInput
                        placeholder="Ingrese correo electrónico"
                        style={globalStyles.textInput}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>

                <View style={globalStyles.action}>
                    <TextInput
                        placeholder="Introducir la contraseña"
                        style={globalStyles.textInput}
                        secureTextEntry={this.state.secureTextEntry ? true : false}
                        onChangeText={password => this.setState({ password })}
                    />
                    <TouchableOpacity
                        onPress={this.updateSecureTextEntry.bind(this)}>
                        {this.state.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="black"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>

                <View style={globalStyles.loginButtonSection}>
                    <Pressable
                        style={globalStyles.loginButton}
                        onPress={() => {
                            this.InsertRecord()
                        }}
                    >
                        <Text style={globalStyles.text}>Iniciar sesión</Text>
                    </Pressable>
                </View>

                <View style={globalStyles.loginButtonSection}>
                    <Pressable
                        style={globalStyles.loginButton}
                        onPress={() => {
                            this.navigation.navigate("SignUp")
                        }}
                    >
                        <Text style={globalStyles.text}>Crear una nueva cuenta</Text>
                    </Pressable>
                </View>
            </View>
        );
    }
}