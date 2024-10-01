import React, { useState } from 'react';
import './App.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    email: '',
    senha: '',
    confirmeSenha: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="container">
      <div className="scrollView">
        <div className="header">
          <img src="/logoaelin.png" alt="Logo" className="logo" />
          <h1 className="title">Crie sua conta</h1>
          <a href="#" className="linkLogin">Já tem uma conta? Faça Login</a>
        </div>

        <div className="formContainer">
          <div className="stepsContainer">
            <span className="step1">Passo 1</span>
            <span className="step">Passo 2</span>
            <span className="step">Passo 3</span>
          </div>

          <form className="form">
            <div className="inputRow">
              <div className="inputGroup">
                <label className="label">Nome</label>
                <input
                  type="text"
                  className="input"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Anna Clara"
                />
              </div>

              <div className="inputGroup">
                <label className="label">Sobrenome</label>
                <input
                  type="text"
                  className="input"
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                  placeholder="Machado Batista"
                />
              </div>
            </div>

            <div className="inputRow">
            <div className="inputGroup">
              <label className="label">CPF</label>
              <input
                type= 'number'
                className="input"
                value={formData.cpf}
                onChange={(e) => handleInputChange('cpf', e.target.value)}
                placeholder=" "
              />
            </div>

            <div className="inputGroup">
              <label className="label">RG</label>
              <input
                type= 'number'
                fr                className="input"
                value={formData.rg}
                onChange={(e) => handleInputChange('rg', e.target.value)}
                placeholder=" "
              />
            </div>
          </div>

          <div className="inputRow">
            <div className="inputGroup">
              <label className="label">Data de Nascimento</label>
              <input
                type='date'
                className="input"
                value={formData.dataNascimento}
                onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                placeholder=" "
              />
            </div>

            <div className="inputGroup">
              <label className="label">Email</label>
              <input
                type='email'
                className="input"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder=" "
              />
            </div>
          </div>

          <div className="inputRow">
            <div className="inputGroup">
              <label className="label">Senha</label>
              <input
                type="password"
                className="input"
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                placeholder=" "
              />
            </div>

            <div className="inputGroup">
              <label className="label">Confirme sua Senha</label>
              <input
                type="password"
                className="input"
                value={formData.confirmeSenha}
                onChange={(e) => handleInputChange('confirmeSenha', e.target.value)}
                placeholder=" "
              />
            </div>
          </div>
        </form>
      </div>
 
  


        <button className="button">Avançar</button>
      </div>
    </div>
  );
};

export default Cadastro;