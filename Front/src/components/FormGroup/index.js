/* eslint-disable react/prop-types */
import propTypes from 'prop-types';

import Spinner from '../Spinner';

import { Container } from './styles';

export default function FormGroup({
  children,
  error = null,
  isLoading = false,
}) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {isLoading && (
          <div className="loader">
            <Spinner size={16} />
          </div>
        )}
      </div>
      {error && <small>{error}</small>}
    </Container>
  );
}
FormGroup.prototype = {
  children: propTypes.node.isRequired,
  error: propTypes.string,
  isLoading: propTypes.bool,
};
