import React from 'react';
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/uiのButtonを使用
import { Input } from "@/components/ui/input";

interface NumberStepperProps {
  label: string;
  value: number;
  step: number;
  unit: string;
  onChange: (newValue: number) => void;
}

export function NumberStepper({ label, value, step, unit, onChange }: NumberStepperProps) {
  const increment = () => onChange(value + step);
  const decrement = () => onChange(Math.max(0, value - step)); // 0未満にならないようガード

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-xl bg-white shadow-sm">
      <label className="text-sm font-semibold text-slate-500">{label}</label>
      <div className="flex items-center gap-3">
        {/* マイナスボタン */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={decrement}
          className="h-10 w-10 rounded-full border-2 hover:bg-slate-100"
        >
          <Minus size={18} />
        </Button>

        {/* 数値表示・直接入力も可能 */}
        <div className="flex-1 flex items-center justify-center">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full text-center font-bold text-xl bg-transparent outline-none"
          />
          <span className="text-sm text-slate-400 ml-1">{unit}</span>
        </div>

        {/* プラスボタン */}
        <Button 
          variant="outline" 
          size="icon" 
          onClick={increment}
          className="h-10 w-10 rounded-full border-2 hover:bg-slate-100"
        >
          <Plus size={18} />
        </Button>
      </div>
    </div>
  );
}