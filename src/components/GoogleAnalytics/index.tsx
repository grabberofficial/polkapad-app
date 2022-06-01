import PropTypes from 'prop-types';
import { FC, useEffect } from 'react';
import ReactGA, { InitializeOptions } from 'react-ga';

type PropTypes = {
  id: string;
  options?: InitializeOptions;
};

export const GoogleAnalytics: FC<PropTypes> = ({ id, options }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      ReactGA.initialize(id, options);
    }
  }, []);

  return null;
};

GoogleAnalytics.propTypes = {
  id: PropTypes.string.isRequired,
  options: PropTypes.object,
};
