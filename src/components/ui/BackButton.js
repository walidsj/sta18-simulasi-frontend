import Icon from '@chakra-ui/icon';
import { Flex, Text } from '@chakra-ui/layout';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function BackButton(props) {
  return (
    <Flex>
      <Link {...props}>
        <Flex direction="row" alignItems="center">
          <Icon as={FaArrowLeft} />
          <Text ml="5px">Kembali</Text>
        </Flex>
      </Link>
    </Flex>
  );
}
