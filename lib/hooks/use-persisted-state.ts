"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { z } from "zod";

export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  schema?: z.ZodSchema<T>
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const isFirstRender = useRef(true);
  const [state, setState] = useState<T>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);

        if (schema) {
          const validated = schema.parse(parsed);
          setState(validated);
        } else {
          setState(parsed);
        }
      }
    } catch (error) {
      console.warn(`Failed to load persisted state for key "${key}":`, error);
      localStorage.removeItem(key);
    }
    
    isFirstRender.current = false;
  }, [key, schema]);

  const persistedSetState = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newValue = typeof value === "function" ? (value as (prev: T) => T)(prev) : value;
      
      if (!isFirstRender.current && typeof window !== "undefined") {
        try {
          if (schema) {
            const validated = schema.parse(newValue);
            localStorage.setItem(key, JSON.stringify(validated));
          } else {
            localStorage.setItem(key, JSON.stringify(newValue));
          }
        } catch (error) {
          console.error(`Failed to persist state for key "${key}":`, error);
        }
      }
      
      return newValue;
    });
  }, [key, schema]);

  const clearPersistedState = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    setState(defaultValue);
  }, [key, defaultValue]);

  return [state, persistedSetState, clearPersistedState];
}

export function useUserPreferences<T extends Record<string, any>>(
  defaultPreferences: T,
  schema?: z.ZodSchema<T>
) {
  const [preferences, setPreferences, clearPreferences] = usePersistedState(
    "user-preferences",
    defaultPreferences,
    schema
  );

  const updatePreference = useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      setPreferences((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setPreferences]
  );

  const resetPreferences = useCallback(() => {
    clearPreferences();
  }, [clearPreferences]);

  return {
    preferences,
    updatePreference,
    resetPreferences,
    setPreferences,
  };
}

export function useCachedState<T>(
  key: string,
  defaultValue: T,
  ttlMinutes: number = 60
): [T, (value: T) => void, boolean] {
  const [state, setState] = useState<T>(defaultValue);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { value, timestamp } = JSON.parse(cached);
        const now = Date.now();
        const ttlMs = ttlMinutes * 60 * 1000;
        
        if (now - timestamp < ttlMs) {
          setState(value);
          setIsExpired(false);
        } else {
          setIsExpired(true);
          localStorage.removeItem(key);
        }
      }
    } catch (error) {
      console.warn(`Failed to load cached state for key "${key}":`, error);
      localStorage.removeItem(key);
    }
  }, [key, ttlMinutes]);

  const setCachedState = useCallback(
    (value: T) => {
      setState(value);
      
      if (typeof window !== "undefined") {
        try {
          const cacheData = {
            value,
            timestamp: Date.now(),
          };
          localStorage.setItem(key, JSON.stringify(cacheData));
          setIsExpired(false);
        } catch (error) {
          console.error(`Failed to cache state for key "${key}":`, error);
        }
      }
    },
    [key]
  );

  return [state, setCachedState, isExpired];
}
