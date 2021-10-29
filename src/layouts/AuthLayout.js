import { Button } from '@chakra-ui/button';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box, Container, Flex, Heading, Text } from '@chakra-ui/layout';
import Logo from '../components/ui/Logo';
import { FaFirefoxBrowser, FaInstagram, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const buttons = [
  { text: '@sta18pknstan', icon: <FaInstagram /> },
  { text: 'Portal Informasi STA 2018', icon: <FaTelegram /> },
  { text: 'sta18pknstan.com', icon: <FaFirefoxBrowser /> },
];

const AuthLayout = ({ children }) => {
  return (
    <Box
      backgroundImage="/images/bg.jpg"
      backgroundSize="cover"
      bgColor={useColorModeValue('red.800', 'red.900')}
      minH="100vh"
    >
      <Container
        display="flex"
        flexDir="column"
        gridGap="5"
        maxW="container.sm"
        py={{ base: '6', lg: '24' }}
        centerContent
      >
        <Flex
          display="flex"
          flexDir={{ base: 'column', md: 'row' }}
          bgColor={useColorModeValue('white', 'gray.800')}
          boxShadow="lg"
          mx="10px"
          w={{ md: 'container.md' }}
        >
          <Flex
            flexDir="column"
            backgroundImage="/images/bg-auth.jpg"
            backgroundSize="cover"
            maxW={{ md: 'xs' }}
            p="8"
          >
            <Link to="/">
              <Flex color="white">
                <Logo color="white" mb="3" height="10" />
                <Flex flexDir="column">
                  <Heading size="md">Simulasi STA'18</Heading>
                  <Text fontSize="xs">Tahun Angkatan 2018</Text>
                </Flex>
              </Flex>
            </Link>
            <Heading
              size="md"
              color="white"
              display={{ base: 'none', md: 'block' }}
              fontStyle="italic"
              my="8"
            >
              Bertemunya persiapan dan kesempatan membuahkan hasil yang kita
              sebut keberuntungan. <br />
              <Text as="span" fontSize="sm">
                -Anthony Robbins
              </Text>
            </Heading>
            <Flex flexDir="column" display={{ base: 'none', md: 'block' }}>
              {buttons.map(({ text, icon }) => (
                <Button
                  key={text}
                  w="full"
                  colorScheme="whiteAlpha"
                  size="sm"
                  boxShadow="md"
                  my="1.5"
                  leftIcon={icon}
                >
                  {text}
                </Button>
              ))}
            </Flex>
          </Flex>
          <Flex flexDir="column" w="full" p="8">
            {children}
          </Flex>
        </Flex>
        <Text fontSize="sm" color="white">
          © {new Date().getFullYear()}{' '}
          <a
            href="https://www.sta18pknstan.com"
            target="_blank"
            rel="noreferrer"
          >
            STA'18
          </a>
          . All right reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default AuthLayout;
