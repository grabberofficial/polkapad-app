import styled from '@emotion/styled';
import user from '../../../../../../assets/user.svg';

const Divider = styled.div`
  width: 0px;
  height: 21px;
  border-left: 1px solid #f6f5f5;
  margin-left: 16px;
  margin-right: 13px;
`;

export const AccountButtonIcon = () => {
  return (
    <>
      <img src={user} alt="User icon" />
      <Divider />
    </>
  );
};
