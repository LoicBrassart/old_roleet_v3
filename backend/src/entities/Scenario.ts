import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Character } from "./Character";

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

  @Field((_type) => [Character])
  @JoinTable()
  @ManyToMany((_type) => Character, (character) => character.scenarios, {
    lazy: true,
    cascade: ["insert"],
  })
  npcs!: Character[];
}
