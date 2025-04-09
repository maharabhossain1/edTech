"use client";
import { BookOpenText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const TafseerDialog = ({ verse }) => {
  // Dummy tafseer data
  const tafseerData = {
    title: `Tafseer for Verse ${verse?.verse_key || "1:1"}`,
    author: "Ibn Kathir",
    content: `
      This blessed Surah is the opener of the Qur'an and comprises seven verses according to the consensus of the scholars. 
      It is called Umm Al-Kitab (the Mother of the Book), because it contains the meanings of the entire Qur'an.
      
      "In the name of Allah, the Most Gracious, the Most Merciful" means that the slave starts with the name of Allah seeking help, 
      and it is also said that it means the slave is naming Allah, meaning "I begin with every name that belongs to Allah."
      
      "The Most Gracious" refers to the vast mercy that encompasses all of creation.
      
      "The Most Merciful" refers to His specific mercy for the believers.
    `,
    additionalNotes:
      "The verse emphasizes the compassionate nature of Allah and establishes the foundation of seeking His guidance in all matters.",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-max h-max rounded-full p-1.5">
          <BookOpenText className="text-neutral-700" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {tafseerData.title}
          </DialogTitle>
          <DialogDescription>
            Explanation by {tafseerData.author}
          </DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <h3 className="text-lg font-semibold mb-2">Explanation</h3>
          <div className="text-sm space-y-4 whitespace-pre-line">
            {tafseerData.content}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
          <p className="text-sm text-neutral-700">
            {tafseerData.additionalNotes}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TafseerDialog;
