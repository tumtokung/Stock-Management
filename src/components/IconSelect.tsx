import {View} from 'native-base';
import React from 'react';
interface IconSelect {
  selected: boolean;
}
const IconSelect = ({selected}: IconSelect) => {
  return (
    <View
      borderRadius="full"
      size={5}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderWidth={1}
      _light={{borderColor: 'black'}}
      _dark={{borderColor: 'white'}}>
      {selected && (
        <View
          borderRadius="full"
          size={3}
          _light={{backgroundColor: 'black'}}
          _dark={{backgroundColor: 'white'}}
        />
      )}
    </View>
  );
};

export default IconSelect;
