import Logo from '../ui/Logo';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import { ColorModeSwitcher } from '../ui/ColorModeSwitcher';
import { Link } from 'react-router-dom';
import LogoutButton from '../ui/LogoutButton';

const TopNavbar = () => {
  return (
    <Box
      bgColor="red.800"
      backgroundImage="/images/bg.jpg"
      backgroundSize="cover"
      color="white"
      boxShadow="lg"
      zIndex="1000"
      position="fixed"
      w="full"
      borderBottomRadius="2xl"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="container.sm"
        py="2"
      >
        <Flex as={Link} to="/" color="white">
          <Logo color="white" mb="3" height="10" />
          <Flex flexDir="column">
            <Heading size="md">Simulasi STA'18</Heading>
            <Text fontSize="xs">Tahun Angkatan 2018</Text>
          </Flex>
        </Flex>
        <Flex>
          <ColorModeSwitcher size="lg" mr="3" />
          <LogoutButton />
        </Flex>
      </Container>
    </Box>
  );
};

export default TopNavbar;
