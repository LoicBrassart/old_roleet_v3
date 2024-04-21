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
import { useForm } from "react-hook-form";
import { BsQuestionOctagonFill } from "react-icons/bs";
import { z } from "zod";
import MapForm from "./MapForm";
import { gql, useMutation } from "@apollo/client";
import { ScenarioInputSchema } from "@/generated/zodValidators";
import { ScenarioInput } from "@/generated/types";
import { useAddScenarioMutation } from "@/generated/gqlQueries";

const scenarioSchema = ScenarioInputSchema();
const emptyScenario: ScenarioInput = {
  bannerUrl: "",
  credits: "",
  fullStory: "",
  maps: [],
  teaser: "",
  title: "",
};

const POST_SCENARIO = gql`
  mutation AddScenario($scenario: ScenarioInput!) {
    addScenario(scenario: $scenario) {
      id
      title
      teaser
      fullStory
      bannerUrl
      credits
      maps {
        title
        description
        pictureUrl
        pointsOfInterest {
          code
          title
          description
        }
      }
    }
  }
`;

export default function ScenarioForm() {
  const form = useForm<z.infer<typeof scenarioSchema>>({
    resolver: zodResolver(scenarioSchema),
    defaultValues: emptyScenario,
  });
  //const [addScenario, { loading, error }] = useMutation(POST_SCENARIO);
  const [createScenario] = useAddScenarioMutation();

  const hSubmit = async (values: z.infer<typeof scenarioSchema>) => {
    console.log(values);
    createScenario({ variables: { scenario: values } });

    // try {
    //   const { data } = await addScenario({ variables: { scenario: values } });
    // } catch (err) {
    //   console.error(err);
    // }
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

        <fieldset title="maps">
          <MapForm control={form.control} name="maps" />
        </fieldset>

        <Button onClick={form.handleSubmit(hSubmit)}>Save</Button>
      </TooltipProvider>
    </Form>
  );
}
