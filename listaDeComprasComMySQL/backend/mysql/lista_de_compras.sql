-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS lista_compras;
USE lista_compras;

-- Criação da tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE
);

-- Inserção das categorias pré-definidas
INSERT INTO categorias (nome) VALUES
('Carnes'),
('Higiene Pessoal'),
('Limpeza'),
('Hortifruti'),
('Laticínios'),
('Bebidas'),
('Bebidas Alcoólicas'),
('Temperos'),
('Congelados'),
('Pães, massas e biscoitos'),
('Mercearia'),
('Enlatados'),
('Outros Produtos');

-- Criação da tabela de itens
CREATE TABLE IF NOT EXISTS itens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  quantidade INT DEFAULT 1,
  comprado BOOLEAN DEFAULT false,
  categoria_id INT,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);
