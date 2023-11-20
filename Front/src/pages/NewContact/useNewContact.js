import { useRef } from 'react';

import ContactsServices from '../../services/ContactsService';
import toast from '../../utilits/toast';

export default function useNewContact() {
  const contactFormRef = useRef(null);
  async function handleSubmit(contact) {
    try {
      await ContactsServices.createContact(contact);
      contactFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Contact created successfully!',
        duration: 3000,
      });
    } catch (erro) {
      toast({
        type: 'danger',
        text: `An error has occurred " ${erro.message} " when creating the contact!`,
        duration: 3000,
      });
    }
  }
  return {
    contactFormRef,
    handleSubmit,
  };
}
