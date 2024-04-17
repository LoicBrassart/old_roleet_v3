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

type PointOfInterest = {
  code: string;
  title: string;
  description: string;
};

const emptyPOI: PointOfInterest = {
  code: "",
  title: "",
  description: "",
};

interface Props {
  control: any;
  name: string;
}
export default function PoIForm({ control, name }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <>
      {fields.map((pointOfInterest, index) => (
        <div key={pointOfInterest.id}>
          <FormField
            name={`${name}.${index}.code`}
            key={`${name}.${index}.code`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Code du point d&apos;intérêt
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Entre le code du point d&apos;intérêt tel qu&apos;il
                      apparaît sur la carte.
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="PoI Code" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`${name}.${index}.title`}
            key={`${name}.${index}.title`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nom du point d&apos;intérêt
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Entre le nom du lieu ou le titre du PoI.
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="PoI Title" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name={`${name}.${index}.description`}
            key={`${name}.${index}.description`}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description du point d&apos;intérêt
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      À quoi correspond ce marqueur sur ta carte ?
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="PoI Description" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="button" onClick={() => remove(index)}>
            Supprimer ce PoI
          </Button>
        </div>
      ))}
      <Button type="button" onClick={() => append(emptyPOI)}>
        Ajouter un PoI
      </Button>
    </>
  );
}
