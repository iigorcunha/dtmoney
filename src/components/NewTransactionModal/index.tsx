import React, { useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outgoImg from "../../assets/outgo.svg";
import {  useTransactions } from "../../hooks/useTransactions";

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {

  const {createTransaction} = useTransactions();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: React.FormEvent) {
    event.preventDefault();
    await createTransaction({
      title,
      type,
      value,
      category
    })

    setTitle('')
    setValue(0)
    setCategory('')
    setType('deposit')    

    onRequestClose();
  }
  return (
    <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button 
          type="button" 
          onClick={onRequestClose} 
          className="react-modal-close">
          <img 
            src={closeImg} 
            alt="close modal" />
        </button>
        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Register Transaction</h2>
          <input 
            value={title}
            onChange={event => setTitle(event.target.value)}
            type="text" 
            placeholder="Title" />

          <input
            value={value}
            onChange={event => setValue(Number(event.target.value))}
            type="number" 
            placeholder="Value" />
          <TransactionTypeContainer>
            
            <RadioBox
              activeColor="green" 
              isActive={type === 'deposit'} 
              type="button" 
              onClick={() => setType('deposit')}>
              <img src={incomeImg} alt="income"/>
              <span>Incoming</span>
            </RadioBox>
            <RadioBox
              activeColor="red" 
              isActive={type === 'withdraw'} 
              onClick={() => setType('withdraw')} 
              type="button">             
              <img src={outgoImg} alt="outgo"/>
              <span>Outgoing</span>
            </RadioBox>
          </TransactionTypeContainer>
          <input
            value={category}
            onChange={event => setCategory(event.target.value)}
            type="text" 
            placeholder="Category" />
          <button type="submit">Register</button>
        </Container>
      </Modal>
  );
}