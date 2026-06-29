import { describe, expect, test, vi, afterEach } from 'vitest'

import { main, SEPARADOR_PUBLICACOES } from './scrape_doe-rs.js'

const test_cases = [
  {
    name: 'vazia',
    data_a_ser_consultada: '2026-07-03',
    expected_output: `\
${SEPARADOR_PUBLICACOES}
ERRO: Resposta da API vazia. Nenhuma publicação da PROCERGS encontrada hoje.
${SEPARADOR_PUBLICACOES}`,
  },
  {
    name: 'sem_publicacoes_relevantes',
    data_a_ser_consultada: '2026-07-10',
    expected_output: `\
${SEPARADOR_PUBLICACOES}
DATA: 10/07/2026
TIPO: Contratos
CONTEÚDO: Assunto: Contrato Processo: 26/0489-0000196-4 Súmula de Aditivo <strong>PROCERGS</strong> e AALLFAX - Aditivo 5859-06 ao contrato de prestação de serviços de Manutenção e Suporte Técnico para Servidores blade e enclosures,fabricante HP, para contratação do serviço de...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1452633
${SEPARADOR_PUBLICACOES}
DATA: 10/07/2026
TIPO: Contratos
CONTEÚDO: Assunto: Contrato Processo: 26/0489-0000034-8 Súmula de Contrato <strong>PROCERGS</strong> e ALGAR - Contrato 6120-00 para contratação de prestação de serviços de Telefonia Fixa Comutada – STFC, para atendimento das necessidades de Telecomunicações do <strong>PROCERGS</strong>, por meio...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1452528
${SEPARADOR_PUBLICACOES}
DATA: 10/07/2026
TIPO: Contratos
CONTEÚDO: Assunto: Contrato Processo: 26/0489-0000324-0 Súmula de Aditivo <strong>PROCERGS</strong> e PARANÁ - Aditivo 6031-01 ao contrato de aontratação de pessoa jurídica para fornecimento de 06 (seis) Grupos Geradores de Energia Elétrica de 1250kVA/1000kW para restabelecer...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1452376
${SEPARADOR_PUBLICACOES}
DATA: 10/07/2026
TIPO: Licitações
CONTEÚDO: Assunto: Pregão Eletrônico Processo: 26/0489-0000118-2 Licitações HOMOLOGAÇÃO - PREGÃO ELETRÔNICO 28/2026 O Diretor-Presidente da <strong>PROCERGS</strong> homologa o julgamento do Pregão Eletrônico 28/2026 à empresa RCX NETWORK - SERVIÇOS DE INFORMÁTICA LTDA.
LINK: https://www.diariooficial.rs.gov.br/materia?id=1452725
${SEPARADOR_PUBLICACOES}`,
  },
  {
    name: 'com_publicacoes_relevantes',
    data_a_ser_consultada: '2026-06-17',
    expected_output: `\
${SEPARADOR_PUBLICACOES}
DATA: 17/06/2026
TIPO: Editais
CONTEÚDO: ...RIO GRANDE DO SUL CENTRO DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO DO ESTADO DO RIO GRANDE DO SUL S.A. - <strong>PROCERGS</strong> EDITAL DE CONCURSOS PÚBLICOS Nº 25/2026 A <strong>PROCERGS</strong> convoca o candidato abaixo relacionado, para manifestar-se quanto à aceitação da vaga...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1440516
${SEPARADOR_PUBLICACOES}
DATA: 17/06/2026
TIPO: Editais
CONTEÚDO: ...RIO GRANDE DO SUL CENTRO DE TECNOLOGIA DA INFORMAÇÃO E COMUNICAÇÃO DO ESTADO DO RIO GRANDE DO SUL S.A. - <strong>PROCERGS</strong> EDITAL DE CONCURSOS PÚBLICOS Nº 24/2026 A <strong>PROCERGS</strong> convoca o candidato abaixo relacionado, para manifestar-se quanto à aceitação da vaga...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1440514
${SEPARADOR_PUBLICACOES}
DATA: 17/06/2026
TIPO: Portarias
CONTEÚDO: ...Segurança Contra Incêndio (SISBOM-MSCI), instalado na Companhia de Processamento de Dados do Estado do Rio Grande do Sul (<strong>PROCERGS</strong>), assim como ampliação do sistema para novas localidades, onde forem instaladas unidades do Corpo de Bombeiros Militar, que serão...
LINK: https://www.diariooficial.rs.gov.br/materia?id=1440494
${SEPARADOR_PUBLICACOES}`,
  },
]

afterEach(() => {
  vi.restoreAllMocks()
})

test.each(test_cases)('$name', async ({ data_a_ser_consultada, expected_output }) => {
  const console_log = vi.spyOn(console, 'log').mockImplementation(() => {})
  const console_error = vi.spyOn(console, 'error').mockImplementation(() => {})

  const actual_output = await main(data_a_ser_consultada)

  expect(console_error).not.toHaveBeenCalled()
  expect(console_log).toHaveBeenNthCalledWith(1, `Data consultada: ${data_a_ser_consultada}\n`)
  expect(console_log).toHaveBeenNthCalledWith(
    2,
    expect.stringMatching(/^Data da execução: .+\n\n$/),
  )

  expect(actual_output).toBe(expected_output)
})
