import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cadastro1.module.css';


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

  const [errorFields, setErrorFields] = useState({});
  const [passwordMismatch, setPasswordMismatch] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Função para validar apenas letras no nome e sobrenome
  const validateName = (value) => {
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/;
    return regex.test(value);
  };

  // Função para formatar CPF no formato: 999.999.999-99
  const formatCPF = (value) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.slice(0, 11); // Limita a 11 dígitos
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    return value;
  };

  // Função para formatar RG no formato: 99.999.999-9
  const formatRG = (value) => {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    value = value.slice(0, 9); // Limita a 9 dígitos
    value = value.replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    value = value.replace(/(\d{3})(\d{1})$/, '$1-$2'); // Adiciona o traço
    return value;
  };

  // Função para lidar com a mudança dos inputs e formatar de acordo com o campo
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
    setErrorFields({ ...errorFields, [field]: false });

    if (field === 'senha' || field === 'confirmeSenha') {
      setPasswordMismatch('');
    }
  };

  const validateForm = () => {
    const newErrorFields = {};
    let hasError = false;

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrorFields[field] = true;
        hasError = true;
      }
    });

    if (formData.senha !== formData.confirmeSenha) {
      setPasswordMismatch('As senhas são diferentes.');
      newErrorFields.confirmeSenha = true;
      hasError = true;
    }

    setErrorFields(newErrorFields);
    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        navigate('http://localhost:3000/Login');
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollView}>
        <div className={styles.header}>
          <img src="/logoaelin.png" alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>Crie sua conta</h1>
          <a href="http://localhost:3000/Login" className={styles.linkLogin}>Já tem uma conta? Faça Login</a>
        </div>

        <div className={styles.formContainer}>
          <div className={styles.stepsContainer}>
            <span className={styles.step1}>Passo 1</span>
            <span className={styles.step}>Passo 2</span>
            <span className={styles.step}>Passo 3</span>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nome</label>
                <input
                  type="text"
                  className={`${styles.input} ${errorFields.nome ? styles.inputError : ''}`}
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome"
                />
                {errorFields.nome && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Sobrenome</label>
                <input
                  type="text"
                  className={`${styles.input} ${errorFields.sobrenome ? styles.inputError : ''}`}
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                  placeholder="Digite seu sobrenome"
                />
                {errorFields.sobrenome && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>CPF</label>
                <input
                  type="text"
                  className={`${styles.input} ${errorFields.cpf ? styles.inputError : ''}`}
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
                {errorFields.cpf && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>RG</label>
                <input
                  type="text"
                  className={`${styles.input} ${errorFields.rg ? styles.inputError : ''}`}
                  value={formData.rg}
                  onChange={(e) => handleInputChange('rg', e.target.value)}
                  placeholder="00.000.000-0"
                />
                {errorFields.rg && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Data de Nascimento</label>
                <input
                  type="date"
                  className={`${styles.input} ${errorFields.dataNascimento ? styles.inputError : ''}`}
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                />
                {errorFields.dataNascimento && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={`${styles.input} ${errorFields.email ? styles.inputError : ''}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite seu Email"
                />
                {errorFields.email && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Senha</label>
                <input
                  type="password"
                  className={`${styles.input} ${errorFields.senha ? styles.inputError : ''}`}
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
                {errorFields.senha && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirme sua Senha</label>
                <input
                  type="password"
                  className={`${styles.input} ${errorFields.confirmeSenha ? styles.inputError : ''} ${passwordMismatch ? styles.inputError : ''}`}
                  value={formData.confirmeSenha}
                  onChange={(e) => handleInputChange('confirmeSenha', e.target.value)}
                  placeholder="Confirme sua senha"
                />
                {passwordMismatch && <p className={styles.errorMessage}>{passwordMismatch}</p>}
                {errorFields.confirmeSenha && !passwordMismatch && <p className={styles.errorMessage}>Campo obrigatório</p>}
              </div>
            </div>

            <button type="submit" className={styles.button}>Avançar</button>
          </form>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <img src="/abraxoscadastro.png" alt="Dragão fofo" className={styles.dragonImage} />
          <p className={styles.loadingMessage}>Aguarde, finalizando cadastro...</p>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
