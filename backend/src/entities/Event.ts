import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
@ObjectType()
export class Event extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  timestampStart!: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  timestampEnd?: Date;

  @Field({ nullable: true })
  @Column()
  location!: string;
}
