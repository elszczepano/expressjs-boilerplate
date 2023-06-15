import httpMocks from 'node-mocks-http';
import { Request, Response } from 'express';

import { IController } from '@src/controllers/Controller';
import { IHelloParams, IHelloResults } from '@src/controllers/HelloController';
import HelloHandler from '@src/handlers/HelloHandler';

import anyTest, { TestFn } from 'ava';
import sinon from 'sinon';

const test = anyTest as TestFn<{
    controllerStub: sinon.SinonStubbedInstance<IController<IHelloParams, IHelloResults>>;
    requestMock: Request;
    responseMock: Response;
    handler: HelloHandler;
    responseStub: sinon.SinonStub;
}>;

test.beforeEach( t => {
    t.context.controllerStub = {
        execute: sinon.stub()
    };
    t.context.requestMock = httpMocks.createRequest();
    t.context.responseMock = httpMocks.createResponse();

    t.context.handler = new HelloHandler( t.context.controllerStub );

    t.context.requestMock.params = { name: 'test_name' };
    t.context.controllerStub.execute.withArgs( t.context.requestMock.params ).resolves(
        { name: t.context.requestMock.params.name, guests: [] }
    );

    t.context.responseStub = sinon.stub();
    t.context.responseMock.json = t.context.responseStub;
} );

test( 'process(): should return JSON response', async t => {
    const { responseMock, requestMock, handler, responseStub } = t.context;
    
    await handler.process( requestMock, responseMock );

    sinon.assert.calledOnceWithExactly( responseStub, { name: requestMock.params.name, guests: [] } );

    t.pass();
} );