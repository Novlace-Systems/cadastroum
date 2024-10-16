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

  const [senhaDiferente, setSenhaDiferente] = useState(false);
  const [senhaIgual, setSenhaIgual] = useState(false);

  const validateName = (value) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    return regex.test(value);
  };

  const formatCPF = (value) => {
    value = value.replace(/\D/g, '');
    value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    value = value.replace(/(\d{3})\.(\d{3})(\d{1,3})/, '$1.$2.$3');
    value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    return value;
  };

  const formatRG = (value) => {
    value = value.replace(/\D/g, '');
    value = value.slice(0, 9);
    value = value.replace(/(\d{2})(\d{1,3})/, '$1.$2');
    value = value.replace(/(\d{2})\.(\d{3})(\d{1,3})/, '$1.$2.$3');
    value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d{1,1})/, '$1.$2.$3-$4');
    return value;
  };

  const validatePassword = (value) => {
    return value.length >= 6;
  };

  const handleInputChange = (field, value) => {
    let updatedValue = value;

    if (field === 'nome' || field === 'sobrenome') {
      if (validateName(value)) {
        updatedValue = value;
      } else {
        return;
      }
    }

    if (field === 'cpf') {
      updatedValue = formatCPF(value);
    }

    if (field === 'rg') {
      updatedValue = formatRG(value);
    }

    setFormData({ ...formData, [field]: updatedValue });

    if (field === 'confirmeSenha' || field === 'senha') {
      const senhasSaoIguais = formData.senha === formData.confirmeSenha;
      setSenhaDiferente(!senhasSaoIguais && formData.confirmeSenha !== "");
      setSenhaIgual(senhasSaoIguais && formData.senha.length >= 6 && formData.confirmeSenha.length >= 6);
    }
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
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="inputGroup">
                <label className="label">Sobrenome</label>
                <input
                  type="text"
                  className="input"
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                  placeholder="Digite seu sobrenome"
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputGroup">
                <label className="label">CPF</label>
                <input
                  type="text"
                  className="input"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className="inputGroup">
                <label className="label">RG</label>
                <input
                  type="text"
                  className="input"
                  value={formData.rg}
                  onChange={(e) => handleInputChange('rg', e.target.value)}
                  placeholder="00.000.000-0"
                />
              </div>
            </div>

            <div className="inputRow">
              <div className="inputGroup">
                <label className="label">Data de Nascimento</label>
                <input
                  type="date"
                  className="input"
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                />
              </div>

              <div className="inputGroup">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite seu Email"
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
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div className="inputGroup">
                <label className="label">Confirme sua Senha</label>
                <input
                  type="password"
                  className="input"
                  value={formData.confirmeSenha}
                  onChange={(e) => handleInputChange('confirmeSenha', e.target.value)}
                  placeholder="Confirme sua senha"
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
