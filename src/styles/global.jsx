import { StyleSheet } from "react-native";


const globalStyles = StyleSheet.create({
    contenedor:{
        flex: 1,
        marginTop: 20,
        marginHorizontal: '2.5%'
    },
    titulo:{
        textAlign:'center',
        marginTop: 20,
        marginBottom: 30,
        fontSize: 30
    },
    fab:{
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 20,
        borderRadius: 80,
        backgroundColor: '#ce0058',        
    },
    viewStyle:{
        flex: 1,
        padding: 20,
        marginTop: 50,
    },
    textInput:{
        borderBottomWidth: 1,
        marginBottom: 50,
        height: 40,
        fontSize: 20,
        width:'96%'
    },
    button:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 150,
        borderRadius: 10,
        backgroundColor: 'black',
    },
    action: {
      flexDirection: 'row',
      marginTop: 10,
      paddingBottom: 5,
    },
    text: {
        fontSize: 18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textTransform: 'uppercase'
    },
    loginButtonSection: {
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
       backgroundColor: '#06baab',
       color: 'white',
       height: 35,
       justifyContent: 'center',
       alignItems: 'center',
       width: '80%',
       borderRadius: 10,
    }
})

export default globalStyles