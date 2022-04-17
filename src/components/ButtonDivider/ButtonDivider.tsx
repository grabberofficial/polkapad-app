import styled from '@emotion/styled';

export const ButtonDivider = styled.div<{ color?: string }>`
  width: 0px;
  height: 21px;
  border-left: 1px solid ${({ color }) => color || '#f6f5f5'};
  margin-left: 16px;
  margin-right: 13px;
`;
