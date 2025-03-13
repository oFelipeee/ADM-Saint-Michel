import React, { useState } from 'react';
import axios from 'axios';
import './cadastroAdmin.css';

export default function CadastroAdmin() {
    const [formData, setFormData] = useState({
        nome_completo: '',
        idade: '',
        cpf: '',
        crm: '',
        telefone: '',
        endereco: '',
        especialidade: '',
        nacionalidade: '',
        email_corporativo: '',
        senha_corporativa: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImagem, setPreviewImagem] = useState(null);
    const [errors, setErrors] = useState({}); // Estado para armazenar mensagens de erro

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
        // Limpa o erro ao digitar no campo
        setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
    };

    const handleImagemChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewImagem(URL.createObjectURL(file));
        }
    };

    // Função para validar o CPF
    const validateCPF = (cpf) => {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Padrão: 000.000.000-00
        return cpfRegex.test(cpf);
    };

    // Função para validar o CRM
    const validateCRM = (crm) => {
        const crmRegex = /^[A-Za-z]{2}-\d{6}$/; // Padrão: AA-123456
        return crmRegex.test(crm);
    };

    // Função para validar o Telefone
    const validateTelefone = (telefone) => {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/; // Padrão: (00) 00000-0000 ou (00) 0000-0000
        return telefoneRegex.test(telefone);
    };

    // Função para validar a Idade
    const validateIdade = (idade) => {
        return idade > 0 && idade <= 100; // Idade entre 1 e 100 anos
    };

    // Função para validar o Email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Padrão: usuario@dominio.com
        return emailRegex.test(email);
    };

    // Função para validar o formulário
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Validação do Nome Completo
        if (!formData.nome_completo.trim()) {
            isValid = false;
        }

        // Validação da Idade
        if (!formData.idade) {
            isValid = false;
        } else if (!validateIdade(formData.idade)) {
            newErrors.idade = 'A idade deve estar entre 1 e 100 anos.';
            isValid = false;
        }

        // Validação do CPF
        if (!formData.cpf.trim()) {
            isValid = false;
        } else if (!validateCPF(formData.cpf)) {
            newErrors.cpf = 'CPF inválido. Use o formato: 000.000.000-00.';
            isValid = false;
        }

        // Validação do CRM
        if (!formData.crm.trim()) {
            isValid = false;
        } else if (!validateCRM(formData.crm)) {
            newErrors.crm = 'CRM inválido. Use o formato: AA-123456.';
            isValid = false;
        }

        // Validação do Telefone
        if (!formData.telefone.trim()) {
            isValid = false;
        } else if (!validateTelefone(formData.telefone)) {
            newErrors.telefone = 'Telefone inválido. Use o formato: (00) 00000-0000.';
            isValid = false;
        }

        // Validação do Email Corporativo
        if (!formData.email_corporativo.trim()) {
            isValid = false;
        } else if (!validateEmail(formData.email_corporativo)) {
            newErrors.email_corporativo = 'Email inválido. Use o formato: usuario@dominio.com.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            alert('Por favor, corrija os erros antes de enviar.');
            return;
        }

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });
        if (selectedFile) {
            formDataToSend.append('foto', selectedFile);
        }

        try {
            await axios.post('http://localhost:5000/medico/cadastro', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            alert('Cadastro de Médico realizado com sucesso!');
            setFormData({
                nome_completo: '',
                idade: '',
                cpf: '',
                crm: '',
                telefone: '',
                endereco: '',
                especialidade: '',
                nacionalidade: '',
                email_corporativo: '',
                senha_corporativa: '',
            });
            setSelectedFile(null);
            setPreviewImagem(null);
            setErrors({});
        } catch (error) {
            alert('Erro ao cadastrar');
            console.error('Erro ao cadastrar', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="background">
            <form onSubmit={handleSubmit} className="formularioAdm">
                <h2 className="tituloAdm">Cadastro de novos médicos:</h2>

                <div className="linha-colunas">
                    <div className="coluna-vertical">
                        <div className="form-groupAdm">
                            <label htmlFor="nome_completo">Nome completo:</label>
                            <input type="text" id="nome_completo" value={formData.nome_completo} onChange={handleChange} />
                            {errors.nome_completo && <span className="error-message">{errors.nome_completo}</span>}
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                type="number"
                                id="idade"
                                value={formData.idade}
                                onChange={handleChange}
                                min="1"
                                max="100"
                            />
                            {errors.idade && <span className="error-message">{errors.idade}</span>}
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="cpf">CPF:</label>
                            <input
                                type="text"
                                id="cpf"
                                value={formData.cpf}
                                onChange={handleChange}
                                placeholder="000.000.000-00"
                            />
                            {errors.cpf && <span className="error-message">{errors.cpf}</span>}
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="crm">CRM:</label>
                            <input
                                type="text"
                                id="crm"
                                value={formData.crm}
                                onChange={handleChange}
                                placeholder="AA-123456"
                            />
                            {errors.crm && <span className="error-message">{errors.crm}</span>}
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="text"
                                id="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                placeholder="(00) 00000-0000"
                            />
                            {errors.telefone && <span className="error-message">{errors.telefone}</span>}
                        </div>
                    </div>

                    <div className="coluna-vertical">
                        <div className="form-groupSegundo">
                            <label htmlFor="endereco">Endereço:</label>
                            <input type="text" id="endereco" value={formData.endereco} onChange={handleChange} />
                        </div>
                        <div className="form-groupSegundo">
                            <label htmlFor="especialidade">Especialidade:</label>
                            <select id="especialidade" value={formData.especialidade} onChange={handleChange}>
                                <option value="">Selecione uma especialidade</option>
                                <option value="Ortopedista">Ortopedista</option>
                                <option value="Proctologista">Proctologista</option>
                                <option value="Oncologista">Oncologista</option>
                                <option value="Otorrinolaringologista">Otorrinolaringologista</option>
                                <option value="Oftalmologista">Oftalmologista</option>
                                <option value="Cardiologista">Cardiologista</option>
                                <option value="Pneumologista">Pneumologista</option>
                                <option value="Nefrologista">Nefrologista</option>
                                <option value="Gastroenterologista">Gastroenterologista</option>
                                <option value="Urologista">Urologista</option>
                                <option value="Dermatologista">Dermatologista</option>
                                <option value="Ginecologista">Ginecologista</option>
                            </select>
                        </div>
                        <div className="form-groupSegundo">
                            <label htmlFor="nacionalidade">Nacionalidade:</label>
                            <input type="text" id="nacionalidade" value={formData.nacionalidade} onChange={handleChange} />
                        </div>
                        <div className="form-groupSegundo">
                            <label htmlFor="email_corporativo">Email Corporativo:</label>
                            <input
                                type="email"
                                id="email_corporativo"
                                value={formData.email_corporativo}
                                onChange={handleChange}
                                placeholder="usuario@dominio.com"
                            />
                            {errors.email_corporativo && <span className="error-message">{errors.email_corporativo}</span>}
                        </div>
                        <div className="form-groupSegundo">
                            <label htmlFor="senha_corporativa">Senha Corporativa:</label>
                            <input type="password" id="senha_corporativa" value={formData.senha_corporativa} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <input type="file" id="imagem" accept="image/*" onChange={handleImagemChange} />
                </div>

                {previewImagem && (
                    <div className="imgPreview">
                        <img src={previewImagem} alt="Pré-visualização" className="imgPreviewImage" />
                    </div>
                )}

                <button type="submit" className="botaoCadastrar">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}