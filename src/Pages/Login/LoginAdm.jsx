import React from 'react'
import './loginAdm.css'

export default function LoginAdm() {
  return (
    
     <div className="backgroundImage">
                <br />
                <form className='formularioLogin'>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="crm" className='campos'>EMAIL:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Informe o seu email corporativo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='campos'>SENHA:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Informe a sua senha corporativa" />
                    </div>
                    <button type="submit" className="botaoEntrar">Entrar</button>
                </form>
            </div>
    
  )
}
