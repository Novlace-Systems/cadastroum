import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cadastro1.module.css';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    usuario: '',
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
                <label className={styles.label}>Nome de Usuário</label>
                <input
                  type="text"
                  className={`${styles.input} ${errorFields.usuario ? styles.inputError : ''}`}
                  value={formData.usuario}
                  onChange={(e) => handleInputChange('usuario', e.target.value)}
                  placeholder="Escolha um nome de usuário"
                />
                {errorFields.usuario && <p className={styles.errorMessage}>Campo obrigatório</p>}
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
          <p className={styles.loadingMessage}>Aguarde, estamos processando seus dados...</p>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
