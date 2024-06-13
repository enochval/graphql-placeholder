import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"


export class CreatePostDTO {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    body: string

    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    userId: number
}