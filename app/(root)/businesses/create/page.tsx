import React from "react";

import Card from "@/components/Card";
import type { Field } from "@/components/forms/ContactForm";
import ContactForm from "@/components/forms/ContactForm";

type Item = { id: string; name: string };

const CreateBusiness = async () => {
  const [categoriesRes, tagsRes] = await Promise.all([
    fetch(`${process.env.BASE_URL}/api/categories`),
    fetch(`${process.env.BASE_URL}/api/tags`),
  ]);

  if (!categoriesRes.ok || !tagsRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const categories: Item[] = await categoriesRes.json();
  const tags: Item[] = await tagsRes.json();

  const categoryOptions = categories.map((c) => ({
    value: c.id.toString(),
    label: c.name,
  }));
  const tagOptions = tags.map((t) => ({
    value: t.id.toString(),
    label: t.name,
  }));

  const contactFormFields: Field[] = [
    { name: "businessName", label: "Business Name", type: "text" },
    { name: "contactEmail", label: "Contact Email", type: "email" },
    {
      name: "categories",
      label: "Category",
      type: "checkbox",
      options: categoryOptions,
    },
    {
      name: "tags",
      label: "Tags",
      type: "checkbox",
      options: tagOptions,
    },
  ];

  return (
    <Card>
      <ContactForm
        label="Business"
        items={contactFormFields}
        route="/businesses"
      />
    </Card>
  );
};

export default CreateBusiness;
