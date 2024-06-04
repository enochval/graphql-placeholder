
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class User {
    id: number;
    name?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
    address?: Nullable<Address>;
    phone?: Nullable<string>;
    website?: Nullable<string>;
    company?: Nullable<Company>;
    posts?: Nullable<Nullable<Post>[]>;
    albums?: Nullable<Nullable<Album>[]>;
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
    comments?: Nullable<Nullable<Comment>[]>;
}

export class Comment {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    body?: Nullable<string>;
}

export class Album {
    id: number;
    title?: Nullable<string>;
    photos?: Nullable<Nullable<Photo>[]>;
}

export class Photo {
    id: number;
    title?: Nullable<string>;
    url?: Nullable<string>;
    thumbnailUrl?: Nullable<string>;
}

export abstract class IQuery {
    abstract users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
