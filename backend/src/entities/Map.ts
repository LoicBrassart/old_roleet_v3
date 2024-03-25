import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinTable,
} from "typeorm";
import { PointOfInterest } from "./PointOfInterest";

@Entity()
@ObjectType()
export class Map extends BaseEntity {
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
  pictureUrl!: string;

  @Field((_type) => [PointOfInterest])
  @OneToMany((_type) => PointOfInterest, (poi) => poi.map, {
    lazy: true,
    cascade: true,
  })
  pointsOfInterest!: PointOfInterest[];
}
