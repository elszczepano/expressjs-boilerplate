export interface IController<TParams, TResponse> {
    execute( params: TParams ): Promise<TResponse>;
}