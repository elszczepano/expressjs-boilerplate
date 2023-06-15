import { IController } from '@src/controllers/Controller';
import HelloController, { IHelloParams, IHelloResults } from '@src/controllers/HelloController';
import { IExampleRepository } from '@src/repositories/ExampleRepository';

import anyTest, { TestFn } from 'ava';
import sinon from 'sinon';

const test = anyTest as TestFn<{
    controller: IController<IHelloParams, IHelloResults>;
    repositoryStub: sinon.SinonStubbedInstance<IExampleRepository>;
}>;

test.beforeEach( t => {
    t.context.repositoryStub = {
        getGuests: sinon.stub(),
        saveGuest: sinon.stub()
    };

    t.context.controller = new HelloController( t.context.repositoryStub );

    t.context.repositoryStub.getGuests.resolves( [ 'foo', 'bar' ] );
} );

test( 'execute(): should save guest', async t => {
    const { repositoryStub, controller } = t.context;

    const name: string = 'name';

    await controller.execute( { name } );

    sinon.assert.calledOnceWithExactly( repositoryStub.saveGuest, name );

    t.pass();
} );

test( 'execute(): should return guest list and name', async t => {
    const { controller } = t.context;

    const name: string = 'name';

    const results: IHelloResults = await controller.execute( { name } );

    t.deepEqual( results, { name, guests: [ 'foo', 'bar' ] } );
} );