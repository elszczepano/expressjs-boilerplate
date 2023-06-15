
import mysql, { Connection } from 'mysql';

import { IDriver } from './Driver';

interface IDriverConfig {
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    dbPort: number;
}

export default class MySQLDriver implements IDriver {
    private readonly _connection: Connection;

    public constructor( config: IDriverConfig ) {
        this._connection = mysql.createConnection( {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
            port: config.dbPort
        } );
    }

    public async connect(): Promise<void> {
        await this._connection.connect();
    }

    public async disconnect(): Promise<void> {
        await this._connection.end();
    }

    public async query<T>( queryString: string ): Promise<T> {
        return new Promise( ( resolve, reject ) => {
            this._connection.query( queryString, ( error, results ) => {
                if ( error ) {
                    reject( error );
                };

                resolve( results );
            } )
        } );
    }
}