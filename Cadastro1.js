import React, { useState } from 'react';
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

  if (!nome) newErrors.nome = 'Campo obrigatório';
    if (!sobrenome) newErrors.sobrenome= 'Campo obrigatório';
    if (!cpf) newErrors.cpf = 'Campo obrigatório';
    if (!rg) newErrors.rg = 'Campo obrigatório';
    if (!dataNascimento) newErrors.dataNascimento = 'Campo obrigatório';
    if (!email) newErrors.email = 'Campo obrigatório';
    if (!senha) newErrors.senha = 'Campo obrigatório';
    if (!confirmeSenha) newErrors.confirmeSenha = 'Campo obrigatório';

    if (Object.keys(newErrors).some((key) => newErrors[key])) {
      setErrors(newErrors); // Atualizando os erros
      return;
    };

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

          <form className={styles.form}>
            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nome</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Digite seu nome"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Sobrenome</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.sobrenome}
                  onChange={(e) => handleInputChange('sobrenome', e.target.value)}
                  placeholder="Digite seu sobrenome"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>CPF</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  placeholder="000.000.000-00"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>RG</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formData.rg}
                  onChange={(e) => handleInputChange('rg', e.target.value)}
                  placeholder="00.000.000-0"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Data de Nascimento</label>
                <input
                  type="date"
                  className={styles.input}
                  value={formData.dataNascimento}
                  onChange={(e) => handleInputChange('dataNascimento', e.target.value)}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite seu Email"
                />
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Senha</label>
                <input
                  type="password"
                  className={styles.input}
                  value={formData.senha}
                  onChange={(e) => handleInputChange('senha', e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Confirme sua Senha</label>
                <input
                  type="password"
                  className={styles.input}
                  value={formData.confirmeSenha}
                  onChange={(e) => handleInputChange('confirmeSenha', e.target.value)}
                  placeholder="Confirme sua senha"
                />
              </div>
            </div>
          </form>
        </div>

        <a href="http://localhost:3000/Login">
        <button className={styles.button}>Avançar</button></a>
      </div>
    </div>
  );
};

export default Cadastro;
