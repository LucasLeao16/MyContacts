/* eslint-disable no-nested-ternary */
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Container } from './styles';

export default function Header({
  hasError,
  qtyOfContacts,
  qtyOfFilteredContacts,
}) {
  const alignment = hasError
    ? 'flex-end'
    : qtyOfContacts > 0
      ? 'space-between'
      : 'center';
  return (
    <Container justifyContent={alignment}>
      {!hasError && qtyOfContacts > 0 && (
        <strong>
          {qtyOfFilteredContacts}
          {qtyOfFilteredContacts === 1 ? ' contato' : ' contatos'}
        </strong>
      )}
      <Link to="/new">Novo Contato</Link>
    </Container>
  );
}
Header.propTypes = {
  hasError: propTypes.bool.isRequired,
  qtyOfContacts: propTypes.number.isRequired,
  qtyOfFilteredContacts: propTypes.number.isRequired,
};
