import { Image } from '@chakra-ui/react';

const Logo = props => {
  if (props.color === 'white')
    return (
      <Image
        src="/images/logo-white.png"
        height={props.height || '10'}
        {...props}
      />
    );
  if (props.color === 'blue')
    return (
      <Image
        src="/images/logo-blue.png"
        height={props.height || '10'}
        {...props}
      />
    );
};

export default Logo;
