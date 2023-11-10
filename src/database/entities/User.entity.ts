import {
  AfterLoad,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import bcrypt from 'bcrypt';

import { AbstractEntity } from 'src/common/entities';
import { RoleEnum, StatusEnum } from 'src/common/enums';
import { generateEntityId } from 'src/common/utils';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  facebook_id?: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.ANONYMOUS],
    array: true,
  })
  roles: RoleEnum[];

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @Column({ unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'usr');
  }
}
