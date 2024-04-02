"use client";
import Head from "next/head";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BsQuestionOctagonFill } from "react-icons/bs";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  teaser: z.string().min(2).max(50),
  fullStory: z.string().min(2).max(50),
  bannerUrl: z.string().min(2).max(50),
  credits: z.string().min(2).max(50),
  npcs: z.array(z.string()),
  maps: z.array(z.string()),
});
type Field = {
  name: "title" | "teaser" | "bannerUrl" | "credits" | "fullStory";
  label: string;
  placeholder?: string;
  explanation: string;
  isPublic: boolean;
};
const fields: Field[] = [
  {
    name: "title",
    label: "Titre",
    placeholder: "Le Camp Gobelin",
    explanation: "Le titre du scenario",
    isPublic: true,
  },
  {
    name: "teaser",
    label: "Teaser",
    placeholder:
      "Des enfants ont disparu dans un petit village forestier, aidez à les retrouver !",
    explanation:
      "Une courte description pour donner aux éventuels lecteurs l'envie de découvrir ce scénario. Attention à ne pas trop spoiler l'histoire !",
    isPublic: true,
  },
  {
    name: "bannerUrl",
    label: "Illustration",
    placeholder: undefined,
    explanation: "Attention au spoil accidentel sur l'illustration !",
    isPublic: true,
  },
  {
    name: "credits",
    label: "Credits",
    placeholder: "Une illustre inconnu",
    explanation:
      "Merci de lister l'auteur et lesite de provenance du scenario s'il est connu",
    isPublic: true,
  },
  {
    name: "fullStory",
    label: "L'histoire",
    placeholder:
      "Des gobelins kidnappent des enfants pour en faire de la main d'oeuvre à vil coût.",
    explanation:
      "C'est ici que devrait se trouver l'histoire détaillée. Ce champ ne sera *pas* visible pour les visiteurs, pas de risque de spoil !",
    isPublic: false,
  },
];

export default function ScenarioForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      teaser: "",
      fullStory: "",
      bannerUrl: "",
      credits: "",
      npcs: [],
      maps: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <Head>
        <title>Roleet - Forge: Créer un Scenario</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Creation d&apos;un Scenario</h1>
      <div className="w-3/4 m-auto border p-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {fields.map((elt) => (
              <FormField
                key={elt.name}
                control={form.control}
                name={elt.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{elt.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={elt.placeholder} {...field} />
                    </FormControl>
                    <FormDescription>
                      <BsQuestionOctagonFill />
                      {elt.explanation}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit">Enregistrer</Button>
          </form>
        </Form>
      </div>
    </>
  );
}