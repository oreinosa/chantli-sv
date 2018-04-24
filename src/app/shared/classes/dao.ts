import { Observable } from "rxjs/Observable";

export interface DAO<T> {
    getAll(...filters: any[]): Observable<T[]>;
    get(id: string): Observable<T>;
    add(object: T, ...subcollection: any[]): Promise<void>;
    update(id: string, object: T, ...subcollection: any[]): Promise<void>;
    delete(id: string): Promise<void>;
}
