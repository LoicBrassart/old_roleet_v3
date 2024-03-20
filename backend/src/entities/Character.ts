import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
@ObjectType()
export class Character extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatarUrl?: string;
}
