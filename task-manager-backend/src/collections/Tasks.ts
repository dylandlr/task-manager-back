// src/collections/Tasks.ts
import { CollectionConfig } from "payload/types";
import { isAuth } from "../access/isAuth";

const Tasks: CollectionConfig = {
  slug: "tasks",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: isAuth,
    read: isAuth,
    update: isAuth,
    delete: isAuth,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
      ],
      defaultValue: "pending",
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          return { ...data, user: req.user.id };
        }
        return data;
      },
    ],
  },
};

export default Tasks;
