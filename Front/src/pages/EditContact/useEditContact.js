import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useSafeAsyncaction from '../../hooks/useSafeAsyncaction';
import ContactsServices from '../../services/ContactsService';
import toast from '../../utilits/toast';

export default function useEditContact() {
  const [isLoadind, setIsLoadind] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const safeAsyncAction = useSafeAsyncaction();
  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const contact = await ContactsServices.getContactById(
          id,
          controller.signal,
        );
        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setIsLoadind(false);
          setContactName(contact.name);
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        safeAsyncAction(() => {
          // Foi usado o modo replace ao inves de simplesmente redirecionar, para evitar que seja possivél voltar nesta pagina onde não há contato
          navigate('/', { replace: true });
          toast({ type: 'danger', text: 'Contato não encontrado!' });
        });
      }
    }

    loadContact();

    return () => {
      controller.abort();
    };
  }, [id, navigate, safeAsyncAction]);

  async function handleSubmit(contact) {
    try {
      const contactData = await ContactsServices.updateContact(id, contact);
      setContactName(contactData.name);
      toast({
        type: 'success',
        text: 'Contact edited successfully!',
        duration: 3000,
      });
    } catch (erro) {
      toast({
        type: 'danger',
        text: `An error has occurred "${erro.message}" when editing the contact!`,
        duration: 3000,
      });
    }
  }

  return {
    isLoadind,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
