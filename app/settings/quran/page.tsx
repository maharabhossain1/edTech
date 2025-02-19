"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function QuranPreferences() {
  const [arabicFontSize, setArabicFontSize] = useState(24);
  const [translationFontSize, setTranslationFontSize] = useState(16);
  const [arabicFont, setArabicFont] = useState("Uthmani");

  const fontOptions = [
    { value: "Uthmani", label: "Uthmani" },
    { value: "Hafs", label: "KFGQPC Hafs" },
    { value: "Naskh", label: "Naskh" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Reading Preferences</h2>
      </div>
      <div className="space-y-8">
        {/* Font Selection */}
        <div className="space-y-2">
          <Label htmlFor="arabicFont">Arabic Font Style</Label>
          <Select value={arabicFont} onValueChange={setArabicFont}>
            <SelectTrigger id="arabicFont">
              <SelectValue placeholder="Select font" />
            </SelectTrigger>
            <SelectContent>
              {fontOptions.map(font => (
                <SelectItem key={font.value} value={font.value}>
                  {font.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground text-neutral-700">
            Choose the font style for Arabic text display
          </p>
        </div>

        {/* Arabic Font Size */}
        <div className="space-y-2">
          <Label>Arabic Text Size</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[arabicFontSize]}
              onValueChange={value => setArabicFontSize(value[0])}
              min={18}
              max={36}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">
              {arabicFontSize}px
            </span>
          </div>
          <div
            className="mt-2 p-4 bg-muted rounded-md text-right bg-neutral-100"
            style={{ fontSize: `${arabicFontSize}px` }}
          >
            بِسْمِ اللَّهِ
          </div>
        </div>

        {/* Translation Font Size */}
        <div className="space-y-2">
          <Label>Translation Text Size</Label>
          <div className="flex items-center gap-4">
            <Slider
              value={[translationFontSize]}
              onValueChange={value => setTranslationFontSize(value[0])}
              min={14}
              max={24}
              step={1}
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12">
              {translationFontSize}px
            </span>
          </div>
          <div
            className="mt-2 p-4 bg-muted rounded-md bg-neutral-100"
            style={{ fontSize: `${translationFontSize}px` }}
          >
            In the name of Allah
          </div>
        </div>

        {/* Save Button */}
        <Button className="bg-indigo-700 hover:bg-indigo-800 rounded-lg text-sm font-semibold w-full">
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
