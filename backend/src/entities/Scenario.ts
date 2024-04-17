import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Map } from "./Map";

@Entity()
@ObjectType()
export class Scenario extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  teaser!: string;

  @Field()
  @Column()
  fullStory!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bannerUrl?: string;

  @Field()
  @Column()
  credits!: string;

  @Field((_type) => [Map])
  @OneToMany((_type) => Map, (map) => map.scenario, {
    cascade: true,
  })
  maps!: Map[];
}
