import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

type POI = {
  code: string;
  title: string;
  description: string;
};

type Map = {
  title: string;
  description: string;
  picture: string;
  pois: POI[];
};

type FormValues = {
  title: string;
  teaser: string;
  fullStory: string;
  bannerUrl: string;
  credits: string;
  maps: Map[];
};

const poiSchema = z.object({
  code: z.string().min(2).max(5),
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
});

const mapSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  picture: z.string().min(2).max(50),
  pois: z.array(poiSchema),
});

const scenarioSchema = z.object({
  title: z.string().min(2).max(50),
  teaser: z.string().min(2).max(50),
  fullStory: z.string().min(2).max(50),
  bannerUrl: z.string().min(2).max(50),
  credits: z.string().min(2).max(50),
  maps: z.array(mapSchema),
});

const ScenarioForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      teaser: "",
      fullStory: "",
      bannerUrl: "",
      credits: "",
      maps: [{} as Map],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "maps",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">
          Scenario Title
        </label>
        <Input type="text" id="title" {...register("title")} className="mt-1" />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="teaser" className="block text-gray-700">
          Teaser
        </label>
        <Input
          type="text"
          id="teaser"
          {...register("teaser")}
          className="mt-1"
        />
        {errors.teaser && (
          <span className="text-red-500">{errors.teaser.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="fullStory" className="block text-gray-700">
          Full Story
        </label>
        <Input
          type="text"
          id="fullStory"
          {...register("fullStory")}
          className="mt-1"
        />
        {errors.fullStory && (
          <span className="text-red-500">{errors.fullStory.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="bannerUrl" className="block text-gray-700">
          Banner URL
        </label>
        <Input
          type="text"
          id="bannerUrl"
          {...register("bannerUrl")}
          className="mt-1"
        />
        {errors.bannerUrl && (
          <span className="text-red-500">{errors.bannerUrl.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="credits" className="block text-gray-700">
          Credits
        </label>
        <Input
          type="text"
          id="credits"
          {...register("credits")}
          className="mt-1"
        />
        {errors.credits && (
          <span className="text-red-500">{errors.credits.message}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Maps</label>
        {fields.map((map, index) => (
          <div key={map.id}>
            <div className="flex items-center space-x-2 mb-2">
              <Input
                type="text"
                {...register(`maps.${index}.title` as const)}
                placeholder="Map Title"
              />
              <Input
                type="text"
                {...register(`maps.${index}.description` as const)}
                placeholder="Map Description"
              />
              <Input
                type="text"
                {...register(`maps.${index}.picture` as const)}
                placeholder="Map Picture URL"
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
            {(map.pois || []).map((poi, poiIndex) => (
              <div key={poiIndex} className="flex items-center space-x-2 mb-2">
                <Input
                  type="text"
                  {...register(`maps.${index}.pois.${poiIndex}.code` as const)}
                  placeholder="POI Code"
                />
                <Input
                  type="text"
                  {...register(`maps.${index}.pois.${poiIndex}.title` as const)}
                  placeholder="POI Title"
                />
                <Input
                  type="text"
                  {...register(
                    `maps.${index}.pois.${poiIndex}.description` as const
                  )}
                  placeholder="POI Description"
                />
              </div>
            ))}
            <button type="button" onClick={() => append({} as POI)}>
              Add POI
            </button>
          </div>
        ))}
        <button type="button" onClick={() => append({} as Map)}>
          Add Map
        </button>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ScenarioForm;
