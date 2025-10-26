import { cookies } from "next/headers";
import React from "react";

import Card from "@/components/Card";
import ContactForm, { Field } from "@/components/forms/ContactForm";
import Header from "@/components/Header";
import { getBaseUrl } from "@/lib/utils";

type Item = { id: string; name: string };

const CreatePerson = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const businessesRes = await fetch(`${getBaseUrl()}/api/businesses`, {
    headers: { cookie: `token=${token}` },
  });

  const tagsRes = await fetch(`${getBaseUrl()}/api/tags`, {
    headers: { cookie: `token=${token}` },
  });

  if (!businessesRes.ok || !tagsRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const businesses: Item[] = await businessesRes.json();
  const tags: Item[] = await tagsRes.json();

  const businessOptions = [
    { value: "noValue", label: "No Business" },
    ...businesses.map((b) => ({ value: String(b.id), label: b.name })),
  ];

  const tagOptions = tags.map((t) => ({
    value: t.id.toString(),
    label: t.name,
  }));

  const contactFormFields: Field[] = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    {
      name: "business",
      label: "Business",
      type: "dropdown",
      options: businessOptions,
    },
  ];

  if (tagOptions.length) {
    contactFormFields.push({
      name: "tags",
      label: "Tags",
      type: "checkbox",
      options: tagOptions,
    });
  }

  return (
    <>
      <Header headerName="Add Person" />
      <Card>
        <ContactForm label="Person" items={contactFormFields} route="/people" />
      </Card>
    </>
  );
};

export default CreatePerson;
