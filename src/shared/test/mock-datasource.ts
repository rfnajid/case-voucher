import { DataSource } from "typeorm";

export const dataSourceMockFactory: () => MockType<DataSource> = jest.fn(() => ({
    query: jest.fn(),
    getRepository: jest.fn()
  }));
  
export type MockType<T> = {
[P in keyof T]?: jest.Mock<{}>;
};
  