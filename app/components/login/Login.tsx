"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import "../styles/login.css";

interface LoginData {
  email: string;
  senha: string;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log("Login data:", data);
    alert("Login realizado (simulado)!");
  };

  return (
    <div className="login-container">
      <Image
        src="/logo_sandora.png"
        alt="Logo Sandora"
        width={120}
        height={40}
        className="logo"
      />
    <div className="left-side">
      <h2 className="login-title">Bem-vindo(a) de volta!</h2>
        <p className="login-subtitle">
          Faça login com seu e-mail para acessar seus cursos.
        </p>
    </div>
      <div className="right-side">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h3 style={{ marginBottom: "1.5rem", fontWeight: "bold" }}>Login</h3>

          <label>
            Email
            <input
              type="email"
              placeholder="Insira seu email cadastrado"
              {...register("email", { required: "Email é obrigatório" })}
              className="login-input"
            />
            {errors.email && <p className="error" style={{ color: "red", fontSize: "0.8rem" }}>{errors.email.message}</p>}
          </label>

          <label>
            Senha
            <input
              type="password"
              placeholder="Insira sua senha"
              {...register("senha", { required: "Senha é obrigatória" })}
              className="login-input"
            />
            {errors.senha && <p className="error" style={{ color: "red", fontSize: "0.8rem" }}>{errors.senha.message}</p>}
          </label>

          <a
            href="#"
            className="forgot-password"
          >
            Esqueci minha senha
          </a>

          <button
            type="submit"
            className="login-button"
          >
            FAZER LOGIN
          </button>

          <p style={{ marginTop: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
            Não possui conta? <a href="/cadastro" style={{ color: "#7B2FF7", textDecoration: "none" }}>Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}
