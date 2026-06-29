// #region:[ENTRYPOINT]

let data_fixa_a_ser_consultada

if (typeof process !== 'undefined') {
  data_fixa_a_ser_consultada = process.argv
    .find((arg) => arg.startsWith('--data_fixa_a_ser_consultada='))
    ?.split('=')[1]
}

// data_fixa_a_ser_consultada = '2026-07-03'

main(data_fixa_a_ser_consultada).then((resultado) => {
  console.log(resultado)
})

// #endregion:[ENTRYPOINT]

// #region:[IMPLEMENTACAO]
const SEPARADOR_PUBLICACOES = '----------'

function formatarSaida(
  data_a_ser_consultada,
  data_execucao,
  publicacao_encontrada__formatada__list,
) {
  return (
    `${SEPARADOR_PUBLICACOES}\n` +
    publicacao_encontrada__formatada__list
      .map((item) =>
        [
          `DATA: ${item.DATA}`,
          `TIPO: ${item.TIPO}`,
          `CONTEÚDO: ${item.CONTEUDO}`,
          `LINK: ${item.LINK}`,
          SEPARADOR_PUBLICACOES,
        ].join('\n'),
      )
      .join('\n')
  )
}

async function main(arg__data_a_ser_consultada) {
  try {
    const data_atual = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date())

    const data_a_ser_consultada = arg__data_a_ser_consultada ?? data_atual

    console.log(`Data consultada: ${data_a_ser_consultada}\n`)

    const data_execucao =
      new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Sao_Paulo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
        .format(new Date())
        .replace(' ', 'T') + '-03:00'

    console.log(`Data da execução: ${data_execucao}\n\n`)

    // [231431f9-7ff8-4f19-a8e1-eb22017cd024] Embora o domínio seja da PROCERGS (que opera a infraestrutura), o endpoint é do DOE-RS.
    const DOE_API__PUBLICACAO__ENDPOINT = 'https://secweb.procergs.com.br/doe/rest/public/materias/'

    const PUBLICACAO_DA_PROCERGS__BASE_URL = 'https://www.diariooficial.rs.gov.br/materia'

    const url = new URL(DOE_API__PUBLICACAO__ENDPOINT)

    const params = {
      page: '1',
      tipoDiario: 'doe',
      queryString: 'procergs',
      dataIni: data_a_ser_consultada,
      dataFim: data_a_ser_consultada,
    }

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value)
    }

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`)
    }

    const resposta_da_api = await response.json()
    const publicacao_da_procergs__list = resposta_da_api.collection ?? []

    if (publicacao_da_procergs__list.length === 0) {
      throw new Error(`Resposta da API vazia. Nenhuma publicação da PROCERGS encontrada hoje.`)
    }

    const publicacao_encontrada__formatada__list = []

    for (const publicacao_da_procergs__wrapper of publicacao_da_procergs__list) {
      const publicacao_da_procergs = publicacao_da_procergs__wrapper.procergs

      const item = {
        DATA: publicacao_da_procergs.data,
        TIPO: publicacao_da_procergs.tipo,
        CONTEUDO: publicacao_da_procergs.conteudo,
        LINK: `${PUBLICACAO_DA_PROCERGS__BASE_URL}?id=${publicacao_da_procergs.id}`,
      }

      publicacao_encontrada__formatada__list.push(item)
    }

    return formatarSaida(
      data_a_ser_consultada,
      data_execucao,
      publicacao_encontrada__formatada__list,
    )
  } catch (error) {
    return [
      SEPARADOR_PUBLICACOES,
      `ERRO: ${error instanceof Error ? error.message : String(error)}`,
      SEPARADOR_PUBLICACOES,
    ].join('\n')
  }
}
// #endregion:[IMPLEMENTACAO]

// region:[EXPORTACAO]
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SEPARADOR_PUBLICACOES,
    main,
  }
}
// #endregion:[EXPORTACAO]
