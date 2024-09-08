import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";

interface CellStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: "left" | "center" | "right";
  color?: string;
  backgroundColor?: string;
}

interface CellPosition {
  row: number;
  col: number;
}

type CellStyles = Record<string, CellStyle>;

export default function App() {
  const [title, setTitle] = useState<string>("Untitled spreadsheet");
  const [selectedCell, setSelectedCell] = useState<CellPosition | null>(null);
  const [cellStyles, setCellStyles] = useState<CellStyles>({});

  const rows = 10;
  const cols = 8;

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setSelectedCell({ row: rowIndex, col: colIndex });
  };

  const handleStyleChange = (property: keyof CellStyle, value: string) => {
    if (selectedCell) {
      const cellKey = `${selectedCell.row}-${selectedCell.col}`;
      setCellStyles((prev) => ({
        ...prev,
        [cellKey]: {
          ...prev[cellKey],
          [property]: value,
        },
      }));
    }
  };

  const getCellStyle = (rowIndex: number, colIndex: number): CellStyle => {
    const cellKey = `${rowIndex}-${colIndex}`;
    return cellStyles[cellKey] || {};
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Input
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        className="text-2xl font-bold mb-4"
      />
      <div className="mb-4 flex space-x-2">
        <Select onValueChange={(value: string) => handleStyleChange("fontFamily", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Font Family" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="arial">Arial</SelectItem>
            <SelectItem value="helvetica">Helvetica</SelectItem>
            <SelectItem value="times-new-roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value: string) => handleStyleChange("fontSize", value)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Font Size" />
          </SelectTrigger>
          <SelectContent>
            {[8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24].map((size) => (
              <SelectItem key={size} value={`${size}px`}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ToggleGroup type="multiple" variant="outline">
          <ToggleGroupItem
            value="bold"
            aria-label="Toggle bold"
            onClick={() => handleStyleChange("fontWeight", "bold")}
          >
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="italic"
            aria-label="Toggle italic"
            onClick={() => handleStyleChange("fontStyle", "italic")}
          >
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="underline"
            aria-label="Toggle underline"
            onClick={() => handleStyleChange("textDecoration", "underline")}
          >
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left" onClick={() => handleStyleChange("textAlign", "left")}>
            <AlignLeft className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="center"
            aria-label="Align center"
            onClick={() => handleStyleChange("textAlign", "center")}
          >
            <AlignCenter className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="right"
            aria-label="Align right"
            onClick={() => handleStyleChange("textAlign", "right")}
          >
            <AlignRight className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
        <Input
          type="color"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleChange("color", e.target.value)}
          className="w-10 h-10 p-1 rounded"
        />
        <Input
          type="color"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleChange("backgroundColor", e.target.value)}
          className="w-10 h-10 p-1 rounded"
        />
      </div>
      <div className="border rounded overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {Array.from({ length: cols }, (_, i) => (
                <th key={i} className="border p-2">
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, rowIndex) => (
              <tr key={rowIndex}>
                <td className="border p-2 font-bold">{rowIndex + 1}</td>
                {Array.from({ length: cols }, (_, colIndex) => (
                  <td
                    key={colIndex}
                    className="border p-2"
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    style={getCellStyle(rowIndex, colIndex)}
                  >
                    <Input className="w-full h-full border-none p-0" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
