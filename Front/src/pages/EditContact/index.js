import ContactForm from '../../components/ContactForm';
import Loader from '../../components/Loader/index';
import PageHeader from '../../components/PageHeader';

import useEditContact from './useEditContact';

export default function EditContact() {
  const { isLoadind, contactName, contactFormRef, handleSubmit } =
    useEditContact();
  return (
    <>
      <Loader isLoading={isLoadind} />
      <PageHeader
        title={isLoadind ? 'Carregando...' : `Editar ${contactName}`}
      />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
