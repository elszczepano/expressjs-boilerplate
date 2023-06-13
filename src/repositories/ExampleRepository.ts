import { IDriver } from '../drivers/Driver';

export interface IExampleRepository {
    exampleQuery(): Promise<number>;
}

export default class ExampleRepository implements IExampleRepository {
    public constructor( private readonly _driver: IDriver ) {}

    public async exampleQuery(): Promise<number> {
        const queryResult: { solution: number; }[] = await this._driver.query( 'SELECT 2 + 3 AS solution'  );

        return queryResult[ 0 ]?.solution ?? 1;
    }
}