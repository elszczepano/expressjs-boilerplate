import { promises as fs } from 'fs';

import { IDriver } from '../drivers/Driver';

export default class Migrator {
    public constructor( private readonly _driver: IDriver ) {}

    public async migrate(): Promise<void> {
        const migrations: string[] = ( await fs.readdir( `${ __dirname }/queries/`, { withFileTypes: true } ) ).map( file => file.name );

        for ( const migration of migrations ) {
            const query: string = ( await fs.readFile( `${ __dirname }/queries/${ migration }` ) ).toString();

            await this._driver.query( query );
        }

        console.log( 'Migrations done' );
    }
}