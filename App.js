import React, {useState} from 'react';
import {Header, Image} from 'react-native-elements';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import defaultAvatar from './profile.png';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);

  const handlePicker = () => {
    // console.log('edit');
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log(response.uri);
        setAvatar({uri: response.uri});
      }
    });
  };

  return (
    <View>
      <Header
        centerComponent={{
          text: 'Profile Photo',
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
