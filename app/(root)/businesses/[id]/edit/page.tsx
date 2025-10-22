import { cookies } from "next/headers";
import React from "react";

import Card from "@/components/Card";
import ContactForm, { Field } from "@/components/forms/ContactForm";
import { getBaseUrl } from "@/lib/utils";

type Item = { id: number; name: string };

const EditBusiness = async ({ params }: { params: { id: string } }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const categoriesRes = await fetch(`${getBaseUrl()}/api/categories`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  const tagsRes = await fetch(`${getBaseUrl()}/api/tags`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  const businessRes = await fetch(`${getBaseUrl()}/api/businesses/${id}`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!categoriesRes.ok || !tagsRes.ok || !businessRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const categories: Item[] = await categoriesRes.json();
  const tags: Item[] = await tagsRes.json();
  const business = await businessRes.json();

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
  ];

  if (categoryOptions.length) {
    contactFormFields.push({
      name: "categories",
      label: "Categories",
      type: "checkbox",
      options: categoryOptions,
    });
  }

  if (tagOptions.length) {
    contactFormFields.push({
      name: "tags",
      label: "Tags",
      type: "checkbox",
      options: tagOptions,
    });
  }

  const defaultValues = {
    businessName: business.name,
    contactEmail: business.email || "",
    categories: (business.categories || []).map((c: Item) => c.id.toString()),
    tags: (business.tags || []).map((t: Item) => t.id.toString()),
  };

  return (
    <Card>
      <ContactForm
        label="Business"
        items={contactFormFields}
        route="/businesses"
        action="EDIT"
        id={id}
        defaultValues={defaultValues}
      />
    </Card>
  );
};

export default EditBusiness;
