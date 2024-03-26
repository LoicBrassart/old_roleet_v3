import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PointOfInterest } from "../../../backend/src/entities/PointOfInterest";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapInput } from "../../../backend/src/resolvers/types";

export function MapDetail(map: MapInput) {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex">
      <ResizablePanel>
        <ScrollArea className="h-lvh rounded-md border p-4">
          <h1>{map.title}</h1>
          <p>{map.description}</p>
          <img src={map.pictureUrl} alt={map.title} className="w-full" />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>
        <ScrollArea className="h-lvh rounded-md border p-4">
          <Accordion type="single" collapsible className="w-full">
            {map.pointsOfInterest.map((poi: PointOfInterest) => (
              <AccordionItem value={`key-${poi.id}`} key={poi.id}>
                <AccordionTrigger>
                  {poi.code} - {poi.title}
                </AccordionTrigger>
                <AccordionContent>{poi.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
