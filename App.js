import { Video } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Función con llamada a la Pantalla Principal
function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly'}}>
      <Button
        color = '#e82c2c'
        title="FOTOS DE LA API"
        onPress={() => navigation.navigate('Fotos')}
      />
      <Button 
        color = '#0077ff'
        title="VIDEOS DE LA API "
        onPress={() => navigation.navigate('Videos')}
      />
    </View>
  );
}

//Función con llamada a la Pantalla de Fotos
function FotosScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://pixabay.com/api/?key=18970683-39839122055c3d5c249457a21&q=dog&image_type=photo&pretty=true')
      .then((response) => response.json())
      .then((json) => setData(json.hits))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fotos Pixabay API </Text>
      {isLoading ? <ActivityIndicator /> : (
        <>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <>
                <Text style={styles.user}>Usuario: {item.user}</Text>
                <Text style={styles.likes}>Likes: {item.likes}</Text>
                <Image
                  source={{ uri: item.largeImageURL }}
                  style={{ height: 400, width: 400, marginBottom: 24 }}
                />
              </>
            )}
          />
        </>
      )}
    </View>
  );
}

//Función con llamada a la Pantalla de Videos
function VideosScreen({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://pixabay.com/api/videos/?key=18970683-39839122055c3d5c249457a21&q=dog&pretty=true&per_page=5')
      .then((response) => response.json())
      .then((json) => setData(json.hits))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videos Pixabay API </Text>
      {isLoading ? <ActivityIndicator /> : (
        <>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id.toString()}
            renderItem={({ item }) => (
              <>
              <Text style={styles.user1}>Usuario: {item.user} </Text>
              <Text style={styles.likes1}>Likes: {item.likes}</Text>
                <Video
                  source={{ uri: item.videos.tiny.url }}
                  rate={1.0}
                  isMuted={true}
                  shouldPlay
                  isLooping
                  useNativeControls
                  resizeMode="contain"
                  style={{ width: 400, height: 400 }}
                />
              </>
            )}
          />
        </>
      )}
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Fotos" component={FotosScreen} />
        <Stack.Screen name="Videos" component={VideosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#4158D0',
  },
  titlePhotos: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#d00000',
    marginTop: 10,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likes: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0077b6'
  },
  user1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  likes1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0077b6',
    marginBottom: -75,
  },
});

export default App;
