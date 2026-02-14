"use client"

import { Fragment } from "react"
import { AppTable } from "@/shared/ui/organisms/AppTable"
import { Badge } from "@/shared/ui/atoms/Badge"

const project = [
  {
    company: "Walton Holding",
    size: "50K USD",
    probability: "40%",
    duration: "18 months",
    status: "Drafted",
    assigned: [
      {
        name: "Emily Smith",
        initials: "E",
      },
      {
        name: "Max Warmer",
        initials: "M",
      },
      {
        name: "Victoria Steep",
        initials: "V",
      },
    ],
  },
  {
    company: "Zurich Coats LLC",
    size: "100-150K USD",
    probability: "80%",
    duration: "24 months",
    status: "Sent",
    assigned: [
      {
        name: "Emma Stone",
        initials: "E",
      },
      {
        name: "Chris Bold",
        initials: "C",
      },
    ],
  },
  {
    company: "Riverflow Media Group",
    size: "280-300K USD",
    probability: "80%",
    duration: "24 months",
    status: "Sent",
    assigned: [
      {
        name: "Emma Stephcorn",
        initials: "E",
      },
      {
        name: "Chris Bold",
        initials: "C",
      },
    ],
  },
  {
    company: "Nordic Solutions AG",
    size: "175K USD",
    probability: "60%",
    duration: "12 months",
    status: "Drafted",
    assigned: [
      {
        name: "Victoria Stone",
        initials: "V",
      },
      {
        name: "Max W.",
        initials: "M",
      },
    ],
  },
  {
    company: "Swiss Tech Innovations",
    size: "450K USD",
    probability: "90%",
    duration: "36 months",
    status: "Sent",
    assigned: [
      {
        name: "Emily Satally",
        initials: "E",
      },
      {
        name: "Chris Bold",
        initials: "C",
      },
    ],
  },
  {
    company: "Berlin Digital Hub",
    size: "200K USD",
    probability: "70%",
    duration: "15 months",
    status: "Drafted",
    assigned: [
      {
        name: "Emma Stone",
        initials: "E",
      },
    ],
  },
]

export default function ProductManagementView() {
  return (
    <Fragment>
      <AppTable<{
        company: string
        size: string
        probability: string
        duration: string
        status: string
      }>
        columns={[
          {
            key: "company",
            title: "Company",
            dataIndex: "company",
          },
          {
            key: "size",
            title: "Size",
            dataIndex: "size",
          },
          {
            key: "probability",
            title: "Probability",
            dataIndex: "probability",
          },
          {
            key: "duration",
            title: "Duration",
            dataIndex: "duration",
          },
          {
            key: "status",
            title: "Status",
            render: (value) => (
              <Badge className="rounded-sm">{value.status}</Badge>
            ),
          },
        ]}
        dataSource={project}
      />
    </Fragment>
  )
}
