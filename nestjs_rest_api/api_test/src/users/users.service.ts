import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async getById(id: number) {
        const user = await this.userRepository.findOne({ id });
        if(user) {
            return user;
        }
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    async getByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ email });
    }

    async create({email, name, password}: CreateUserDto) {
        try {
            const user = await this.userRepository.findOne({email});
            if(!user) {
                const newUser = await this.userRepository.save(
                    this.userRepository.create({
                        email,
                        name,
                        password
                    })
                );
                return newUser;
            }
            throw new Error('User already exist');
        }
        catch(error) {
            throw new Error(error);
        }
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        return await this.userRepository.update(userId, {
          currentHashedRefreshToken
        });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.getById(userId);
        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken
        );

        if(isRefreshTokenMatching) {
            return user;
        }
    }

    async removeRefreshToken(userId: number) {
        return this.userRepository.update(userId, {
            currentHashedRefreshToken: null
        });
    }
}