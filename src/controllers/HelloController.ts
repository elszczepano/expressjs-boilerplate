import { IController } from './Controller';
import { IExampleRepository } from '../repositories/ExampleRepository';

export interface IHelloParams {
    name: string;
}

export interface IHelloResults {
    name: string;
    guests: string[];
}

export default class HelloController implements IController<IHelloParams, IHelloResults> {
    public constructor( private readonly _repository: IExampleRepository ) {}

    public async execute( params: IHelloParams ): Promise<IHelloResults> {
        await this._repository.saveGuest( params.name );

        const guests: string[] = await this._repository.getGuests();

        return { guests, name: params.name };
    }
}