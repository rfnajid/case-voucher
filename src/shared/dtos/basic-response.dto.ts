export class BasicResponseDTO {
    success: boolean = false;
    message?: string;


    constructor(success: boolean, message?: string){
        this.success = success;
        this.message = message;
    }
}