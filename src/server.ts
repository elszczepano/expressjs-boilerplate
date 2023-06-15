import dotenv from 'dotenv';

import Service from './Service';
import Router from './Router';
import MySQLDriver from './drivers/MySQLDriver';
import ExampleRepository from './repositories/ExampleRepository';
import HelloController from './controllers/HelloController';
import HelloHandler from './handlers/HelloHandler';
import Migrator from './migrations/Migrator';

dotenv.config();

const port: number = Number( process.env.PORT ) || 3000;
const dbPort: number = Number( process.env.DB_PORT ) || 3306;
const dbHost: string = process.env.DB_HOST || 'localhost';
const dbUser: string = process.env.DB_USER || '';
const dbPassword: string = process.env.DB_PASSWORD || '';
const dbName: string = process.env.DB_NAME || '';

let driver: MySQLDriver | undefined;

( async () => {
    const service: Service = new Service( port );

    driver = new MySQLDriver( { dbHost, dbUser, dbPassword, dbName, dbPort } );

    await driver.connect();

    console.log( 'DB connection established' );

    const migrator: Migrator = new Migrator( driver );

    await migrator.migrate();

    const repository: ExampleRepository = new ExampleRepository( driver );

    const helloController: HelloController = new HelloController( repository );
    const helloHandler: HelloHandler = new HelloHandler( helloController );

    const router: Router = new Router(
        [
            {
                method: 'get',
                path: '/hello/:name',
                handler: helloHandler
            }
        ]
    );

    service.addRouter( '/', router );
} )();


[ 'SIGINT', 'SIGTERM', 'SIGQUIT' ].forEach( signal => process.on( signal, async () => {
    if ( driver ) {
        await driver.disconnect();
    }

    process.exit();
} ) );
