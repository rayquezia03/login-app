"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";

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
    <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
      {/* LOGO */}
      <Image
        src="/logo_sandora.png"
        alt="Logo Sandora"
        width={120}
        height={40}
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "2rem",
          zIndex: 10,
        }}
      />
      {/* Lado esquerdo */}
      <div
        style={{
          flex: 1,
          backgroundColor: "white",
          padding: "4rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <h2 style={{ color: 'black', fontWeight: "bold", fontSize: "4rem" }}>
          Bem-vindo(a) de volta!
        </h2>
        <p style={{ color: 'black', fontSize: "1rem" }}>Faça login com seu e-mail para acessar seus cursos.</p>
      </div>

      {/* Lado direito */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#7B2FF7",
          color: "white",
          padding: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "2rem",
            color: "#333",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgb(0 0 0 / 0.1)",
          }}
          noValidate
        >
          <h3 style={{ marginBottom: "1.5rem", fontWeight: "bold" }}>Login</h3>

          <label>
            Email
            <input
              type="email"
              placeholder="Insira seu email cadastrado"
              {...register("email", { required: "Email é obrigatório" })}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.email?.message}</p>
          </label>

          <label>
            Senha
            <input
              type="password"
              placeholder="Insira sua senha"
              {...register("senha", { required: "Senha é obrigatória" })}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.senha?.message}</p>
          </label>

          <a
            href="#"
            style={{ fontSize: "0.8rem", color: "#7B2FF7", display: "inline-block", marginBottom: "1rem" }}
          >
            Esqueci minha senha
          </a>

          <button
            type="submit"
            style={{
              backgroundColor: "#7B2FF7",
              color: "white",
              width: "100%",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            FAZER LOGIN
          </button>

          <p style={{ marginTop: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
            Não possui conta?{" "}
            <button
              type="button"
              onClick={() => router.push("/cadastro")}
              style={{ color: "#7B2FF7", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Cadastre-se
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
