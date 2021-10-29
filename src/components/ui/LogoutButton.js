import { IconButton } from '@chakra-ui/button';
import { useSetRecoilState } from 'recoil';
import { userState } from '../../stores/user';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = () => {
  const setUserState = useSetRecoilState(userState);

  const logout = async () => {
    localStorage.removeItem('token');
    setUserState('');
  };

  return (
    <IconButton
      variant="ghost"
      aria-label="Navigation toggle"
      size="lg"
      icon={<FaSignOutAlt />}
      cursor="pointer"
      onClick={() => logout()}
    />
  );
};

export default LogoutButton;
