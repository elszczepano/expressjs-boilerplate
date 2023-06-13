import { Request, Response } from 'express';

import { IController } from './Controller';

interface IRequestParams {
    name: string;
}

export default class RootController implements IController {
    public constructor( private readonly _repository: IExampleRepository ) { }

    public async execute( request: Request<IRequestParams>, response: Response ): Promise<void> {

        const queryResult: IExampleResult = await this._repository.exampleQuery();

        response.json( { queryResult, name: request.params.name } );
    }
}