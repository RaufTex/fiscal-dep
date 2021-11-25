export interface IDeputado {
  id?: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
  urlFoto: string;
  email?: string;
}

export interface IDeputadoAll {
  ultimoStatus: IDeputado;
  dataNascimento: string;
  sexo: string;
  urlWebsite?: string;
  events: IEvento;
}

export interface IEvento {
  dataHoraInicio: string;
  dataHoraFim: string;
  descricaoTipo: string;
}

export interface IDespesa {
  tipoDespesa: string;
  nomeFornecedor: string;
  valorDocumento: string;
  dataDocumento: string;
  urlDocumento: string;
}

export interface IProjetos {
  id: number;
  uri: string;
  ementa: string;
  ano: number;
  numero: number;
}

export interface IProjeto {
  id: number;
  uri: string;
  numero: number;
  ementa: string;
  ementaDetalhada: string;
  dataApresentacao: string;
  statusProposicao: { descricaoSituacao: string; url: string };
}
