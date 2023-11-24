import {Text, useToast, View} from 'native-base';
import React, {useEffect, useRef, useCallback} from 'react';

import {widthPercentageToDP} from 'react-native-responsive-screen';

const useToastHook = (type, message, placement) => {
  const toast = useToast();
  const id = 'test-toast';
  const firstRender = useRef(true);

  const showToast = useCallback(
    (type, message, placement) => {
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
                justifyContent="center"
                alignItems="center"
                borderRadius={50}>
                <Text
                  fontFamily={'MontSemiBold'}
                  color={'#fff'}
                  fontSize={18}
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
    },
    [toast, id],
  );

  useEffect(() => {
    if (!firstRender.current) {
      showToast(type, message, placement);
    } else {
      firstRender.current = false;
    }
  }, [type, message, placement, showToast]);

  return {showToast};
};

export default useToastHook;
