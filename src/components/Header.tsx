import React, {type PropsWithChildren} from 'react';
import {HStack, Heading, Spacer} from 'native-base';

const Header: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({children, title}) => {
  return (
    <HStack
      px={4}
      py={5}
      _dark={{bg: 'blueGray.800'}}
      _light={{bg: 'blue.50'}}
      shadow="4">
      <Heading size="lg">{title}</Heading>
      <Spacer />
      {children}
    </HStack>
  );
};

export default Header;
