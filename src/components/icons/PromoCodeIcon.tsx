import { CSSProperties } from 'styled-components';
import promo from '../../assets/promo_code.svg';

export const PromoCodeIcon: React.FC<{ style?: CSSProperties }> = ({
  style,
}) => {
  return (
    <img
      src={promo}
      alt="Promo code icon"
      style={{
        ...style,
        maxHeight: '100%',
        maxWidth: '100%',
      }}
    />
  );
};
