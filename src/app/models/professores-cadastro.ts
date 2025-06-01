export class ProfessoresCadastro {

    constructor(
        public id?: number,
        public nome: string = "",
        public cnpj: string = "",
        public nomeFantasia: string = "",
        public chavePix: string = "",
        public formacao: string = "",
        public dataNascimento?: Date,
        public signo: string = "",

    ) { }

}
