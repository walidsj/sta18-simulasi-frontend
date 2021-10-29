import { Box, Container } from '@chakra-ui/layout';

const Footer = () => {
  return (
    <Box
      bgColor="red.800"
      backgroundImage="/images/bg.jpg"
      backgroundSize="cover"
      color="white"
      boxShadow="lg"
      w="full"
      borderTopRadius="2xl"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="container.sm"
        pt="2"
        pb="20"
        fontSize="sm"
      >
        Website ini dikelola oleh Tim Informasi STA '18, hak cipta beberapa
        komponen website dimiliki oleh kontributor. Dibuat menggunakan Reactjs.
      </Container>
    </Box>
  );
};

export default Footer;
