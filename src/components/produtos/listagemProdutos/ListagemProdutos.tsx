import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import './ListagemProdutos.css';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Services';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/tokens/TokensReducer';
import { toast } from 'react-toastify';
import Produtos from '../../../models/Produtos';


function ListagemProdutos() {
  const [produtos, setProdutos] = useState<Produtos[]>([])
  let navigate = useNavigate();
  const token = useSelector<UserState, UserState["tokens"]>(
    (state) => state.tokens
  );

  // useEffect(() => {
  //   if (token == "") {
  //     toast.error('Você precisa estar logado', {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       theme: 'colored',
  //       progress: undefined,
  //     })
  //     navigate("/entrar")

  //   }
  // }, [token])

  async function getPost() {
    await busca("/produtos", setProdutos, {
      headers: {
        'Authorization': token
      }
    })
  }

  useEffect(() => {

    getPost()

  }, [produtos.length])
  

  return (
    <>
      {
        produtos.map(produto => (
          <Box m={2} >
            <Card variant="outlined">
              <CardContent>
                <Typography color="textSecondary" gutterBottom style={{fontWeight: 'bold'}}>
                  Id: {produto.id}
                </Typography>
                <Typography variant="h5" component="h2">
                  {produto.nome}
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight: 'bold'}}>
                  R$ {produto.preco}
                </Typography>
                <Typography variant="body2" component="p" style={{fontWeight: 'bold'}}>
                 Quantidade: {produto.quantidade}
                </Typography>
                <Typography variant="body2" component="p">
                  {produto.descricao}
                </Typography>
                <Typography variant="body2" component="p">
                  {produto.categoria?.tipo}
                </Typography>
              </CardContent>
              <CardActions>
                <Box display="flex" justifyContent="center" mb={1.5}>

                  {/* <Link to={`/formularioProduto/${produto.id}`} className="text-decorator-none" >
                    <Box mx={1}>
                      <Button variant="contained" className="marginLeft, btnAtualizar" size='small'>
                        atualizar
                      </Button>
                    </Box> */}
                  <Link to='/formularioProduto'>
                    <Box mx={1} >
                      <Button variant="contained" className='btnAjudar' size='small'>
                        Ajudar
                      </Button>
                    </Box>
                  </Link>
                  {/* </Link> */}
                  {/* <Link to={`/deletarProdutos/${produto.id}`} className="text-decorator-none">
                    <Box mx={1}>
                      <Button variant="contained" size='small' className='btnDeletar'>
                        deletar
                      </Button>
                    </Box>
                  </Link> */}
                </Box>
              </CardActions>
            </Card>
          </Box>
        ))
      }
    </>
  )
}

export default ListagemProdutos;