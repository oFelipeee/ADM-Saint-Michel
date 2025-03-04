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

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleImagemChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file); // Guardar o arquivo corretamente
            setPreviewImagem(URL.createObjectURL(file)); // Exibir pré-visualização
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formDataToSend = new FormData();

        // Adicionar todos os campos do formulário ao FormData
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        });

        // Adicionar a imagem ao FormData
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
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="idade">Idade:</label>
                            <input type="number" id="idade" value={formData.idade} onChange={handleChange} />
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="cpf">CPF:</label>
                            <input type="text" id="cpf" value={formData.cpf} onChange={handleChange} />
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="crm">CRM:</label>
                            <input type="text" id="crm" value={formData.crm} onChange={handleChange} />
                        </div>
                        <div className="form-groupAdm">
                            <label htmlFor="telefone">Telefone:</label>
                            <input type="text" id="telefone" value={formData.telefone} onChange={handleChange} />
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
                            <input type="email" id="email_corporativo" value={formData.email_corporativo} onChange={handleChange} />
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
