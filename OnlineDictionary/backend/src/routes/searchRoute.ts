import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();

async function buscarPalavra(palavra: string): Promise<any> {
  const url = `https://pt.wiktionary.org/w/api.php?action=query&format=json&prop=revisions&titles=${palavra}&rvprop=content`;
  try {
    const resposta = await axios.get(url);
    return resposta.data;
  } catch (erro: any) {
    console.error(`Erro ao buscar a palavra "${palavra}":`, erro.message);
    throw new Error('Erro ao consultar a API do Wiktionary');
  }
}

router.get('/:palavra', async (req: Request, res: Response) => {
  const { palavra } = req.params;

  try {
    const dadosBrutos = await buscarPalavra(palavra);
    const dadosFormatados = processarDadosWiktionary(dadosBrutos, palavra);
    res.json(dadosFormatados);
  } catch (erro: any) {
    res.status(500).json({ error: erro.message });
  }
});

function processarDadosWiktionary(dadosBrutos: any, palavra: string) {
  const paginas = dadosBrutos?.query?.pages;
  const idPagina = Object.keys(paginas || {})[0];
  const conteudo = paginas?.[idPagina]?.revisions?.[0]?.['*'];

  if (!conteudo) {
    return { palavra, mensagem: 'Nenhum resultado encontrado.' };
  }

  const limparTexto = (texto: string) => texto.replace(/\[\[(.*?)\]\]/g, '$1');

  const definicoes = conteudo.match(/# (.*?)\n/g)?.map((definicao: string) => limparTexto(definicao.replace(/# /, '').trim())) || [];

  const sinonimos = conteudo.match(/===Sinônimos===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
    .filter((sinonimo: string) => sinonimo.startsWith('*'))
    .map((sinonimo: string) => limparTexto(sinonimo.replace('*', '').trim())) || [];

  const exemplos = conteudo.match(/===Exemplos===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
    .filter((exemplo: string) => exemplo.startsWith('*'))
    .map((exemplo: string) => limparTexto(exemplo.replace('*', '').trim())) || [];

  const expressoes = conteudo.match(/===Expressões===\n([\s\S]*?)\n===/s)?.[1]?.split('\n')
    .filter((expressao: string) => expressao.startsWith('*'))
    .map((expressao: string) => limparTexto(expressao.replace('*', '').trim())) || [];

  return {
    palavra,
    definicoes,
    sinonimos,
    exemplos,
    expressoes,
  };
}

export default router;
