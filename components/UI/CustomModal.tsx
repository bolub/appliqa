import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
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

  const router: any = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        if (router.pathname.includes('[id]')) {
          router.push(router.pathname.replace('[id]', router?.query?.id));
        } else {
          if (Object.keys(router.query).length > 0) {
            router.push(router.pathname);
          }
        }

        onClose();
        onClickCloseIcon();
      }}
    >
      <ModalOverlay />

      <ModalContent minW={minW} borderRadius={'20px'} pt={6} pb={4}>
        <ModalHeader px={8}>
          <Text as='span' fontWeight={'black'} fontSize='xl'>
            {title}
          </Text>
          {titleComponent}
        </ModalHeader>

        <ModalCloseButton color='gray.400' />
        <ModalBody px={8}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
