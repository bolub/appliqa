import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { setCookies } from "cookies-next";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProfile, updateProfile } from "../API/profile";
import FormInput from "../components/UI/Form/FormInput";
import ToastBody from "../components/UI/ToastBody";
import { profileState } from "../recoil/profile";
import { logout } from "../utils/functions";
import { useSetRecoilState } from "recoil";

const Profile = () => {
  const [fullname, setFullname] = useState("");
  const [userId, setId] = useState("");

  const setRecoilUserName = useSetRecoilState(profileState);

  useQuery("profile", fetchProfile, {
    onSuccess: (data) => {
      setFullname(data?.fullname);
      setId(data?.id);
    },
    onError: (data: any) => {
      const errors = { ...data };
      if (!errors?.response) {
        logout();
      }
    },
  });

  const toast = useToast();

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile");

      setRecoilUserName({
        username: fullname,
      });
      setCookies("USER_NAME", fullname, { maxAge: 604800 });

      toast({
        position: "top-right",
        isClosable: true,
        render: () => (
          <ToastBody title="Success" message="Profile updated successfully" />
        ),
      });
    },
    onError: (data: any) => {
      const errors = { ...data };

      toast({
        position: "top-right",
        isClosable: true,
        render: () => (
          <ToastBody
            status="error"
            title={errors?.response?.data?.error?.name || "Error"}
            message={
              errors?.response?.data?.error?.message || "Something happened"
            }
          />
        ),
      });
    },
  });

  return (
    <Container maxW="7xl" py={{ base: 12, md: 20 }}>
      <Heading as="h1" fontWeight={"black"} fontSize="2xl">
        My Profile
      </Heading>

      <VStack align={"start"} spacing={24} mt={16}>
        <Box>
          <Heading as="h2" fontSize={"lg"} fontWeight={"bold"} color="gray.500">
            Update Information
          </Heading>

          <HStack flexDir={{ base: "column", md: "row" }} mt={8} spacing={5}>
            <Avatar
              size="xl"
              p="4"
              bg="gray.100"
              borderWidth={"2px"}
              borderColor="gray.100"
              src="https://api.dicebear.com/7.x/bottts/svg"
              mb={{ base: 6, md: 0 }}
            />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate({
                  id: userId,
                  body: {
                    fullname,
                  },
                });
              }}
            >
              <Flex flexDir={{ base: "column", md: "row" }}>
                <FormInput
                  type="text"
                  label="Fullname"
                  for="fullname"
                  inputProps={{
                    placeholder: "Temisan Omatsola",
                    w: "300px",
                    onChange: (e) => {
                      setFullname(e.target.value);
                    },
                    value: fullname,
                  }}
                  formControlProps={{
                    isRequired: true,
                  }}
                />

                <Button
                  mt={{ base: 4, md: 6 }}
                  ml={{ md: 3 }}
                  type="submit"
                  isLoading={isLoading}
                  isFullWidth
                  colorScheme={"green"}
                >
                  Update
                </Button>
              </Flex>
            </form>
          </HStack>
        </Box>

        {/* <Box>
          <Heading as='h2' fontSize={'lg'} fontWeight={'bold'} color='gray.500'>
            Change Password
          </Heading>

          <HStack align={'start'} mt={8} spacing={5}>
            <Center
              rounded='full'
              h='90px'
              w='90px'
              p='2'
              bg='gray.100'
              borderWidth={'2px'}
              borderColor='gray.100'
            >
              <Icon fontSize={'3xl'} as={HiOutlineLockClosed} />
            </Center>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // mutate({ email, password, fullname, username: fullname });
              }}
            >
              <HStack spacing={6} align={'start'}>
                <FormInput
                  type='password'
                  label='Old Password'
                  for='Old Password'
                  inputProps={{
                    placeholder: '******',
                    w: '300px',
                    onChange: (e) => {
                      // setFullname(e.target.value);
                    },
                  }}
                  formControlProps={{
                    isRequired: true,
                  }}
                />

                <FormInput
                  type='password'
                  label='New Password'
                  for='New Password'
                  inputProps={{
                    placeholder: '******',
                    w: '300px',
                    onChange: (e) => {
                      // setFullname(e.target.value);
                    },
                  }}
                  formControlProps={{
                    isRequired: true,
                  }}
                />
              </HStack>

              <Button
                mt={6}
                type='submit'
                // isLoading={isLoading}
                colorScheme={'green'}
              >
                Change Password
              </Button>
            </form>
          </HStack>
        </Box> */}
      </VStack>
    </Container>
  );
};

export default Profile;
