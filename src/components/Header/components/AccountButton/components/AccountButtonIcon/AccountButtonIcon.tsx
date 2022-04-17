import { ButtonDivider } from '@/components/ButtonDivider/ButtonDivider';
import user from '../../../../../../assets/user.svg';

export const AccountButtonIcon = () => {
  return (
    <>
      <img src={user} alt="User icon" />
      <ButtonDivider />
    </>
  );
};
