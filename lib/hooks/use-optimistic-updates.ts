"use client";

import { useOptimistic, useTransition } from "react";

export function useOptimisticUpdate<T>(
  initialState: T,
  updateFn?: (state: T, optimisticValue: T) => T
) {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimisticState] = useOptimistic(
    initialState,
    updateFn || ((state, newState) => newState)
  );

  const updateOptimistic = (
    optimisticValue: T,
    actualUpdateFn: () => Promise<void>
  ) => {
    startTransition(async () => {
      setOptimisticState(optimisticValue);
      await actualUpdateFn();
    });
  };

  return {
    state: optimisticState,
    isPending,
    updateOptimistic,
  };
}

export function useOptimisticList<T extends { id: string | number }>(
  initialList: T[]
) {
  const updateFn = (state: T[], action: { type: string; item: T }) => {
    switch (action.type) {
      case "add":
        return [...state, action.item];
      case "update":
        return state.map((item) =>
          item.id === action.item.id ? { ...item, ...action.item } : item
        );
      case "remove":
        return state.filter((item) => item.id !== action.item.id);
      default:
        return state;
    }
  };

  const { state, isPending, updateOptimistic } = useOptimisticUpdate(initialList, updateFn as any);

  const addOptimistic = (item: T, actualUpdateFn: () => Promise<void>) => {
    updateOptimistic({ type: "add", item } as any, actualUpdateFn);
  };

  const updateItemOptimistic = (item: T, actualUpdateFn: () => Promise<void>) => {
    updateOptimistic({ type: "update", item } as any, actualUpdateFn);
  };

  const removeOptimistic = (item: T, actualUpdateFn: () => Promise<void>) => {
    updateOptimistic({ type: "remove", item } as any, actualUpdateFn);
  };

  return {
    items: state,
    isPending,
    addOptimistic,
    updateItemOptimistic,
    removeOptimistic,
  };
}