

import React, { useContext } from 'react'
import { View, StyleSheet, Alert } from 'react-native'

import { Headline, Text, Subheading, Button, FAB } from 'react-native-paper'

import globalStyles from '../styles/global'
import {AuthContext} from '../context/AuthContext';

const ClientDetail = ({ navigation, route }) => {

    const { setQueryApi } = route.params
    const { dni, name, last_name, birthdate, age, department, address, id } = route.params.item;

    const {api} = useContext(AuthContext);

    const showConfirm = () => {
        Alert.alert(
            '¿Deseas eliminar este cliente?',
            'Un contacto eliminado no se puede recuperar',
            [
                { text: 'Si, eliminar', onPress: () => eliminarCliente() },
                { text: 'Cancelar', style: 'cancel' }
            ]
        )
    }

    const eliminarCliente = async () => {
        const result = await api(`/customers/${id}`, 'delete');
 
        navigation.navigate('HomeScreen');

        setQueryApi(true);
    }
    
    return (
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{name} {last_name}</Headline>
            <Text style={styles.texto}>DNI: <Subheading>{dni}</Subheading></Text>
            <Text style={styles.texto}>Fecha de Nacimiento: <Subheading>{birthdate}</Subheading></Text>
            <Text style={styles.texto}>Edad: <Subheading>{age}</Subheading></Text>
            <Text style={styles.texto}>Departamento: <Subheading>{department.name}</Subheading></Text>
            <Text style={styles.texto}>Dirección: <Subheading>{address}</Subheading></Text>
            <Button
                icon='cancel'
                mode='contained'
                style={styles.boton}
                onPress={() => showConfirm()}
            >
                ELIMINAR CLIENTE
            </Button>

            <FAB
                icon='pencil'
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NewClient", { customer: route.params.item, setQueryApi })}
                color='#FFF'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    texto: {
        marginBottom: 20,
        fontSize: 18
    },
    boton: {
        marginTop: 100,
        backgroundColor: 'red'
    }
});

export default ClientDetail