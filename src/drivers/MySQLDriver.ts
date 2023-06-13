
import mysql, { Connection, Query } from 'mysql';

interface IMySQLDriver {
    query<T>( queryString: string ): Promise<T>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

interface IDriverConfig {
    dbHost: string;
    dbUser: string;
    dbPassword: string;
    dbName: string;
    dbPort: number
}

export default class MySQLDriver implements IMySQLDriver {
    private readonly _connection: Connection;

    private constructor( config: IDriverConfig ) {
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
        
        await driver.connect();

        return driver;
    }

    public async connect(): Promise<void> {
        await this._connection.connect();
    }

    public async disconnect(): Promise<void> {
        await this._connection.end();
    }

    public async query<T>( queryString: string ): Promise<T> {
        const result: Query = await this._connection.query( queryString );

        return result as T;
    }
}