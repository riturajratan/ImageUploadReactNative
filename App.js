import React, {useState} from 'react';
import {Header, Image} from 'react-native-elements';
import {StyleSheet, View, ActivityIndicator, Platform} from 'react-native';
import defaultAvatar from './profile.png';
import ImagePicker from 'react-native-image-picker';

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const App = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [title, setTitle] = useState('Profile Photo');
  const handlePicker = () => {
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setAvatar({uri: response.uri});
        setTitle('Updating...'); // image start to upload on server so on header set text is 'Updating..'
        fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded', //Specifying the Content-Type
          }),
          body: createFormData(response, {id: '123'}),
        })
          .then((data) => data.json())
          .then((res) => {
            console.log('upload succes', res);
            setTitle('Profile Photo');
            setAvatar({uri: response.image});
          })
          .catch((error) => {
            console.log('upload error', error);
            setTitle('Profile Photo');
          });
      }
    });
  };

  return (
    <View>
      <Header
        centerComponent={{
          text: title,
          style: styles.headerText,
        }}
        rightComponent={{
          text: 'Edit',
          style: styles.headerText,
          onPress: () => handlePicker(),
        }}
      />
      <View style={styles.imageContainer}>
        <Image
          source={avatar}
          PlaceholderContent={<ActivityIndicator />}
          style={{width: 500, height: 500}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
  },
  body: {flex: 1},
});

export default App;
