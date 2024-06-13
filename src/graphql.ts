
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreatePostInput {
    title: string;
    body: string;
    userId: number;
}

export class UpdatePostInput {
    title?: Nullable<string>;
    body?: Nullable<string>;
    userId?: Nullable<number>;
}

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
    todos?: Nullable<Nullable<Todo>[]>;
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
    title?: Nullable<string>;
    body?: Nullable<string>;
    comments?: Nullable<Nullable<Comment>[]>;
    user?: Nullable<User>;
}

export class Comment {
    id: number;
    name?: Nullable<string>;
    email?: Nullable<string>;
    body?: Nullable<string>;
    post?: Nullable<Post>;
}

export class Album {
    id: number;
    title?: Nullable<string>;
    photos?: Nullable<Nullable<Photo>[]>;
    user?: Nullable<User>;
}

export class Photo {
    id: number;
    title?: Nullable<string>;
    url?: Nullable<string>;
    thumbnailUrl?: Nullable<string>;
    album?: Nullable<Album>;
}

export class Todo {
    id: number;
    title?: Nullable<string>;
    completed?: Nullable<boolean>;
    user?: Nullable<User>;
}

export abstract class IQuery {
    abstract users(first?: Nullable<number>, userId?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract userById(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract posts(first?: Nullable<number>, postId?: Nullable<number>, userId?: Nullable<number>): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;

    abstract comments(first?: Nullable<number>, commentId?: Nullable<number>, postId?: Nullable<number>): Nullable<Nullable<Comment>[]> | Promise<Nullable<Nullable<Comment>[]>>;

    abstract albums(first?: Nullable<number>, albumId?: Nullable<number>, userId?: Nullable<number>): Nullable<Nullable<Album>[]> | Promise<Nullable<Nullable<Album>[]>>;

    abstract photos(first?: Nullable<number>, photoId?: Nullable<number>, albumId?: Nullable<number>): Nullable<Nullable<Photo>[]> | Promise<Nullable<Nullable<Photo>[]>>;

    abstract todos(first?: Nullable<number>, todoId?: Nullable<number>, userId?: Nullable<number>): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;
}

export abstract class IMutation {
    abstract createPost(post: CreatePostInput): Nullable<Post> | Promise<Nullable<Post>>;

    abstract updatePost(postId: number, post: UpdatePostInput): Nullable<Post> | Promise<Nullable<Post>>;

    abstract deletePost(postId: number): Nullable<string> | Promise<Nullable<string>>;
}

type Nullable<T> = T | null;
