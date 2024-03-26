import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  JoinTable,
  ManyToOne,
} from "typeorm";
import { PointOfInterest } from "./PointOfInterest";
import { Scenario } from "./Scenario";

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
    cascade: true,
  })
  pointsOfInterest!: PointOfInterest[];

  @Field((_type) => Scenario)
  @ManyToOne((_type) => Scenario, (scenario) => scenario.maps)
  scenario!: Scenario;
}
