export interface IController<TParams, TResult> {
    execute( params: TParams ): Promise<TResult>;
}