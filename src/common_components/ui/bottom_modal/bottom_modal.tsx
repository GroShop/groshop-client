import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

interface IBottomModal {
  children?: any;
  height?: number;
}

const BottomModal = forwardRef((props: IBottomModal, ref) => {
  const modalRef: any = useRef();
  useImperativeHandle(ref, () => ({
    openModal() {
      modalRef.current.open();
    },
    closeModal() {
      modalRef.current.close();
    },
  }));

  return (
    // @ts-ignore
    <RBSheet
      keyboardAvoidingViewEnabled={false}
      ref={modalRef}
      animationType="slide"
      closeOnPressMask={true}
      openDuration={300}
      customStyles={{
        container: {
          height: props.height ? props.height : 200,
          borderWidth: 2,
          borderColor: '#689C36',
          borderRadius: 10,
          paddingTop: 10,
          paddingHorizontal: 4,
        },
        wrapper: {
          // backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#ffff',
          // padding:
        },
      }}>
      {props.children}
    </RBSheet>
  );
});

export default BottomModal;
