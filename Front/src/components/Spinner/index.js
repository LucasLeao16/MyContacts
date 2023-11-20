import propTypes from 'prop-types';

import { StyledSpinner } from './styles';

export default function Spinner({ size = 32 }) {
  return <StyledSpinner size={size} />;
}
Spinner.propTypes = {
  size: propTypes.number,
};
