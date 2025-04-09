import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoIcon from "@/icons/info-icon.svg";
import KabaIcon from "@/icons/kaba-icon.svg";
import MadinaIcon from "@/icons/madina-icon.svg";
import { IconButton } from "../ui/icon-button";
import { SurahPosition } from "@/lib/types/surah";
import { SURAH_DETAILS } from "@/data/surah-details";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import FormattedText from "./formatted-text";

interface SurahInfoModalProps {
  surahDetails: SURAH_DETAILS;
  surahBasicInfo: SurahPosition;
}

const SurahInfoModal: React.FC<SurahInfoModalProps> = ({
  surahDetails,
  surahBasicInfo,
}) => {
  const getRevealedLocationIcon = (revelationNumber: number) => {
    return revelationNumber === 1 ? (
      <KabaIcon className="text-control-normal text-xl" />
    ) : (
      <MadinaIcon className="text-control-normal text-xl" />
    );
  };

  const getRevealedLocation = (revelationNumber: number) => {
    return revelationNumber === 1 ? "Meccan" : "Madinah";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <IconButton icon={InfoIcon} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span className="font-arabic text-2xl">
              {surahBasicInfo.surah.arabicText} ({surahDetails.name})
            </span>
          </DialogTitle>
          <div className="flex gap-2">
            <div className="bg-surface h-max w-max rounded-lg p-1">
              {getRevealedLocationIcon(surahBasicInfo.surah.revelation)}
            </div>
            <div>
              <p className="text-body-medium">
                {getRevealedLocation(surahBasicInfo.surah.revelation)}
              </p>
              <p className="text-text-color-light text-body-small">
                {surahBasicInfo.surah.verses} Ayahs
              </p>
            </div>
          </div>
        </DialogHeader>
        <Tabs defaultValue="info" className="mt-2 w-full space-y-3">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Surah Info</TabsTrigger>
            <TabsTrigger value="virtue">Virtues</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] px-2">
            <TabsContent value="info" className="mt-4">
              <div className="space-y-4">
                <FormattedText text={surahDetails.chapter_info} />
              </div>
            </TabsContent>
            <TabsContent value="virtue" className="mt-4">
              <div className="space-y-4">
                <FormattedText text={surahDetails.chapter_virtue} />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SurahInfoModal;
