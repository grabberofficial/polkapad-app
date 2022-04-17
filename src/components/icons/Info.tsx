import { CSSProperties } from 'styled-components';
import info from '../../assets/info.svg';

export const InfoIcon: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  return (
    <img
      src={info}
      alt="Info icon"
      style={{
        ...style,
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    />
  );
};
