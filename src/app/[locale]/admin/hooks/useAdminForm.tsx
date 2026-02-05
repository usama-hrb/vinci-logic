"use client";

import { useState } from "react";

export type FormState = {
  title: string;
  description: string;
  slug: string;
  content: string;
  icon: string;
};

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  slug: "",
  content: "",
  icon: "",
};

export function useAdminForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => setForm(EMPTY_FORM);

  return {
    form,
    setForm,
    updateField,
    resetForm,
  };
}
