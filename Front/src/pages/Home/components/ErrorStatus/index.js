import propTypes from 'prop-types';

import sad from '../../../../assets/images/icons/sad.svg';
import Button from '../../../../components/Button/index';

import { Container } from './style';

export default function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}
ErrorStatus.propTypes = {
  onTryAgain: propTypes.func.isRequired,
};
