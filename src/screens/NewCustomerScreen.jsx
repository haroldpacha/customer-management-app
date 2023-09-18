
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { TextInput, Headline, Button, Paragraph, Dialog, Portal, HelperText } from 'react-native-paper'
import { es, registerTranslation } from 'react-native-paper-dates'
import { DatePickerInput } from 'react-native-paper-dates';
import { SelectList } from 'react-native-dropdown-select-list'
import globalStyles from '../styles/global'
import {AuthContext} from '../context/AuthContext';

const NewClient = ({ navigation, route }) => {
    const { setQueryApi } = route.params;

    const {api} = useContext(AuthContext);

    const [dni, setDni] = useState('')
    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [birthdate, setBirthdate] = useState(undefined)
    const [age, setAge] = useState('')
    const [department_id, setDepartmentId] = useState('')
    const [department, setDepartment] = useState(undefined)
    const [address, setAddress] = useState('')

    const [departments, setDepartments] = useState([]);

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const getDepartmentsApi = async () => {
            const response = await api('/departments/all', 'get');

            let departments = response.data.map((item) => {
                return {key: item.id, value: item.name}
            });

            setDepartments(departments);
        }

        getDepartmentsApi();
    }, [])

    useEffect(() => {
        if (route.params.customer) {
            const { dni, name, last_name, birthdate, department, address } = route.params.customer
            setDni(dni);
            setName(name);
            setLastName(last_name);
            setBirthdate(new Date(birthdate));
            setDepartment(department);
            setDepartmentId(department.id);
            setAddress(address);
        }
    }, [])

    useEffect(() => {
        validateForm();
    }, [dni, name, last_name, birthdate, age, department_id, address]);

    const saveCustomer = async () => {
        if (isFormValid) {
            const customer = { dni, name, last_name, birthdate, age, department_id, address };

            if (route.params.customer) {
                const { id } = route.params.customer;
                customer.id = id;
                const data = await api('/customers', 'put', customer);
            } else {
                const data = await api('/customers', 'post', customer);
            }

            navigation.navigate("HomeScreen");

            setDni('');
            setName('');
            setLastName('');
            setBirthdate('');
            setAge('');
            setDepartmentId('');
            setAddress('');

            setQueryApi(true);
        }
    }

    const validateForm = () => {
        let errors = {};
  
        // Validate dni field
        if (!dni) {
            errors.dni = 'Se requiere DNI.';
        } else if (dni.length != 8) {
            errors.dni = 'El DNI debe tener 8 caracteres.';
        }

        // Validate name field
        if (!name) {
            errors.name = 'Se requiere el nombre.';
        }

        // Validate last_name field
        if (!last_name) {
            errors.last_name = 'Se requiere apellido.';
        }

        if (!birthdate) {
            errors.birthdate = 'Se requiere fecha de nacimiento.';
        }
        // Validate department field
        if (!department_id) {
            errors.department_id = 'Se requiere departamento.';
        }
        // Validate address field
        if (!address) {
            errors.address = 'La dirección es necesaria.';
        }


        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    return (
        <View style={globalStyles.contenedor}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Headline style={globalStyles.titulo}> {route.params.customer ? 'Editar cliente' : 'Añadir Nuevo Cliente'}</Headline>
                <TextInput
                    label="DNI"
                    onChangeText={(dni) => setDni(dni)}
                    value={dni}
                />
                <HelperText type="error" visible={errors.dni}>
                    {errors.dni}
                </HelperText>

                <TextInput
                    label="Nombres"
                    onChangeText={(name) => setName(name)}
                    value={name}
                />
                <HelperText type="error" visible={errors.name}>
                    {errors.name}
                </HelperText>

                <TextInput
                    label="Apellidos"
                    onChangeText={(last_name) => setLastName(last_name)}
                    value={last_name}
                />
                <HelperText type="error" visible={errors.last_name}>
                    {errors.last_name}
                </HelperText>

                <DatePickerInput
                    label="Fecha de Nacimiento"
                    onChange={(birthdate) => setBirthdate(birthdate)}
                    value={birthdate}
                    locale="es"
                    inputMode="start"
                />
                <HelperText type="error" visible={errors.birthdate}>
                    {errors.birthdate}
                </HelperText>

                <SelectList 
                    setSelected={(val) => setDepartmentId(val)} 
                    data={departments} 
                    save="id"
                    placeholder="Selecionar Departamento"
                    defaultOption={{ key:department && department.id ?department.id:0, value:department && department.name ?department.name:''}}
                />

                <HelperText type="error" visible={errors.department_id}>
                    {errors.department_id}
                </HelperText>

                <TextInput
                    label="Dirección"
                    onChangeText={(address) => setAddress(address)}
                    value={address}
                />
                <HelperText type="error" visible={errors.address}>
                    {errors.address}
                </HelperText>

                <Button
                    icon="pencil-circle"
                    mode='contained'
                    onPress={() => saveCustomer()}
                    disabled={!isFormValid}
                    style={[{ opacity: isFormValid ? 1 : 0.5, marginBottom: 10 }]}
                >
                    {route.params.cliente ? 'GUARDAR EDICIÓN' : 'GUARDAR CLIENTE'}
                </Button>

            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 20,
        backgroundColor: 'transparent'
    }
})


const styles2 = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16,
        marginBottom: 5,
    },
});

export default NewClient