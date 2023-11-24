import {Text, useToast, View} from 'native-base';
import React, {useEffect, useRef} from 'react';

import {widthPercentageToDP} from 'react-native-responsive-screen';

const useToastHook = (type, message, placement) => {
  const toast = useToast();
  const id = 'test-toast';
  const firstRender = useRef(true);

  const showToast = (type, message, placement) => {
    if (!toast.isActive(id)) {
      toast.show({
        id,
        placement: placement === 'bottom' && 'top',
        duration: 2000,
        render: () => {
          return (
            <View
              bg={type === 'error' ? '#eb343a' : '#6947cc'}
              px="2"
              py="1"
              rounded="sm"
              mb={2}
              width={widthPercentageToDP('90')}
              // height='20'
              justifyContent="center"
              alignItems="center"
              borderRadius={50}>
              <Text
                fontFamily={'inter_semibold'}
                color={'#fff'}
                fontSize={15}
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                flexWrap={'wrap'}
                numberOfLines={3}
                w={260}
                opacity={1}
                padding={2}>
                {message}
              </Text>
            </View>
          );
        },
      });
    }
  };

  useEffect(() => {
    if (!firstRender) {
      showToast();
    } else {
      firstRender.current = false;
    }
  }, [type, message, placement]);

  return {showToast};
};

export default useToastHook;
