export class User {
    id: number;
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    profil_id: Number;

    constructor() {
        
        this.id = 0;
        this.lastName = '';
        this.firstName = '';
        this.email = '';
        this.password = '';
        this.profil_id = 0;
    }
        
    

  }
  
  export default interface Login {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    role: string;
  }
  
  export class Loginer {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public role: string) {}
  }
  
  export class Tokener {
    constructor(
    public token: string
    ) {}
  }
  