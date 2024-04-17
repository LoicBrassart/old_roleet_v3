import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tooltip } from "@radix-ui/react-tooltip";
import { useFieldArray, useForm } from "react-hook-form";
import { BsQuestionOctagonFill } from "react-icons/bs";
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

type Scenario = {
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
const emptyScenario: Scenario = {
  bannerUrl: "",
  credits: "",
  fullStory: "",
  maps: [],
  teaser: "",
  title: "",
};
const emptyMap: Map = {
  title: "",
  description: "",
  picture: "",
  pois: [],
};
const emptyPOI: POI = {
  code: "",
  title: "",
  description: "",
};

export default function ScenarioForm() {
  const form = useForm<z.infer<typeof scenarioSchema>>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: emptyScenario,
  });

  const {
    fields: mapFields,
    append: appendMap,
    remove: removeMap,
  } = useFieldArray({
    control: form.control,
    name: "maps",
  });

  const {
    fields: poiFields,
    append: appendPOI,
    remove: removePOI,
  } = useFieldArray({
    control: form.control,
    name: `maps.${index}.pois`,
  });

  const hSubmit = (values: z.infer<typeof scenarioSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <TooltipProvider>
        <fieldset title="Public Information">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Titre
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>Le titre du scenario</TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="Le Camp Gobelin" {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="teaser"
            control={form.control}
            name="teaser"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Teaser
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Une courte description pour donner aux éventuels lecteurs
                      l&apos;envie de découvrir ce scénario. Attention à ne pas
                      trop spoiler l&apos;histoire !
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input
                      placeholder="Des enfants ont disparu dans un petit village forestier, aidez à les retrouver !"
                      {...field}
                    />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="illustration"
            control={form.control}
            name="bannerUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Illustration
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Attention au spoil accidentel sur l&apos;illustration !
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            key="credits"
            control={form.control}
            name="credits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Credits
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      Merci de lister l&apos;auteur et lesite de provenance du
                      scenario s&apos;il est connu
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Input placeholder="Une illustre inconnue" {...field} />
                  </FormControl>
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset title="Hidden Information">
          <FormField
            name="fullStory"
            key="fullStory"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  L&apos;histoire
                  <Tooltip>
                    <TooltipTrigger className="m-1">
                      <BsQuestionOctagonFill />
                    </TooltipTrigger>
                    <TooltipContent>
                      C&apos;est ici que devrait se trouver l&apos;histoire
                      détaillée. Ce champ ne sera *pas* visible pour les
                      visiteurs, pas de risque de spoil !
                    </TooltipContent>
                  </Tooltip>
                  <FormControl>
                    <Textarea
                      placeholder={`Des gobelins kidnappent des enfants pour en faire de la main d'oeuvre à vil coût.\n\t@ pour lister des PNJ\n\t# pour lister des lieux\n\t% pour lister des monstres`}
                      {...field}
                    />
                  </FormControl>
                </FormLabel>

                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>

        <fieldset title="Maps">
          {mapFields.map((map, index) => (
            <div key={map.id}>
              <FormField
                name={`maps.${index}.title`}
                key={`maps.${index}.title`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nom de la carte
                      <Tooltip>
                        <TooltipTrigger className="m-1">
                          <BsQuestionOctagonFill />
                        </TooltipTrigger>
                        <TooltipContent>
                          Entre le nom de la carte.
                        </TooltipContent>
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
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description
                      <Tooltip>
                        <TooltipTrigger className="m-1">
                          <BsQuestionOctagonFill />
                        </TooltipTrigger>
                        <TooltipContent>
                          A quoi correspond cette carte ? Quels sont les
                          conditions de lumière, le style des murs,
                          l&apos;atmosphère générale ?
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
                control={form.control}
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

              <Button type="button" onClick={() => removeMap(index)}>
                Remove Map
              </Button>
            </div>
          ))}

          <Button type="button" onClick={() => appendMap(emptyMap)}>
            Add Map
          </Button>
        </fieldset>

        <Button onClick={form.handleSubmit(hSubmit)}>Save</Button>
      </TooltipProvider>
    </Form>
  );
}
