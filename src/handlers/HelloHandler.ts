import { Request, Response } from 'express';

import { IHandler } from './Handler';
import { IController } from '../controllers/Controller';
import { IHelloParams, IHelloResults } from '../controllers/HelloController';

export default class HelloHandler implements IHandler {
    public constructor( private readonly _controller: IController<IHelloParams, IHelloResults> ) {}

    public async process( request: Request<any>, response: Response ): Promise<void> {
        const name: string  = request.params.name;

        const result: IHelloResults = await this._controller.execute( { name } );

        response.json( result );
    }
}