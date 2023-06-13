export interface IDriver {
    query<T>( queryString: string ): Promise<T>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}