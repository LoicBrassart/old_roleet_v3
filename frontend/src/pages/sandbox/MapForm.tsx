import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useFieldArray } from "react-hook-form";
import { BsQuestionOctagonFill } from "react-icons/bs";
import PoIForm from "./POIForm";

type PointOfInterest = {
  code: string;
  title: string;
  description: string;
};
type Map = {
  title: string;
  description: string;
  picture: string;
  pointsOfInterest: PointOfInterest[];
};

const emptyMap: Map = {
  title: "",
  description: "",
  picture: "",
  pointsOfInterest: [],
};

interface Props {
  control: any;
  name: string;
}
export default function MapForm({ control, name }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((map, index) => (
        <div key={map.id}>
          <FormField
            name={`maps.${index}.title`}
            key={`maps.${index}.title`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nom de la carte
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>Entre le nom de la carte.</TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="Map Title" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`maps.${index}.description`}
            key={`maps.${index}.description`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      A quoi correspond cette carte ? Quels sont les conditions
                      de lumière, le style des murs, l&apos;atmosphère générale
                      ?
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="Map Description" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`maps.${index}.picture`}
            key={`maps.${index}.picture`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Map Picture URL
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Enter the URL of the picture for the map.
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="Map Picture URL" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <PoIForm control={control} name={`maps.${index}.pointsOfInterest`} />

          <Button type="button" onClick={() => remove(index)}>
            Remove Map
          </Button>
        </div>
      ))}

      <Button type="button" onClick={() => append(emptyMap)}>
        Add Map
      </Button>
    </>
  );
}
