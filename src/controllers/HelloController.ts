import { Request, Response } from 'express';

import { IController } from './Controller';
import { IExampleRepository } from '../repositories/ExampleRepository';

interface IRequestParams {
    name: string;
}

export default class HelloController implements IController {
    public constructor( private readonly _repository: IExampleRepository ) {}

    public async execute( request: Request<IRequestParams>, response: Response ): Promise<void> {

        const queryResult: number = await this._repository.exampleQuery();

        response.json( { queryResult, name: request.params.name } );
    }
}