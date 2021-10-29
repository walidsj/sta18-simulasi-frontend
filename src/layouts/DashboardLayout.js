import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container } from '@chakra-ui/layout';
import Footer from '../components/Footer';
import BottomNavbar from '../components/navbar/BottomNavbar';
import TopNavbar from '../components/navbar/TopNavbar';

const DashboardLayout = ({ children }) => {
  return (
    <>
      <TopNavbar />
      <Box
        as="section"
        minH="100vh"
        pt="24"
        pb="10"
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Container display="flex" flexDir="column" maxW="container.sm">
          {children}
        </Container>
      </Box>
      <BottomNavbar />
      <Footer />
    </>
  );
};

export default DashboardLayout;
