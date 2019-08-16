import { Usuario } from "./UsuarioModel";

export class Arquivo {
    id: String;
    nome: String;
	URLDownload: String;
	tipoArquivo: String;
	tamanho: String;
	usuario : Usuario;
	dataUpload : String;
}