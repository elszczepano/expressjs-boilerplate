import { IDriver } from '../drivers/Driver';

export interface IExampleRepository {
    saveGuest( name: string ): Promise<void>;
    getGuests(): Promise<string[]>;
}

export default class ExampleRepository implements IExampleRepository {
    public constructor( private readonly _driver: IDriver ) {}

    public async saveGuest( name: string ): Promise<void> {
        await this._driver.query( `INSERT INTO guests (name) VALUES ('${ name }');` );
    }

    public async getGuests(): Promise<string[]> {
        const guests: { name: string; }[] = await this._driver.query( 'SELECT DISTINCT name FROM guests;' );

        return guests.map( guest => guest.name );
    }
}