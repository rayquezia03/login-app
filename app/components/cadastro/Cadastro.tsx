"use client";

import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "../styles/cadastro.css";

interface FormData {
  nomeCompleto: string;
  empresa: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

const schema = yup.object().shape({
  nomeCompleto: yup.string().required("Nome Completo é obrigatório"),
  empresa: yup.string().required("Empresa é obrigatória"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  senha: yup.string().min(6, "Senha deve ter ao menos 6 caracteres").required("Senha é obrigatória"),
  confirmarSenha: yup.string()
    .oneOf([yup.ref('senha')], 'As senhas devem ser iguais')
    .required("Confirmação de senha é obrigatória"),
});

export default function Cadastro() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
    alert("Conta criada com sucesso!");
  };

  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <div className="cadastro-container">
      <Image
        className="logo"
        src="/logo_sandora.png"
        alt="Logo Sandora"
        width={120}
        height={40}
      />

      <div className="left-side">
        <h2 style={{ 
          fontWeight: 'bold', 
          fontSize: '2rem',
          lineHeight: '1.2'
        }}>
          <span style={{ color: 'black'}}>Crie sua conta e comece a </span>
          <span style={{ color: '#7B2FF7' }}>aprender</span>
        </h2>
        <p style={{ fontSize: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          <span style={{ color: 'black' }}>Crie sua conta em poucos segundos</span>
          <span style={{ color: '#7B2FF7' }}> e comece sua jornada de aprendizado.</span>
        </p>
      </div>

      <div className="right-side">
        <form onSubmit={handleSubmit(onSubmit)} style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "1.5rem",
          color: "#333",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 8px rgb(0 0 0 / 0.1)",
          margin: "0 auto"
        }}
          noValidate
        >
          <h3 style={{ marginBottom: "1.5rem", fontWeight: "bold" }}>Cadastro</h3>

          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Nome Completo
            <input
              type="text"
              placeholder="Como você será identificado na plataforma."
              {...register("nomeCompleto")}
              style={{ 
                width: "100%", 
                padding: "0.75rem",
                marginTop: "0.25rem",
                marginBottom: "0.5rem",
                borderRadius: "4px",
                border: "1px solid #ddd",
                fontSize: "0.95rem"
              }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.nomeCompleto?.message}</p>
          </label>

          <label>
            Empresa
            <input
              type="text"
              placeholder="Insira o nome da empresa."
              {...register("empresa")}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.empresa?.message}</p>
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Será usado para login e comunicações."
              {...register("email")}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.email?.message}</p>
          </label>

          <label>
            Senha
            <input
              type="password"
              placeholder="(mín. 6 caracteres)"
              {...register("senha")}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.senha?.message}</p>
          </label>

          <label>
            Confirmar Senha
            <input
              type="password"
              placeholder="(mín. 6 caracteres)"
              {...register("confirmarSenha")}
              style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", marginBottom: "0.5rem" }}
            />
            <p style={{ color: "red", fontSize: "0.8rem" }}>{errors.confirmarSenha?.message}</p>
          </label>

          <p style={{ fontSize: "0.7rem", marginTop: "0.5rem" }}>
            Ao criar sua conta, você concorda com nossos{" "}
            <a href="#" style={{ color: "#7B2FF7" }} onClick={(e) => {
              e.preventDefault();
              setIsTermsModalOpen(true);
            }}>
              Termos de Uso e
            </a>{" "}
            <a href="#" style={{ color: "#7B2FF7" }} onClick={(e) => {
              e.preventDefault();
              setIsPrivacyModalOpen(true);
            }}>
              Política de Privacidade
            </a>
            .
          </p>

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
              marginTop: "1rem",
              cursor: "pointer",
              fontSize: "1rem",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#6624e0";
            }}
            onMouseOut={(e) => {
              (e.target as HTMLButtonElement).style.backgroundColor = "#7B2FF7";
            }}
          >
            CRIAR CONTA
          </button>

          <p style={{ marginTop: "1rem", fontSize: "0.85rem", textAlign: "center" }}>
            Já tem uma conta?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              style={{ color: "#7B2FF7", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              Entrar
            </button>
          </p>
        </form>
      </div>

      <Modal
        isOpen={isTermsModalOpen}
        onRequestClose={() => setIsTermsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '90%',
            color: 'black',
          },
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Termos de Uso</h2>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <p style={{ marginBottom: '1rem' }}>Este termo de consentimento foi elaborado em conformidade com a Lei Geral de Proteção de Dados (LGPD). Consoante ao artigo 5º inciso XII da Lei 13.709/2018, ao cadastrar-se, o titular/ responsável viabiliza a manifestação livre, informada e inequívoca do tratamento de seus dados pessoais. Ao se cadastrar em nossa plataforma, informações específicas sobre os usuários, como endereços de protocolo de Internet (IP), navegação no site, software do usuário, juntamente com outras informações semelhantes, serão armazenadas nos servidores de ML Plataformas Digitais e Marketing LTDA. Essas informações serão estritamente usadas apenas para fins estatísticos e não serão publicadas para acesso geral. Os dados da empresa e das pessoas denunciantes (quando se identificarem) estão protegidos e são tratados com total confidencialidade.</p>
        </div>
        <button
          onClick={() => setIsTermsModalOpen(false)}
          style={{
            display: 'block',
            margin: '1rem auto',
            padding: '0.5rem 1rem',
            backgroundColor: '#7B2FF7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fechar
        </button>
      </Modal>

      <Modal
        isOpen={isPrivacyModalOpen}
        onRequestClose={() => setIsPrivacyModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '2rem',
            borderRadius: '8px',
            maxWidth: '800px',
            width: '90%',
            color: 'black',
          },
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Política de Privacidade</h2>
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <p style={{ marginBottom: '1rem' }}>Esta é nossa política de privacidade. Aqui você encontrará informações sobre como coletamos, usamos e protegemos seus dados pessoais.</p>
          <p style={{ marginBottom: '1rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p style={{ marginBottom: '1rem' }}>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <button
          onClick={() => setIsPrivacyModalOpen(false)}
          style={{
            display: 'block',
            margin: '1rem auto',
            padding: '0.5rem 1rem',
            backgroundColor: '#7B2FF7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Fechar
        </button>
      </Modal>
    </div>
  );
}
