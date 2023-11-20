import propTypes from 'prop-types';

import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

import { Container } from './styles';

export default function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />
      <span>
        Nenhum resultado foi encontrado para
        <strong>{` ${searchTerm}`}</strong>
      </span>
    </Container>
  );
}
SearchNotFound.propTypes = {
  searchTerm: propTypes.string.isRequired,
};
