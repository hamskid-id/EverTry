// components/dashboard/ShoppingListPreview.tsx
"use client";

import React from "react";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShoppingListPreviewProps {
  itemCount: number;
  completedCount: number;
  onViewList: () => void;
}

export const ShoppingListPreview = ({
  itemCount,
  completedCount,
  onViewList,
}: ShoppingListPreviewProps) => {
  if (itemCount === 0) return null;

  const progress = itemCount > 0 ? (completedCount / itemCount) * 100 : 0;
  const pendingCount = itemCount - completedCount;

  return (
    <Card
      className="bg-[#1A1D21] border-[#363A3D] hover:border-emerald-800 transition-colors cursor-pointer shadow-none"
      onClick={onViewList}
    >
      <CardContent className="p-6 shadow-none">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-900/20 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-medium text-white">Shopping List</h3>
              <p className="text-sm text-[#ABB8C4]">
                {completedCount} of {itemCount} items completed
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-emerald-400" />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#ABB8C4">Progress</span>
            <span className="text-emerald-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-[#0D0F10] rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-[#0D0F10] rounded">
            <div className="text-lg font-bold text-white">{itemCount}</div>
            <p className="text-xs text-[#ABB8C4]">Total</p>
          </div>
          <div className="text-center p-2 bg-emerald-900/10 rounded">
            <div className="text-lg font-bold text-emerald-400">
              {completedCount}
            </div>
            <p className="text-xs text-emerald-300">Done</p>
          </div>
          <div className="text-center p-2 bg-amber-900/10 rounded">
            <div className="text-lg font-bold text-amber-400">
              {pendingCount}
            </div>
            <p className="text-xs text-amber-300">Pending</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-[#363A3D]">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onViewList();
            }}
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            View Full List
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
