import { Entity, Column, BeforeInsert } from 'typeorm'
import { compare, hash } from 'bcryptjs'
import { Exclude, classToPlain } from 'class-transformer'
import { IsEmail } from 'class-validator'
import { AbstractEntity } from './abstract-entity'

@Entity('users')
export class UserEntity extends AbstractEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column({ unique: true })
  username: string

  @Column({ default: '', type: 'text' })
  bio: string

  @Column({ default: null, nullable: true })
  image: string | null

  @Column()
  @Exclude()
  password: string

  // TODO: add following

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await compare(attempt, this.password)
  }

  toJSON(): {} {
    return classToPlain(this)
  }
}
