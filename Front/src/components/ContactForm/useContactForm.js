/* eslint-disable no-empty */
import { useEffect, useImperativeHandle, useState } from 'react';

import useErros from '../../hooks/useErros';
import useSafeAsyncaction from '../../hooks/useSafeAsyncaction';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';
import CateogriesService from '../../services/CategoriesService';
import formatPhone from '../../utilits/formatPhone';
import isEmailValid from '../../utilits/isEmailValid';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const safeAsyncAction = useSafeAsyncaction();
  const { setError, removeError, getErrorMessageByFieldName, erros } =
    useErros();
  const isFormValid = name && erros.length === 0;

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone ?? ''));
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone(formatPhone(''));
        setCategoryId('');
      },
    }),
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    async function loadCategories() {
      try {
        const categoriesList = await CateogriesService.listCategories(
          controller.signal,
        );
        safeAsyncAction(() => {
          setCategories(categoriesList);
        });
      } catch {
      } finally {
        safeAsyncAction(() => {
          setIsLoadingCategories(false);
        });
      }
    }
    loadCategories();
    return () => {
      controller.abort();
    };
  }, [setCategories, setIsLoadingCategories, safeAsyncAction]);

  function handleNameChange(event) {
    setName(event.target.value);
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    // Considerando o email não obrigatorio, porem necessário para validação no banco/api
    setEmail(event.target.value.toLowerCase());
    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'E-mail invalido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit({ name, email, phone, categoryId });
    setIsSubmitting(false);
  }
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
  };
}
