import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";

@Injectable()
export class CustomerService {
  constructor(private dataSource: DataSource) {}
}