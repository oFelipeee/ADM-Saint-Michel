import React, { useState } from 'react'; 
import './cadastroAdmin.css';

export default function CadastroAdmin() {
    const [previewImagem, setPreviewImagem] = useState(null);
    const [erroImagem, setErroImagem] = useState('');

    const handleImagemChange = (event) => {
        const arquivo = event.target.files[0];
      
        if (arquivo) {
            const tamanhoMaximo = 5 * 1024 * 1024; // Limite de 5 MB (em bytes)
            const tipoValido = ['image/jpeg', 'image/png', 'image/gif'];

            // Verificando se o arquivo está dentro do limite de tamanho
            if (arquivo.size > tamanhoMaximo) {
                setErroImagem('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
                setPreviewImagem(null);
                return;
            }

            // Verificando se o tipo do arquivo é válido
            if (!tipoValido.includes(arquivo.type)) {
                setErroImagem('Formato de imagem inválido. Apenas JPG, PNG e GIF são permitidos.');
                setPreviewImagem(null);
                return;
            }

            // Verificando as dimensões da imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    // Largura: 300px, Altura: 400px
                    const larguraPermitida = 300;
                    const alturaPermitida = 400;

                    if (img.width !== larguraPermitida || img.height !== alturaPermitida) {
                        setErroImagem('A imagem deve ter as dimensões de 300x400px.');
                        setPreviewImagem(null);
                        return;
                    }

                    // Se tudo estiver certo, definimos o preview da imagem
                    setErroImagem('');
                    setPreviewImagem(e.target.result);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(arquivo);
        }
    };

    return (
        <div className="background">
            <form className="formularioAdm">
                <h2 className="tituloAdm">Cadastro de novos médicos:</h2>
                <br />
                
                <div className="linha-colunas">
                    <div className="coluna-vertical">
                        {/* Campos de entrada do formulário */}
                        <div className="form-groupAdm">
                            <label htmlFor="nomeCompleto">Nome completo:</label>
                            <input
                                type="text"
                                className="form-controlAdm"
                                id="nomeCompleto"
                                placeholder="Informe o nome completo do médico"
                            />
                        </div>

                        <div className="form-groupAdm">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                type="number"
                                className="form-controlAdm"
                                id="idade"
                                placeholder="Informe a idade do médico"
                            />
                        </div>

                        <div className="form-groupAdm">
                            <label htmlFor="cpf">CPF:</label>
                            <input
                                type="text"
                                className="form-controlAdm"
                                id="cpf"
                                placeholder="Informe o CPF do médico"
                            />
                        </div>

                        <div className="form-groupAdm">
                            <label htmlFor="crm">CRM:</label>
                            <input
                                type="text"
                                className="form-controlAdm"
                                id="crm"
                                placeholder="Informe o número da CRM do médico"
                            />
                        </div>

                        <div className="form-groupAdm">
                            <label htmlFor="telefone">Telefone:</label>
                            <input
                                type="text"
                                className="form-controlAdm"
                                id="telefone"
                                placeholder="Informe o número de telefone do médico"
                            />
                        </div>
                    </div>

                    {/* Segunda coluna */}
                    <div className="coluna-vertical">
                        <div className="form-groupSegundo">
                            <label htmlFor="endereco">Endereço:</label>
                            <input
                                type="text"
                                className="form-controlSegundo"
                                id="endereco"
                                placeholder="Informe o endereço do médico"
                            />
                        </div>

                        <div className="form-groupSegundo">
                            <label htmlFor="especialidade">Especialidade:</label>
                            <input
                                type="text"
                                className="form-controlSegundo"
                                id="especialidade"
                                placeholder="Informe a especialidade do médico"
                            />
                        </div>

                        <div className="form-groupSegundo">
                            <label htmlFor="nacionalidade">Nacionalidade:</label>
                            <input
                                type="text"
                                className="form-controlSegundo"
                                id="nacionalidade"
                                placeholder="Informe a nacionalidade do médico"
                            />
                        </div>

                        <div className="form-groupSegundo">
                            <label htmlFor="emailCorporativo">Email Corporativo:</label>
                            <input
                                type="text"
                                className="form-controlSegundo"
                                id="emailCorporativo"
                                placeholder="Informe o email corporativo do médico"
                            />
                        </div>

                        <div className="form-groupSegundo">
                            <label htmlFor="senhaCorporativa">Senha Corporativa:</label>
                            <input
                                type="password"
                                className="form-controlSegundo"
                                id="senhaCorporativa"
                                placeholder="Informe a senha corporativa do médico"
                            />
                        </div>
                    </div>
                </div>

                {/* Input de imagem */}
                <div className="form-group">
                    <input
                        type="file"
                        id="imagem"
                        className="inputImagem"
                        accept="image/*"
                        onChange={handleImagemChange}
                    />
                </div>

                {/* Exibindo erro de imagem */}
                {erroImagem && <p className="erroImagem">{erroImagem}</p>}

                {/* Pré-visualização da imagem */}
                {previewImagem && (
                    <div className="imgPreview">
                        <img 
                            src={previewImagem} 
                            alt="Pré-visualização"
                            className="imgPreviewImage"
                        />
                    </div>
                )}

                <button type="submit" className="botaoCadastrar">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
