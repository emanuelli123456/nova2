import express from 'express'
import pool from "./papiro.js"
/* import express from 'express'
import pool from "./db.js"

const app = express()
app.use(express.json())

app.post('/filmes', async (req, res) => {
    const { titulo, autor, genero } = req.body

    try {
        const resultado = await pool.query('INSERT INTO filmes (titulo, autor, genero) VALUES ($1,$2,$3) RETURNING*', [titulo, autor, genero])
        return res.status(201).json(resultado.rows[0])

    } catch (error) {
        console.error("Erro ao criar o filme:", error)
        return res.status(500).json({ erro: "Erro ao cadastrar filme" });
    }

}) */

//atv1
const app = express()
app.use(express.json())

app.post('/clientes', async (req, res) => {
    const { nome, email } = req.body

    try {
        const resultado = await pool.query('INSERT INTO clientes (nome, email) VALUES ($1,$2) RETURNING*', [nome, email])
        return res.status(201).json(resultado.rows[0])

    } catch (error) {
        console.error("Erro ao cadastrar novo cliente", error)
        return res.status(500).json({ erro: "Erro ao cadastrar novo cliente" });
    }

})

//atv2
app.get('/clientes', async (req, res) => {
    try {
        const lista = await pool.query('select * from pedidos where id = $1', [id])
        return res.status(201).json(lista)
    } catch (e) {
        console.error("Erro ao listar todos os registros", error)
        return res.status(500).json({ erro: "Erro ao listar todos os registros" })
    }
});


//atv3
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        const atualiza = await pool.query('update cliente set email = $1, nome = $2 where id = $3', [email, nome, id]
        );
        return res.status(200).json(atualiza.rows);
    } catch (e) {
        return res.status(500).json({ erro: "Erro ao atualizar " })
    }

});

//atv4
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const remove = await pool.query('delete from clientes where id = $1', [id]
        );
        return res.status(200).json(remove.rows);

    } catch (e) {
        return res.status(500).json({ erro: "Erro ao deletar" });
    }
});

//ATV5
app.post('/pedido', async (req, res) => {
    const { produto, valor, status, cliente_id } = req.body;

    try {
        const cadastrar = await pool.query('select * from clientes where id = $1', [cliente_id]
        );
        if (cadastrar) {
            const homemBolha = await pool.query('insert into pedidos (produto,valor, status, cliente_id) values ($1,$2,$3,$4) returning *', [produto, valor, status, cliente_id]
            );
            return res.status(200).json(homemBolha.rows[0]);
        }
    } catch (erro) {
        return res.status(500).json({ erro: "Erro ao cadastrar o pedido" });
    }

});

app.get('/pedidos', async (req, res) => {
    try {
        const { status } = req.query
        console.log(status);

        if (status) {
            const lista = await pool.query('select * from pedidos where status = $1', [status])
            if (lista.rows.length == 0) { return res.status(400).json({ erro: "não encontrou but" }) }

            return res.status(200).json(lista.rows);
        }

        const listagemPedidos = await pool.query(
            'select * from pedidos'
        );
        return res.status(201).json(listagemPedidos.rows);
    }
    catch (e) {
        return res.status(500).json({ erro: "erro" })
    }
});
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
/*
POST /pedidos - Cadastra novo pedido vinculado a um cliente.

Atenção: Antes de criar, sua API deve realizar um SELECT para conferir se o cliente_id enviado realmente existe.

GET /pedidos - Lista pedidos com o nome do cliente (usando JOIN). */