
import mysql, { Connection, Query } from 'mysql';

import { IDriver } from './Driver';
import { error } from 'console';
import { resolve } from 'path';
import { rejects } from 'assert';

interface IDriverConfig {
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    dbPort: number
}

export default class MySQLDriver implements IDriver {
    private readonly _connection: Connection;

    private constructor( config: IDriverConfig ) {
        console.log( config )

        this._connection = mysql.createConnection( {
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbName,
            port: config.dbPort
        } );
    }

    public static async create( config: IDriverConfig ): Promise<MySQLDriver> {
        const driver = new MySQLDriver( config );

        return driver;
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
        });
    }
}