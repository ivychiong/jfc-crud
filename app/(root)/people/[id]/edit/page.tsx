import { Tag } from "@prisma/client";
import { cookies } from "next/headers";
import React from "react";

import Card from "@/components/Card";
import ContactForm, { Field } from "@/components/forms/ContactForm";

type Item = { id: number; name: string };

const EditPerson = async ({ params }: { params: { id: string } }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = await params;

  const businessesRes = await fetch(`${process.env.BASE_URL}/api/businesses`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  const tagsRes = await fetch(`${process.env.BASE_URL}/api/tags`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  const personRes = await fetch(`${process.env.BASE_URL}/api/people/${id}`, {
    headers: { cookie: `token=${token}` },
    cache: "no-store",
  });

  if (!businessesRes.ok || !tagsRes.ok || !personRes.ok) {
    throw new Error("Failed to fetch initial data");
  }

  const businesses: Item[] = await businessesRes.json();
  const tags: Item[] = await tagsRes.json();
  const person = await personRes.json();

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

  const defaultValues = {
    firstName: person.first_name || "",
    lastName: person.last_name || "",
    email: person.email || "",
    phone: person.phone || "",
    business: person.business ? person.business.id.toString() : "noValue",
    tags: (person.tags || []).map((t: Tag) => t.id.toString()),
  };

  return (
    <Card>
      <ContactForm
        label="Person"
        items={contactFormFields}
        route="/people"
        action="EDIT"
        id={id}
        defaultValues={defaultValues}
      />
    </Card>
  );
};

export default EditPerson;
