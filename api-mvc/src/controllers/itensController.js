const express = require('express');
const router = express.Router();

const { getConnection, sql } = require("../../db");
const { get } = require('../app');

exports.getItens = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM itens");

    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.getItensId = async (req, res) => {
  try {
    const pool = await getConnection();
    const{id} = req.params;
    
    const result = await pool.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM itens WHERE id = @id");
    
    res.json(result.recordset);
  } catch (error) {
    res.status(404).json({ erro: error.message });
  }
};

exports.postItens = async (req, res) => {
    try{
        const pool = await getConnection();
        //dita quais COLUNAS iremos usar para colocar as informações no BANCO DE DADOS
        const{nome, descricao, local_encontrado, data_encontro} = req.body
        //faz a conexão com o banco na API
        const result = await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("descricao", sql.VarChar, descricao)
            .input("local_encontrado", sql.VarChar, local_encontrado)
            .input("data_encontro", sql.Date, data_encontro)

            //insere os dados acima na tabela do banco de dados
            .query(`
                INSERT INTO itens (nome, descricao, local_encontrado, data_encontro)
                VALUES (@nome, @descricao, @local_encontrado, @data_encontro)
            `);

            res.status(201).json({ Sucesso: "Sim" });
        } catch (error) {
            res.status(404).json({ erro: error.message });
    }
};

exports.putItens = async (req, res) => {
    try{
        const pool = await getConnection();

        // EM UM PUT POR ID, TEM QUE DECLARAR A COLUNA ID *OBVIAMENTE*
        const{id, nome, descricao, local_encontrado, data_encontro, } = req.body

        const result = await pool.request()
            .input("nome", sql.VarChar, nome)
            .input("descricao", sql.VarChar, descricao)
            .input("local_encontrado", sql.VarChar, local_encontrado)
            .input("data_encontro", sql.Date, data_encontro)
            .input("id", sql.Int, id)

            .query(`
                UPDATE itens  
                    SET nome = @nome, descricao = @descricao, local_encontrado = @local_encontrado, data_encontro = @data_encontro
                        WHERE id = @id
            `);
            if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ erro: "Item não encontrado" });
        }

            res.status(201).json({ Sucesso: "Sim" });

            res.json(result.recordset);
        } catch (error) {
            res.status(400).json({ erro: error.message });
    }
};

exports.putItensStatus = async (req, res) => {
    try{
        const pool = await getConnection();

        // EM UM PUT POR ID, TEM QUE DECLARAR A COLUNA ID *OBVIAMENTE*
        const{id} = req.params

        const result = await pool.request()
            .input("id", sql.Int, id)

            .query(`
                UPDATE itens
                    SET status = 'Devolvido'
                        WHERE id = @id
            `);
            res.status(200).json({ Sucesso: "Sim" });
        } catch (error) {
            res.status(404).json({ erro: error.message });
    }
};

exports.deleteItens = async (req, res) =>{
    try{
        const pool = await getConnection();

        const {id} = req.params

        const result = await pool.request()
            .input("id", sql.Int, id)

            .query(`
                    DELETE FROM itens WHERE id = @id
                `);
                
        res.status(200).json({ Sucesso: "Sim" });
    }
    
    catch (error) {
        res.status(404).json({erro: error.message});
    }
};