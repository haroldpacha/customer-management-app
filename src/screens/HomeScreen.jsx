import { useState, useEffect, useContext, useCallback } from 'react'

import { Text, StyleSheet, View, FlatList, ScrollView, RefreshControl, SafeAreaView } from 'react-native'
import globalStyles from '../styles/global'

import { List, Headline, Button, FAB, Avatar, Divider } from 'react-native-paper'
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    const [customers, setCustomers] = useState([]);
    const [queryApi, setQueryApi] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const { api } = useContext(AuthContext);

    useEffect(() => {
        if (queryApi) {
            getCustomerApi()
        }

    }, [queryApi]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getCustomerApi();
        setRefreshing(false);
    }, []);

    const getCustomerApi = async () => {
        try {
            const data = await api('/customers', 'get');
            setCustomers(data.data);
            setQueryApi(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Button icon="plus-circle" onPress={() => navigation.navigate("NewClient", { setQueryApi })}> 
                    NUEVO CLIENTE
                </Button>

                <Headline style={globalStyles.titulo}>{customers.length > 0 ? "Listado de Clientes" : "Aun no hay Clientes"}</Headline>
                <FlatList
                    data={customers}
                    keyExtractor={ customer => (customer.id).toString() }
                    renderItem={({item}) => (
                        <>
                            <List.Item
                                title={`${item.name} ${item.last_name}`}
                                description={`DNI: ${item.dni} Edad: ${item.age}`}
                                onPress={() => navigation.navigate('ClientDetail',{ item, setQueryApi })}
                                left={props =><Avatar.Text size={45} label={item.name[0]} />}
                            />
                            <Divider />
                        </>
                    )}
                />
            </ScrollView>
            <View>
                <FAB
                    icon='plus'
                    style={globalStyles.fab}
                    onPress={() => navigation.navigate("NewClient", { setQueryApi })}
                    color='#FFF'
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
    },
});

export default HomeScreen