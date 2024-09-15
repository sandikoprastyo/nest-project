import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let hashedPassword: string | undefined;

    if (updateUserDto.password) {
      const saltRounds = 10;
      // Hash password jika ada
      hashedPassword = await bcrypt.hash(updateUserDto.password, saltRounds);
    }

    // Buat salinan dari DTO untuk diperbarui
    const updatedUserDto = { ...updateUserDto };
    if (hashedPassword) {
      // Ganti password di salinan DTO dengan password yang telah di-hash
      updatedUserDto.password = hashedPassword;
    }

    // Perbarui pengguna dengan data terbaru di database
    await this.usersRepository.update(id, updatedUserDto);
    
    // Temukan dan kembalikan pengguna yang telah diperbarui
    return this.findOne(id);
  }


  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
