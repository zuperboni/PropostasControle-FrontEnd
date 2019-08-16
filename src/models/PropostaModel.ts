import { Solicitante } from "./SolicitanteModel";
import { Orcamento } from "./OrcamentoModel";
import { Atividade } from "./AtividadeModel";
import { Time } from "./TimeModel";
import { Arquivo } from "./ArquivoModel";

export class Proposta {
id:String
codDemanda:String
desDemanda:String
desResumoEscopo:String
solicitante:Solicitante
nomResponsavelAcc:String
numPriorizacaoSolicitante:Int32Array
datSolicitacao:Date
orcamento:Orcamento
atividades:Atividade[]
arquivos:Arquivo[]
desStatusProposta:String
isDemandaAgil:Boolean
desTipoDemanda:String
numHorasEstimadas:Int32Array
datInicio:Date
datTermino:Date
desObservacao:String

numSprints:Int32Array
tempoPorSprint:String
numHorasProdSprint:Int32Array
time:Time[]

numPF:Int32Array
numIP:Int32Array
flagConciliacao:Boolean
desJustificativa:String
flagConcilicacaoAceita:Boolean

constructor(){}
}