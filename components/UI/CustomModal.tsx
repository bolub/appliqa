import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  // UseDisclosureProps,
} from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  disclosure: any;
  title?: string;
  titleComponent?: any;
  minW?: string | object;
  onClickCloseIcon?: () => void;
}

const CustomModal: FC<Props> = ({
  disclosure,
  children,
  title,
  titleComponent,
  minW = { md: '620px' },
  onClickCloseIcon = () => {},
}) => {
  const { isOpen, onClose } = disclosure;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay
        onClick={() => {
          onClickCloseIcon();
        }}
      />

      <ModalContent minW={minW} borderRadius={'20px'} pt={6} pb={4}>
        <ModalHeader px={8}>
          <Text as='span' fontWeight={'black'} fontSize='xl'>
            {title}
          </Text>
          {titleComponent}
        </ModalHeader>

        <ModalCloseButton
          color='gray.400'
          onClick={() => {
            onClickCloseIcon();
          }}
        />
        <ModalBody px={8}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
