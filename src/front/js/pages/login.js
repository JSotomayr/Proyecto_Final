import React, { Fragment, useContext } from "react";

import { Context } from "../store/appContext.js";
import logoBig from "../../img/logoBig.png";
import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";



import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


import Form from 'react-bootstrap/Form'

import "../../styles/login.scss";

export const Login = () => {
	const { store, actions } = useContext(Context);

	const {
		register,
		handleSubmit,
		formState: {errors}

	} = useForm();

	const onSubmit = data => actions.login(data)

	return (
		<Fragment>

			<div className="loginContainer">
				<div className="btn">
					<Link to="/">
						volver
					</Link>
				</div>
				<p>
					<img src={logoBig} />
				</p>
				<div className="title">Iniciar sesión</div>
				<div className="login-form">
					<form
						onSubmit={handleSubmit(onSubmit)} >
						<label htmlFor="username"></label>
						<input 
							id ="username"
							placeholder="Usuario"
							className="form-control"
							aria-invalid={errors.username ? "true" : "false"}
							{...register("username", { required: true, maxLength: 15})}
						/>
						
						<div className="alertDiv">
							{errors.username && errors.username.type === "required" && <span role="alert">El campo Usuario es obligatorio</span>}
							{errors.username && errors.username.type === "maxLength" && <span role="alert">Máximo de caracteres excedido</span>}
						</div>
{/* 
							{...register("username", { required: true, maxLength: 30})}
						/>
						 */}
						<div className="alertDiv">
							{errors.email && errors.username.type === "required" && <span role="alert">El campo Usuario es obligatorio</span>}
							{errors.email && errors.username.type === "maxLength" && <span role="alert">Max length exceedeed</span>}
						</div>

						<label htmlFor="email"></label>
						<input 
							id ="email"
							placeholder="Email"
							className="form-control"
							aria-invalid={errors.email ? "true" : "false"}
							{...register("email", { required: true, minLength: 10})}
						/>

						<div className="alertDiv">
							{errors.email && errors.email.type === "required" && <span role="alert">El campo Email es obligatorio</span>}
							{errors.email && errors.email.type === "minLength" && <span role="alert">El formato de email es incorrecto</span>}
						</div>

						<label htmlFor="password"></label>
						<input 
							id ="password"
							type="password"
							placeholder="Contraseña"
							className="form-control"
							aria-invalid={errors.password ? "true" : "false"}
							{...register("password", { required: true, minLength: 5})}
							/>
						<div className="alertDiv">
							{errors.password && errors.password.type === "required" && <span role="alert">El campo Contraseña es obligatorio</span>}
							{errors.password && errors.password.type === "minLength" && <span role="alert">Mínimo de longitud es de 5 caracteres</span>}
						</div>

						<p className="forgottenPassword">He olvidado mi contraseña</p>
						

					{/* OPCION 1
						<div className="chooseUserBusiness mt-3">
							<FormControl component="fieldset">
								<RadioGroup row aria-label="gender" name="row-radio-buttons-group" >
									<FormControlLabel value="Usuario" control={<Radio />} label="Usuario" />
									<FormControlLabel value="Empresa" control={<Radio />} label="Empresa" />
								</RadioGroup>
							</FormControl>
						</div> */}

						{/* OPCION 2 */}
						{/* <input {...register("radio")} type="radio" value="A"   />
      					<input {...register("radio")} type="radio" value="B" />
						  <div className="alertDiv">
							{errors.radio && errors.radio.type === "required" && <span role="alert">El campo elegir usuario o negocio es obligatorio</span>}
						</div> */}
      	
		  				{/* OPCION 3 */}
						  {/* <input 
							id ="chooseUserBusiness"
							type="radio"
							value="Usuario"
							className="chooseUserBusiness"
							{...register("chooseUserBusiness", { required: true,})}
							/>
						<div className="alertDiv">
							{errors.chooseUserBusiness && errors.chooseUserBusiness.type === "required" && <span role="alert">El campo elegir usuario o negocio es obligatorio</span>}
						</div> */}




					
						<div className="chooseUserBusiness mt-3">
						  <Form.Check
								type="radio"
								label="Usuario"
								name="formHorizontalRadios"
								id="formHorizontalRadios2"
								required
								/>
								<Form.Check
								type="radio"
								label="Empresa"
								name="formHorizontalRadios"
								id="formHorizontalRadios3"
								/>
						</div>

						<button type="submit" className="btn btn-primary form-control btn_submit mt-5">Iniciar sesión</button> 
						{errors.submit && errors.submit.type === "required" && <span role="alertSubmitLog">!ERROR! Se ha producido un error en su intento de Inicio de sesión. Asegúrese de que el correo, el nombre de usuario y la contraseña son correctos</span>}

					</form>
				</div>
				
			</div>

		</Fragment>
	);

};

