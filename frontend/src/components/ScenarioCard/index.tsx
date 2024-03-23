import { GiMagnifyingGlass, GiTiedScroll } from "react-icons/gi";
import { ScenarioInput } from "../../../backend/src/resolvers/types";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import s from "./ScenarioCard.module.css";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";

export function ScenarioCard({ title, teaser, tags }: Partial<ScenarioInput>) {
  const [isUnlocked, setUnlocked] = useState<boolean>(false);

  const hUnlock = () => {
    setUnlocked(true);
  };

  return (
    <div className={s.Card}>
      <AlertDialog>
        <div className={s.Title}>{title}</div>
        <div className={s.Actions}>
          <Sheet>
            <SheetTrigger>
              <Button>
                <GiMagnifyingGlass className="h-8 w-8 rounded-full p-0.5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>{title}</SheetHeader>
            </SheetContent>
          </Sheet>
          {isUnlocked ? (
            "open"
          ) : (
            <>
              <AlertDialogTrigger>
                <Button>
                  <GiTiedScroll className="h-8 w-8 rounded-full p-0.5" />
                </Button>
              </AlertDialogTrigger>
            </>
          )}
        </div>
        <div className={s.Teaser}>{teaser || "lorem ipsum"}</div>
        <div className={s.Tags}>{tags || "fantasy low-level goblins"}</div>
        <AlertDialogPortal>
          <AlertDialogOverlay className="bg-gray-900/70 absolute top-0 left-0 w-full h-full text-white">
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently mark this
                  scenario as read for you.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={hUnlock}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialogPortal>
      </AlertDialog>
    </div>
  );
}
