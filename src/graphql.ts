
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Author {
    id: number;
    name?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<Address>;
    phone?: Nullable<string>;
    website?: Nullable<string>;
    company?: Nullable<Company>;
    posts?: Nullable<Nullable<Post>[]>;
}

export class Address {
    street?: Nullable<string>;
    suite?: Nullable<string>;
    city?: Nullable<string>;
    zipcode?: Nullable<string>;
    geo?: Nullable<Geo>;
}

export class Geo {
    lat?: Nullable<string>;
    lng?: Nullable<string>;
}

export class Company {
    name?: Nullable<string>;
    catchPhrase?: Nullable<string>;
    bs?: Nullable<string>;
}

export class Post {
    id: number;
    title: string;
    body?: Nullable<string>;
}

export abstract class IQuery {
    abstract authors(): Nullable<Nullable<Author>[]> | Promise<Nullable<Nullable<Author>[]>>;

    abstract author(id: number): Nullable<Author> | Promise<Nullable<Author>>;
}

type Nullable<T> = T | null;
