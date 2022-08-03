import user from '../../../../assets/user.svg';

export const AccountButtonIcon: React.FC<{ color?: string }> = ({ color }) => {
  return <img src={user} alt="User icon" color={color ? color : undefined} />;
};
