import { Router as ExpressRouter } from 'express';
import bodyParser from 'body-parser';

import { IHandler } from './handlers/Handler';

interface IRouteDefinition {
    method: 'get' | 'post' | 'put' | 'delete';
    path: string;
    handler: IHandler;
}

export default class Router {
    private readonly _router: ExpressRouter;

    public constructor( routes: IRouteDefinition[] = [] ) {
        this._router = ExpressRouter();

        for ( const { method, path, handler } of routes ) {
            if ( [ 'put', 'post' ].includes( method ) ) {
                this._router[ method ](
                    path,
                    bodyParser.urlencoded( { extended: false } ),
                    handler.process.bind( handler )
                );

                continue;
            }

            this._router[ method ]( path, handler.process.bind( handler ) );
        }
    }

    get(): ExpressRouter {
        return this._router;
    }
}