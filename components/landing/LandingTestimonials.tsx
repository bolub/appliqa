import { Center, chakra, Container } from '@chakra-ui/react';

const LandingTestimonials = () => {
  return (
    <chakra.section id='testimonials'>
      <Container maxW='7xl' mt={{ md: 6 }} bg='green.200'>
        <Center flexDir={'column'} textAlign='center' mx='auto'></Center>
      </Container>
    </chakra.section>
  );
};

export default LandingTestimonials;
