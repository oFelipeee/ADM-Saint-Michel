import React from 'react'
import './cadastroAdmin.css'

export default function CadastroAdmin() {
  return (
    <>
    
    <div className="background">

               <form className='formularioAdm'>
               <h2>Cadastro de novos médicos:</h2> 
               <div className='form-group'>
           
                <label htmlFor="nomeCmpleto">Nome completo:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nomeCompleto"
                            placeholder="Informe o nome completo do médico" />

                  </div>

                    <div className="form-group">
                        <label htmlFor="idade">Idade:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="idade"
                            placeholder="Informe a idade do médico" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">CPF:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cpf"
                            placeholder="Informe o cpf do médico" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="crm">CRM:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="crm"
                            placeholder="Informe o número da CRM do médico" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="telefone"
                            placeholder="Informe o número de telefone do médico" />
                    </div>

                    <div className="form-groupSegundo">
                        <label htmlFor="endereco">Endereço:</label>
                        <input
                            type="text"
                            className="form-controlSegundo"
                            id="endereco"
                            placeholder="Informe o endereço do médico" />
                    </div>

                    <div className="form-groupSegundo">
                        <label htmlFor="especialidade">Especialidade:</label>
                        <input
                            type="text"
                            className="form-controlSegundo"
                            id="especialidade"
                            placeholder="Informe a especialidade do médico" />
                    </div>

                    <div className="form-groupSegundo">
                        <label htmlFor="nacionalidade">Nacionalidade:</label>
                        <input
                            type="text"
                            className="form-controlSegundo"
                            id="nacionalidade"
                            placeholder="Informe a nacionalidade do médico" />
                    </div>
                    
                    <div className="form-groupSegundo">
                        <label htmlFor="emailCorporativo">Email Corporativo:</label>
                        <input
                            type="text"
                            className="form-controlSegundo"
                            id="emailCorporativo"
                            placeholder="Informe o email corporativo do médico" />
                    </div>

                    <div className="form-groupSegundo">
                        <label htmlFor="senhaCorporativa">Senha Corporativa:</label>
                        <input
                            type="password"
                            className="form-controlSegundo"
                            id="senhaCorporativa"
                            placeholder="Informe a senha corporativa do médico" />
                    </div>

                    <button type="submit" className="botaoCadastrar">Cadastrar</button>
                   </form>
        
        
        
   </div>





  
    
    
    </>
  )
}
