import propTypes from 'prop-types';

import { Container } from './styles';

export default function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Pesquise pelo nome"
        onChange={onChange}
      />
    </Container>
  );
}
InputSearch.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
