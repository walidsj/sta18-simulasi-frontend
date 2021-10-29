import { useColorModeValue } from '@chakra-ui/color-mode';
import Icon from '@chakra-ui/icon';
import { Box, Container, Flex, Grid, Text } from '@chakra-ui/layout';
import { FaBuilding, FaCodeBranch, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const links = [
  {
    text: 'Info Instansi',
    to: '/info-instansi',
    icon: FaBuilding,
    exact: false,
  },
  { text: 'Simulasi', to: '/simulasi', icon: FaCodeBranch, exact: false },
  { text: 'Profil Saya', to: '/', icon: FaUser, exact: true },
];

const BottomNavbar = () => {
  return (
    <Box
      bgColor={useColorModeValue('white', 'gray.800')}
      boxShadow="lg"
      bottom="0"
      zIndex="1000"
      position="fixed"
      w="full"
      borderTopColor={useColorModeValue('gray.100', 'gray.900')}
      borderTopWidth="1px"
      borderTopRadius="2xl"
    >
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        maxW="container.sm"
        py="2"
      >
        <Grid w="full" templateColumns="repeat(3, 1fr)" gridGap="20px">
          {links.map(({ text, to, icon, exact }) => (
            <NavLink
              key={text}
              exact={exact}
              to={to}
              activeStyle={{ color: '#822727' }}
            >
              <Flex
                cursor="pointer"
                direction="column"
                justifyContent="center"
                alignItems="center"
                gridGap="4px"
              >
                <Icon as={icon} fontSize="xl" />
                <Text fontSize="xs" textAlign="center">
                  {text}
                </Text>
              </Flex>
            </NavLink>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BottomNavbar;
