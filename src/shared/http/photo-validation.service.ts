import { Injectable } from "@nestjs/common";
import axios from 'axios';
import { BasicResponseDTO } from "../dtos/basic-response.dto";
import * as FormData from "form-data";

const dummySuccess = 'https://run.mocky.io/v3/d39fa295-0df1-408e-82a5-252e9f3bd279';

const dummyFail = 'https://run.mocky.io/v3/190dd297-4ad2-4f89-b35a-a1ce30203bb4';

@Injectable()
export class PhotoValidationService {
    
    private http = axios;

    public async submit(formData: FormData): Promise<BasicResponseDTO>{

        const url = dummySuccess;

        // const url = dummyFail;

        return (await this.http.post(url, formData)).data;
    }
}